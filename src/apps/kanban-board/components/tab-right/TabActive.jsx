import { MENU_TABS } from "../../constants/tab-right/MenuTabs";
const TabActive = ({ handleActive, isActive, tabs = MENU_TABS }) => {
    return (
        <div className="bg-gray-100 p-2 rounded-2xl flex flex-row gap-2 justify-center w-full md:w-fit">
            {tabs.map((item) => (
                <button
                    key={item.name}
                    onClick={() => handleActive(item.name)}
                    className={`p-2 cursor-pointer group transtion transform ease-in-out duration-300 flex-1 md:flex-none w-full md:w-auto text-center relative ${isActive === item.name ? 'bg-white rounded-xl shadow-lg' : ''}`}>
                    <span className={`font-semibold transition transform ease-in-out duration-300 group-hover:text-gray-800 transition-colors ${isActive === item.name ? 'text-gray-800' : 'text-gray-400'}`}>{item.name}</span>
                    {item.badge ? (
                        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center leading-none">
                            {item.badge}
                        </span>
                    ) : null}
                </button>
            ))}
        </div>
    );
};
export default TabActive;