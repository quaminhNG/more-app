import colorProgress from "../../hooks/ColorProgress";
const ProgressBar = ({ isClick, doneTask, items, progress }) => {
    const color = colorProgress(progress);
    return isClick ? (
        <div className="flex items-center gap-4">
            <div className="inline-flex items-center gap-2 sm:gap-4 px-2 py-1 rounded-full border border-gray-100 shadow-sm">
                <div className="flex flex-row items-center gap-1 sm:gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`size-5 sm:size-6 ${doneTask === items.length ? 'text-green-500' : ''}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span className="text-xs sm:text-sm whitespace-nowrap">{doneTask} of {items.length}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-16 sm:w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full ${color} rounded-full transition-all duration-300`}
                            style={{ width: `${progress}%` }}></div>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500 font-medium">{Math.round(progress)}%</span>
                </div>
            </div>
        </div>
    ) : (
        <div className="flex items-center gap-1">
            <div className="w-22 md:w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full ${color} rounded-full transition-all duration-300`}
                    style={{ width: `${progress}%` }}></div>
            </div>
            <span className="text-sm text-gray-800 font-medium">{Math.round(progress)}%</span>
        </div>
    );
};
export default ProgressBar;