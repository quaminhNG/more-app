import Search from "./Search";
import Menu from "./Menu";
import MenuGroup from "./MenuGroup";

const Sidebar = ({ isOpen, handleOpen, activeItem, handleActive, isMobile }) => {
    return (
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isMobile ? `absolute top-0 left-0 h-full z-50 bg-gray-100 shadow-xl rounded-3xl w-64 ${isOpen ? "translate-x-0" : "-translate-x-full opacity-0"}` : `shrink-0 ${isOpen ? "w-64" : "w-0"}`}`}>
            <div className={`flex flex-col h-full w-64 pr-4 ${isMobile ? "pl-6 py-6" : ""} transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}>
                <div className="flex flex-row items-center justify-between pb-4">
                    <div className="flex flex-row gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z" />
                        </svg>
                        <span className="text-xl font-medium cursor-pointer">Kanban</span>
                    </div>
                    <button onClick={handleOpen} className="p-2 cursor-pointer bg-gray-100 rounded-xl shadow-lg hover:bg-gray-50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                        </svg>
                    </button>
                </div>
                <Search />
                <Menu handleActive={handleActive} isActive={activeItem} />
                <MenuGroup handleActive={handleActive} isActive={activeItem} />
            </div>
        </div>
    );
};

export default Sidebar;