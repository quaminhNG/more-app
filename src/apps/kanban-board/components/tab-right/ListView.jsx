import { COLOR_SPAN } from '../../constants/tab-right/ColorTittleTasks';
import { LIST_BOX_COLOR } from '../../constants/task/ListBoxColors';

const ListView = ({ setOpenDetailTask, tasks = [] }) => {
    return (
        <div className="w-full h-full flex flex-col overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-gray-100 bg-gray-50/50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <div className="col-span-4 pl-2">Task Name</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Priority</div>
                <div className="col-span-2">Due Date</div>
                <div className="col-span-2 text-right pr-2">Assignees</div>
            </div>

            <div className="flex-1 overflow-y-auto">
                <div className="flex flex-col">
                    {tasks.filter(t => !t.isDeleted).map((task) => (
                        <div
                            key={task.id}
                            onClick={() => { if (setOpenDetailTask) setOpenDetailTask(task.id); }}
                            className="group flex flex-col md:grid md:grid-cols-12 gap-3 md:gap-4 items-start md:items-center p-4 md:p-3 hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-all duration-200 cursor-pointer"
                        >
                            <div className="w-full md:col-span-4 flex items-center gap-3 md:pl-2 mb-1 md:mb-0">
                                <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-500 group-hover:bg-indigo-100 transition-colors shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                                    </svg>
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-sm font-medium text-gray-900 group-hover:text-indigo-600 transition-colors truncate">{task.title}</span>
                                    <div className="flex items-center gap-3 mt-0.5">
                                        <span className="flex items-center gap-1 text-[10px] text-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                            </svg>
                                            {task.items ? task.items.length : 0}
                                        </span>
                                        <span className="flex items-center gap-1 text-[10px] text-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
                                            </svg>
                                            {task.attachments || 0}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="contents md:contents">
                                <div className="flex flex-wrap items-center justify-between w-full md:contents gap-y-2">
                                    <div className="flex items-center gap-2 md:contents w-full md:w-auto">
                                        <div className="md:col-span-2">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap shrink-0 ${COLOR_SPAN[task.status] || 'bg-gray-50 text-gray-500'}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-60`}></span>
                                                {task.status}
                                            </span>
                                        </div>

                                        <div className="md:col-span-2">
                                            <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border border-transparent whitespace-nowrap shrink-0 ${LIST_BOX_COLOR[task.priority] || 'bg-gray-50 text-gray-500'}`}>
                                                {task.priority || "Normal"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between w-full md:contents mt-2 md:mt-0 border-t border-gray-50 pt-2 md:border-0 md:pt-0">
                                        <div className="md:col-span-2 flex items-center gap-1.5 text-gray-500">
                                            <span className="text-xs truncate">
                                                {task.startDate && task.endDate ? `${task.startDate} - ${task.endDate}` : task.startDate ? task.startDate : task.date || "No date"}
                                            </span>
                                        </div>
                                        <div className="md:col-span-2 flex justify-end md:pr-2">
                                            <div className="flex -space-x-2">
                                                {task.assignees && task.assignees.length > 0 && (
                                                    <>
                                                        {task.assignees.map((assignee, index) => (
                                                            <img
                                                                key={index}
                                                                src={assignee.avatar || assignee}
                                                                title={assignee.name || `User ${assignee}`}
                                                                alt={assignee.name || `U${assignee}`}
                                                                className="w-7 h-7 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-indigo-600 ring-1 ring-gray-50 object-cover"
                                                                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                                                            />
                                                        ))}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="p-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors text-gray-400 hover:text-indigo-600 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <span className="text-sm font-medium">Add New Task</span>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ListView;
