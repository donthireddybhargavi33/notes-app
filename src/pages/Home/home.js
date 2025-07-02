import { Navbar } from "../../components/Navbar/Navbar";
import { Fragment } from "react";
import { Sidebar } from "../../components/Sidebar/sidebar";
import { useReducer } from "react";
import { notesReducer } from "../../reducers/notesReducer";

export const Home = () => {

  const initialState ={
    title: "",
    text: "", 
    notes: []
  }

  const[{title, text, notes}, notesDispatch] = useReducer(notesReducer, initialState);
 
  const onTitleChange = (e) => {
    notesDispatch({
      type: "TITLE",
      payload: e.target.value
     });
  }

  const onTextChange = (e) => {
    notesDispatch({
      type: "TEXT",
      payload: e.target.value
     });
    }
    const onAddClick = () => {
      notesDispatch({
        type: "ADD_NOTE",
      });
      notesDispatch({
        type: "DELETE_NOTE",
        payload: ""
      });
    }
    return (
      <Fragment>
       <Navbar />
       <main className="flex gap-3">
        <Sidebar />
        <div>
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
    className={`px-6 py-2 rounded-full font-semibold text-white transition
      ${title.length === 0
        ? "bg-indigo-300 cursor-not-allowed"
        : "bg-indigo-700 hover:bg-indigo-800"}`}
  >
    Add Note
  </button>
</div>

<div className="flex flex-col gap-4 p-4">
  {notes.length > 0 && notes.map(({ id, title, text }) => (
    <div
      key={id}
      className="border rounded-2xl shadow-md p-4 bg-white hover:shadow-lg transition-all duration-200"
    >
     
      <div className="flex justify-between items-center mb-2">
        <p className="text-lg font-semibold text-indigo-800">{title}</p>
        <button className="hover:text-indigo-600 transition">
          <span className="material-symbols-outlined text-xl">bookmark</span>
        </button>
      </div>

      
      <div className="flex flex-col gap-3">
        <p className="text-gray-700">{text}</p>
        <div className="flex gap-3 justify-end">
          <button className="flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-yellow-100 hover:bg-yellow-200 text-blue-800 transition">
            <span className="material-symbols-outlined text-base">archive</span>
            Archive
          </button>
          <button className="flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-red-100 hover:bg-red-200 text-red-800 transition">
            <span className="material-symbols-outlined text-base">delete_forever</span>
            Delete
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

        </div>
       </main>
       </Fragment>
    );
  }
