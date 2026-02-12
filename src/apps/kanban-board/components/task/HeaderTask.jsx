import ProgressBar from "./ProgressBar";

const HeaderTask = ({ isClick, doneTask, items, progress, title, startDate, endDate }) => {
    return (
        <div className={`flex justify-between mb-3 ${isClick ? 'flex-col gap-3' : 'flex-row'}`}>
            <div className={`flex flex-col items-start gap-2 ${!isClick ? 'flex-1 overflow-hidden' : ''}`}>
                <span className={`text-gray-800 font-semibold text-base leading-tight ${!isClick ? 'truncate block max-w-[150px]' : ''}`} title={title}>
                    {title}
                </span>
                <div className="flex items-center gap-1 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span className="text-xs font-medium">{endDate}</span>
                </div>
            </div>

            {isClick && (
                <div className="absolute top-2 right-4 rounded-lg border border-gray-100 p-1 md:p-0 shadow-sm bg-white cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 md:size-6 text-red-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>
            )}
            <div>
                <ProgressBar isClick={isClick} doneTask={doneTask} items={items} progress={progress} />
            </div>
        </div>
    );
};

export default HeaderTask;