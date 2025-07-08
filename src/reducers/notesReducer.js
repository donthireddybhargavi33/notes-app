import { v4 as uuid } from "uuid";

export const notesReducer = (state, action) => {
  switch (action.type) {
    // Input field actions
    case "TITLE":
      return { ...state, title: action.payload };
    case "TEXT":
      return { ...state, text: action.payload };
    case "RESET_FIELDS":
      return { ...state, title: "", text: "" };

    // View management
    case "SET_VIEW":
      return { ...state, activeView: action.payload };

    // Note creation
    case "ADD_NOTE":
      const newNote = {
        id: uuid(),
        title: state.title,
        text: state.text,
        isPinned: false, // Add isPinned property to new notes
        createdAt: new Date().toLocaleString(),
      };
      return {
        ...state,
        notes: [...state.notes, newNote],
      };

       case "TOGGLE_PIN":
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload
            ? { ...note, isPinned: !note.isPinned }
            : note
        ),
      };
    
    // Note manipulation actions
    case "ARCHIVE_NOTE":
      const noteToArchive = state.notes.find(
        (note) => note.id === action.payload
      );
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
        archive: [...state.archive, noteToArchive],
      };

    case "UNARCHIVE_NOTE":
      const noteToUnarchive = state.archive.find(
        (note) => note.id === action.payload
      );
      return {
        ...state,
        archive: state.archive.filter((note) => note.id !== action.payload),
        notes: [...state.notes, noteToUnarchive],
      };
      
    case "TRASH_NOTE":
      // Find the note in either the main notes list or the archive
      const noteToTrashFromNotes = state.notes.find(note => note.id === action.payload);
      const noteToTrashFromArchive = state.archive.find(note => note.id === action.payload);

      if (noteToTrashFromNotes) {
        return {
          ...state,
          notes: state.notes.filter(note => note.id !== action.payload),
          trash: [...state.trash, noteToTrashFromNotes]
        }
      }
      if (noteToTrashFromArchive) {
        return {
          ...state,
          archive: state.archive.filter(note => note.id !== action.payload),
          trash: [...state.trash, noteToTrashFromArchive]
        }
      }
      return state; // Should not happen if called correctly

    case "RESTORE_FROM_TRASH":
        const noteToRestore = state.trash.find(note => note.id === action.payload);
        return {
            ...state,
            trash: state.trash.filter(note => note.id !== action.payload),
            notes: [...state.notes, noteToRestore]
        }

    case "DELETE_PERMANENTLY":
        return {
            ...state,
            trash: state.trash.filter(note => note.id !== action.payload)
        }
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };

    // View management
    case "SET_VIEW":
      return { ...state, activeView: action.payload, searchQuery: "" }; 

      
    default:
      return state;
  }
};