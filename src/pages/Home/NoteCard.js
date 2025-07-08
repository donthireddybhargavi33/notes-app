export const NoteCard = ({ note, notesDispatch, view }) => {
  const { id, title, text, isPinned } = note;

  // Handler functions call the reducer with the correct action
  const handleArchive = () => notesDispatch({ type: "ARCHIVE_NOTE", payload: id });
  const handleUnarchive = () => notesDispatch({ type: "UNARCHIVE_NOTE", payload: id });
  const handleTrash = () => notesDispatch({ type: "TRASH_NOTE", payload: id });
  const handleRestore = () => notesDispatch({ type: "RESTORE_FROM_TRASH", payload: id });
  const handleDelete = () => notesDispatch({ type: "DELETE_PERMANENTLY", payload: id });
  const handlePinToggle = () => {
    notesDispatch({ type: "TOGGLE_PIN", payload: id });
  };

  return (
    <div className="border rounded-2xl shadow-md p-4 bg-white hover:shadow-lg transition-all duration-200 flex flex-col justify-between">
      {/* Note Content */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-lg font-semibold text-indigo-800">{title}</p>
          
          {/* Make the bookmark a functional, conditional button */}
          {/* It only shows in the main "notes" and "pinned" views */}
          {(view === "notes" || view === "pinned") && (
             <button onClick={handlePinToggle} className="hover:text-indigo-600 transition p-1">
                {/* Conditionally apply the 'pinned' class */}
                <span className={`material-symbols-outlined text-xl ${isPinned ? 'pinned' : ''}`}>
                  push_pin
                </span>
            </button>
          )}
        </div>
        <p className="text-gray-700 whitespace-pre-wrap">{text}</p>
      </div>
      {/* ... (The rest of the buttons section remains the same) */}

      {/* Action Buttons - Rendered Conditionally */}
      <div className="flex gap-3 justify-end mt-4">
        {view === "notes" && (
          <>
            <button onClick={handleArchive} className="flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-yellow-100 hover:bg-yellow-200 text-blue-800 transition">
              <span className="material-symbols-outlined text-base">archive</span>
              Archive
            </button>
            <button onClick={handleTrash} className="flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 transition">
              <span className="material-symbols-outlined text-base">delete</span>
              Trash
            </button>
          </>
        )}
        {view === "archive" && (
          <>
            <button onClick={handleUnarchive} className="flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-yellow-100 hover:bg-yellow-200 text-blue-800 transition">
              <span className="material-symbols-outlined text-base">unarchive</span>
              Unarchive
            </button>
            <button onClick={handleTrash} className="flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 transition">
              <span className="material-symbols-outlined text-base">delete</span>
              Trash
            </button>
          </>
        )}
        {view === "trash" && (
          <>
            <button onClick={handleRestore} className="flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-green-100 hover:bg-green-200 text-green-800 transition">
              <span className="material-symbols-outlined text-base">restore_from_trash</span>
              Restore
            </button>
            <button onClick={handleDelete} className="flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-red-100 hover:bg-red-200 text-red-800 transition">
              <span className="material-symbols-outlined text-base">delete_forever</span>
              Delete Forever
            </button>
          </>
        )}
      </div>
    </div>
  );
};