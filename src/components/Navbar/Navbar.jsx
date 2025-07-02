import  logo  from '../../assets/notes.png';

export const Navbar = () => {
     return(
        <header className='flex px-3 py-2 gap-2 bg-indigo-100 shadow-md'>
         <div className="w-12 h-12">
            <img  className="w-full h-full" src={logo} alt='logo'/>
         </div> 
         <h1 className="text-indigo-800 text-4xl font-bold ">Notes</h1>
        </header>
     );
}
