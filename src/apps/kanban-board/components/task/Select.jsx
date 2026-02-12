import ListBox from "./ListBox";
const Select = ({ isClick, selectedPriority, setSelectedPriority, options, label }) => {
    return (
        <div className="flex items-center justify-between text-gray-500 text-sm font-medium z-20">
            <div className="flex flex-row items-center gap-1">
                {label === "Priority" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 md:size-5 text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 md:size-5 text-gray-400">
                        <path d="M5 22h14"></path>
                        <path d="M5 2h14"></path>
                        <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"></path>
                        <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"></path>
                    </svg>
                )}
                <span className="text-xs md:text-sm">{label}</span>
            </div>
            {isClick && (
                <div onClick={(e) => e.stopPropagation()}>
                    <ListBox
                        selectedPriority={selectedPriority}
                        setSelectedPriority={setSelectedPriority}
                        options={options}
                    />
                </div>
            )}
        </div>
    );
};
export default Select;