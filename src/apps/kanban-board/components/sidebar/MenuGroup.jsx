const FilesGroup = ({ isActive, handleActive }) => {
    const menuGroupItems = [
        {
            name: "Store",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 transition-colors">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                </svg>
            )
        },
        {
            name: "Company",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 transition-colors">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                </svg>
            )
        },
        {
            name: "Employee",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 transition-colors">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                </svg>
            )
        }]
    return (
        <div className="mt-4">
            <div className="flex flex-row items-center justify-between pb-2 px-2">
                <div className="flex flex-row gap-2 items-center cursor-pointer">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Files</span>
                </div>
                <div className="flex flex-row gap-1 items-center">
                    <button className="p-1 hover:bg-white rounded-md transition-colors text-gray-400 hover:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>
                    <button className="p-1 hover:bg-white rounded-md transition-colors text-gray-400 hover:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="flex flex-col space-y-1">
                {menuGroupItems.map((item) => (
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
        </div>
    );
};
export default FilesGroup;
