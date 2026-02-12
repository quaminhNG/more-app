import { MENU_ITEMS } from "../../constants/sidebar/MenuItems";
const Menu = ({ isActive, handleActive }) => {
    return (
        <div className="flex flex-col mt-4 space-y-1">
            {MENU_ITEMS.map((item) => (
                <div
                    key={item.name}
                    onClick={() => handleActive(item.name)}
                    className={`flex flex-row items-center gap-3 px-3 py-2 rounded-lg cursor-pointer group
                    ${isActive === item.name
                            ? 'bg-white shadow-sm text-indigo-600'
                            : 'hover:bg-white/60 text-gray-500 hover:text-gray-900 hover:shadow-sm'
                        }`}
                >
                    <div className={`${isActive === item.name ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600'}`}>
                        {item.icon}
                    </div>
                    <span className={`text-sm font-medium ${isActive === item.name ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-900'}`}>
                        {item.name}
                    </span>
                </div>
            ))}
        </div>
    );
};
export default Menu;
