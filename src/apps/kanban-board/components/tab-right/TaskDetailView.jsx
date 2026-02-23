import { COLOR_SPAN } from "../../constants/tab-right/ColorTittleTasks";

const TaskDetailView = ({ openDetailTask, setOpenDetailTask, tasks }) => {
    const task = tasks.find(t => t.id === openDetailTask);
    const isOpen = !!openDetailTask;

    return (
        <>
            {isOpen && (
                <div
                    className="hidden md:block fixed inset-0 bg-black/40 z-[60] transition-opacity"
                    onClick={() => setOpenDetailTask(null)}
                />
            )}

            <div className={`
                /* Mobile: Slide-in overlay inside parent frame (absolute) */
                absolute inset-0 bg-white z-50 flex flex-col transition-all duration-300 ease-in-out
                ${isOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-12 opacity-0 pointer-events-none md:translate-y-0 md:opacity-100'}
                
                /* Desktop: Centered modal (fixed) */
                md:fixed md:top-1/2 md:left-1/2 md:right-auto md:bottom-auto md:-translate-x-1/2 md:-translate-y-1/2 md:w-[550px] md:h-auto md:max-h-[85vh] md:rounded-3xl md:shadow-2xl md:border md:border-gray-100 md:z-[70]
                ${isOpen ? 'md:visible md:scale-100 md:opacity-100' : 'md:invisible md:scale-95 md:opacity-0'}
            `}>
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-white">
                    <h2 className="text-lg font-bold text-gray-800 truncate pr-4">{task ? task.title : 'Task Details'}</h2>
                    <button
                        onClick={() => setOpenDetailTask(null)}
                        className="p-2 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors shrink-0"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/30">
                    {task ? (
                        <>
                            <div className="space-y-4">
                                <div className="flex gap-2 text-sm">
                                    <span className={`px-3 py-1 rounded-full font-medium ${COLOR_SPAN[task.status] || 'bg-gray-100 text-gray-600'}`}>
                                        {task.status}
                                    </span>
                                    {task.priority && (
                                        <span className={`px-3 py-1 rounded-full font-medium ${task.priority === 'High' ? 'bg-red-50 text-red-700' :
                                            task.priority === 'Medium' ? 'bg-yellow-50 text-yellow-700' :
                                                'bg-emerald-50 text-emerald-700'
                                            }`}>{task.priority}</span>
                                    )}
                                </div>
                                <div className="flex items-center text-sm text-gray-500 gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                    </svg>
                                    {task.startDate && task.endDate ? `${task.startDate} to ${task.endDate}` : task.startDate ? task.startDate : task.date || "No date set"}
                                </div>
                            </div>

                            <div className="space-y-3 pt-4 border-t border-gray-100">
                                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Description</div>
                                <p className="text-gray-700 text-sm whitespace-pre-wrap">{task.description || "No description provided."}</p>
                            </div>

                            {(task.items || task.checklistItems) && (task.items || task.checklistItems).length > 0 && (
                                <div className="space-y-3 pt-4 border-t border-gray-100">
                                    <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Checklist</div>
                                    <div className="space-y-3">
                                        {(task.items || task.checklistItems).map((item, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <div className={`mt-0.5 shrink-0 h-5 w-5 rounded border flex items-center justify-center ${item.done ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-gray-300'}`}>
                                                    {item.done && (
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                                                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <span className={`text-sm ${item.done ? 'line-through text-gray-400' : 'text-gray-700'}`}>{item.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            Task not found
                        </div>
                    )}
                </div>
                <div className="p-4 md:p-5 border-t border-gray-100 bg-white mt-auto rounded-b-3xl">
                    <button className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1">
                        Save Changes
                    </button>
                </div>
            </div>
        </>
    );
};

export default TaskDetailView;
