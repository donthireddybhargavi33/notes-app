import { Navbar } from "../../components/Navbar/Navbar";
import { Fragment, useReducer, useEffect } from "react"; // Import useEffect
import { Sidebar } from "../../components/Sidebar/sidebar";
import { notesReducer } from "../../reducers/notesReducer";
import { NoteCard } from "./NoteCard";

// This function will run only once to initialize our state.
// It tries to load from localStorage, otherwise it returns a default state.
const loadInitialState = () => {
  try {
    const savedState = localStorage.getItem("notesAppState");
    if (savedState === null) {
      // No saved state, return the default empty state
      return {
        title: "",
        text: "",
        notes: [],
        archive: [],
        trash: [],
        activeView: "notes",
        searchQuery: "",
      };
    }
    const parsedState = JSON.parse(savedState);
    // Return the saved notes, but reset transient fields like inputs and search
    return {
      title: "",
      text: "",
      notes: parsedState.notes || [],
      archive: parsedState.archive || [],
      trash: parsedState.trash || [],
      activeView: "notes",
      searchQuery: "",
    };
  } catch (e) {
    console.error("Failed to load state from localStorage:", e);
    // If loading fails, return default state
    return {
      title: "",
      text: "",
      notes: [],
      archive: [],
      trash: [],
      activeView: "notes",
      searchQuery: "",
    };
  }
};

export const Home = () => {
  // Use the loadInitialState function to set up the reducer
  const [state, notesDispatch] = useReducer(notesReducer, loadInitialState());
  const { title, text, notes, archive, trash, activeView, searchQuery } = state;
  
  // useEffect hook to save state to localStorage whenever notes, archive, or trash change
  useEffect(() => {
    try {
      // We only want to save the note lists, not the input fields or active view
      const stateToSave = {
        notes,
        archive,
        trash,
      };
      localStorage.setItem("notesAppState", JSON.stringify(stateToSave));
    } catch (e) {
      console.error("Failed to save state to localStorage:", e);
    }
  }, [notes, archive, trash]); // This effect runs only when these dependencies change

  const onTitleChange = (e) => {
    notesDispatch({ type: "TITLE", payload: e.target.value });
  };

  const onTextChange = (e) => {
    notesDispatch({ type: "TEXT", payload: e.target.value });
  };

  const onAddClick = () => {
    notesDispatch({ type: "ADD_NOTE" });
    notesDispatch({ type: "RESET_FIELDS" });
  };

  const onSetView = (view) => {
    notesDispatch({ type: "SET_VIEW", payload: view });
  };

  const handleSearchChange = (e) => {
    notesDispatch({ type: "SET_SEARCH_QUERY", payload: e.target.value });
  };

  const getNotesByView = () => {
    switch (activeView) {
      case "archive":
        return archive;
      case "trash":
        return trash;
      // When 'pinned' view is active, filter for only pinned notes
      case "pinned":
        return notes.filter(note => note.isPinned);
      case "notes":
      default:
        // For the main view, show all notes but sort pinned to top
        return [...notes].sort((a, b) => b.isPinned - a.isPinned);
    }
  };

  const filteredNotes = getNotesByView().filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Fragment>
      <Navbar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      <main className="flex">
        <Sidebar activeView={activeView} onSetView={onSetView} />
        <div className="flex-grow">
          {activeView === "notes" && (
            <div className="flex mt-6 flex-col gap-4 p-4 w-full max-w-xl mx-auto bg-white rounded-xl shadow-md">
              <input
                value={title}
                onChange={onTitleChange}
                className="border mt-2 border-indigo-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                placeholder="Enter Title"
              />
              <textarea
                value={text}
                onChange={onTextChange}
                className="border border-indigo-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
                placeholder="Enter Text"
                rows={4}
              />
              <button
                disabled={title.length === 0}
                onClick={onAddClick}
                className={`px-6 py-2 rounded-full font-semibold text-white transition ${
                  title.length === 0
                    ? "bg-indigo-300 cursor-not-allowed"
                    : "bg-indigo-700 hover:bg-indigo-800"
                }`}
              >
                Add Note
              </button>
            </div>
          )}
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  notesDispatch={notesDispatch}
                  view={activeView}
                />
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center mt-8">
                {searchQuery ? "No notes match your search." : "This section is empty."}
              </p>
            )}
          </div>
        </div>
      </main>
    </Fragment>
  );
};