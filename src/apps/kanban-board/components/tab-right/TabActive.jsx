import { MENU_TABS } from "../../constants/tab-right/MenuTabs";
const TabActive = ({ handleActive, isActive }) => {
    return (
        <div className="bg-gray-100 p-2 rounded-2xl flex flex-row gap-2 justify-center">
            {MENU_TABS.map((item) => (
                <button
                    key={item.name}
                    onClick={() => handleActive(item.name)}
                    className={`p-2 cursor-pointer group transtion transform ease-in-out duration-300 ${isActive === item.name ? 'bg-white rounded-xl shadow-lg' : ''}`}>
                    <span className={`transtion transform ease-in-out duration-300 group-hover:text-gray-800 transition-colors ${isActive === item.name ? '' : 'text-gray-400'}`}>{item.name}</span>
                </button>
            ))}

        </div>
    );
};
export default TabActive;