// Accept props for search functionality
export const Navbar = ({ searchQuery, onSearchChange }) => {
  return (
    <nav className="bg-indigo-700 text-white p-4 shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">NotesApp</h1>
        <div className="flex items-center gap-4">
          <input
            type="search"
            placeholder="Search..."
            className="px-3 py-1 rounded-full text-gray-800 focus:outline-none w-48 sm:w-64 transition-all"
            // Bind the input's value to the state from the parent
            value={searchQuery}
            // Call the handler function from the parent on every change
            onChange={onSearchChange}
          />
          <button className="hover:text-indigo-200">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </div>
    </nav>
  );
};