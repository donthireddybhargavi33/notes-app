const SidebarLink = ({ icon, text, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full gap-4 px-4 py-2 rounded-r-full text-left text-gray-700 hover:bg-indigo-100 transition-colors ${
      active ? "bg-indigo-200 font-semibold" : ""
    }`}
  >
    <span className="material-symbols-outlined">{icon}</span>
    <span>{text}</span>
  </button>
);

export const Sidebar = ({ activeView, onSetView }) => {
  return (
    <aside className="w-64 bg-white p-4 h-screen sticky top-0 hidden md:block">
      <nav className="flex flex-col gap-2 mt-16">
        <SidebarLink
          icon="lightbulb"
          text="Notes"
          active={activeView === "notes"}
          onClick={() => onSetView("notes")}
        />
        {/* Add the new Pinned link here */}
        <SidebarLink
          icon="push_pin"
          text="Pinned"
          active={activeView === "pinned"}
          onClick={() => onSetView("pinned")}
        />
        <SidebarLink
          icon="archive"
          text="Archive"
          active={activeView === "archive"}
          onClick={() => onSetView("archive")}
        />
        <SidebarLink
          icon="delete"
          text="Trash"
          active={activeView === "trash"}
          onClick={() => onSetView("trash")}
        />
      </nav>
    </aside>
  );
};