// import Search from "./Search";
import Menu from "./Menu";
// import MenuGroup from "./MenuGroup";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, handleOpen, activeItem, handleActive, isMobile }) => {
    return (
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isMobile ? `absolute top-0 left-0 h-full z-50 bg-gray-100 shadow-xl rounded-3xl w-64 ${isOpen ? "translate-x-0" : "-translate-x-full opacity-0"}` : `shrink-0 sticky top-3 md:top-6 h-[calc(100vh-2.5rem)] md:h-[calc(100vh-5rem)] ${isOpen ? "w-64" : "w-0"}`}`}>
            <div className={`flex flex-col h-full w-64 pr-4 ${isMobile ? "pl-6 py-6" : ""} transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}>
                <div className="flex flex-row items-center justify-between pb-4">
                    <div className="flex flex-row gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z" />
                        </svg>
                        <span className="text-[17px] font-medium cursor-pointer">KanBan</span>
                    </div>
                    <button onClick={handleOpen} className="p-2 cursor-pointer bg-gray-100 rounded-xl shadow-lg hover:bg-gray-50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                        </svg>
                    </button>
                </div>
                <Menu handleActive={handleActive} isActive={activeItem} />
                <div className="mt-auto pt-6 flex flex-col gap-3">
                    <button
                        onClick={() => handleActive("Profile")}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group cursor-pointer ${activeItem === "Profile" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "bg-white/60 hover:bg-white hover:shadow-sm text-gray-700"}`}
                    >
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold shrink-0 ring-2 ${activeItem === "Profile" ? "ring-white/30" : "ring-indigo-100"}`}>
                            JD
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                            <p className={`text-sm font-bold truncate ${activeItem === "Profile" ? "text-white" : "text-gray-800"}`}>John Doe</p>
                            <p className={`text-[11px] font-medium truncate ${activeItem === "Profile" ? "text-white/70" : "text-gray-400"}`}>View profile</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`size-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${activeItem === "Profile" ? "text-white/70" : "text-gray-400"}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Sidebar;