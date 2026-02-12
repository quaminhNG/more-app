const TaskChecklist = ({ isClick, items, handleCheckDone }) => {
    return (
        <div className="relative pl-6">
            <div className="absolute left-2 top-0 h-full w-px bg-gray-300" />
            {items.map((item, i) => (
                <div
                    key={i}
                    className="relative flex items-center gap-3 py-2 cursor-pointer group/item"
                >
                    <div
                        onClick={(e) => handleCheckDone(e, i)}
                        className={`w-4 h-4 rounded-full border border-gray-200 flex items-center justify-center transition-colors duration-200
                ${item.done ? "bg-green-600" : ""}
                `}
                    >
                        {item.done && (
                            <span className="text-white text-xs">✓</span> // **
                        )}
                    </div>
                    <span
                        onClick={(e) => handleCheckDone(e, i)}
                        className={`text-sm ${item.done ? "text-gray-700" : "text-gray-400"
                            }`}
                    >
                        {item.label}
                    </span>
                </div>
            ))}
        </div>
    );
};
export default TaskChecklist;