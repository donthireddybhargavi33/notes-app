import {NavLink } from 'react-router-dom';

export const Sidebar = () => {
    const getStyles = ({ isActive }) => {
        return isActive ? 'text-slate-50 bg-indigo-900 flex align-center gap-2 px-2 py-1 rounded-tr-full' : 'hover:bg-indigo-900 hover:text-slate-50 flex align-center gap-2 px-2 py-1 rounded-tr-full'
    }
    return (
      <aside className="flex flex-col gap-2 border-r-2 border-gray-700 p-3 w-40 h-screen bg-#1c163a">
        <NavLink className={getStyles} to='/'>
        <span class="material-symbols-outlined">
        add_home_work
        </span>
        <span>Home</span></NavLink>
        <NavLink className={getStyles} to='/archive'>
        <span class="material-symbols-outlined">
        <span>Archive</span>
        </span>
        Archive</NavLink>
        <NavLink className={getStyles} to='/important'>
        <span class="material-symbols-outlined">
        label_important
        </span>
        <span>Important</span></NavLink>
        <NavLink className={getStyles} to='/bin'>
        <span class="material-symbols-outlined">
        delete_forever
        </span>
        <span>Bin</span></NavLink>
      </aside>
    );
}
