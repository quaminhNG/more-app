import React from 'react';

const MOCK_TASKS = [
    {
        id: "1",
        title: "Design Homepage UI",
        status: "In Progress",
        date: "Today, 10:00 AM",
        user: "U1",
        description: "Created initial wireframes and color palette options.",
        type: "update"
    },
    {
        id: "2",
        title: "Fix Navigation Bug",
        status: "Done",
        date: "Yesterday, 4:30 PM",
        user: "U3",
        description: "Resolved issue with mobile menu not closing on selection.",
        type: "commit"
    },
    {
        id: "3",
        title: "New Task Created",
        status: "To Do",
        date: "Oct 24, 09:15 AM",
        user: "U2",
        description: "Added 'API Integration' task to the backlog.",
        type: "create"
    },
    {
        id: "4",
        title: "Client Feedback",
        status: "In Progress",
        date: "Oct 23, 02:00 PM",
        user: "U4",
        description: "Client requested changes to the hero section layout.",
        type: "comment"
    },
    {
        id: "5",
        title: "Deployment Successful",
        status: "Done",
        date: "Oct 22, 11:45 AM",
        user: "System",
        description: "Production build v1.2.0 deployed successfully.",
        type: "deploy"
    }
];

const TYPE_ICONS = {
    "update": (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>
    ),
    "commit": (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
        </svg>
    ),
    "create": (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
    ),
    "comment": (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
        </svg>
    ),
    "deploy": (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
    ),
};

const TYPE_COLORS = {
    "update": "bg-blue-100 text-blue-600",
    "commit": "bg-amber-100 text-amber-600",
    "create": "bg-emerald-100 text-emerald-600",
    "comment": "bg-purple-100 text-purple-600",
    "deploy": "bg-rose-100 text-rose-600",
};

const TimelineView = () => {
    return (
        <div className="w-full h-full bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">Activity Timeline</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Recent updates across all projects</p>
                </div>
                <button className="w-28 h-8 flex justify-center items-center text-xs font-medium text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-transparent rounded-lg transition-colors shadow-sm cursor-pointer">
                    View All
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6">
                <div className="max-w-3xl mx-auto">
                    {MOCK_TASKS.map((task, index) => (
                        <div key={task.id} className="relative pl-10 pb-10 group last:pb-0">
                            {index !== MOCK_TASKS.length - 1 && (
                                <div className="absolute top-8 left-[11px] bottom-0 w-0.5 bg-gray-100 group-hover:bg-gray-200 transition-colors"></div>
                            )}

                            <div className={`absolute left-0 top-1 w-6 h-6 rounded-full border-2 border-white shadow-sm flex items-center justify-center z-10 ring-1 ring-gray-100 transition-transform group-hover:scale-110 ${task.type === 'update' ? 'bg-blue-50 text-blue-600' : task.type === 'commit' ? 'bg-amber-50 text-amber-600' : task.type === 'create' ? 'bg-emerald-50 text-emerald-600' : task.type === 'comment' ? 'bg-purple-50 text-purple-600' : 'bg-rose-50 text-rose-600'}`}>
                                <div className="scale-75">{TYPE_ICONS[task.type]}</div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{task.date}</span>
                                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                    <span className="text-sm font-medium text-gray-900">{task.title}</span>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 group-hover:border-indigo-100 group-hover:shadow-sm transition-all cursor-pointer group-hover:bg-white">
                                    <p className="text-sm text-gray-600 mb-2 leading-relaxed">{task.description}</p>

                                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100/50">
                                        <div className="flex items-center gap-2">
                                            <div className="min-w-[20px] px-1 h-5 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[9px] font-bold text-gray-500 shadow-sm truncate max-w-[80px]">
                                                {task.user}
                                            </div>
                                            <span className="text-xs font-medium text-gray-500">by User {task.user}</span>
                                        </div>

                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${task.status === 'Done' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                            task.status === 'In Progress' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                                task.status === 'To Do' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                    'bg-gray-50 text-gray-600 border-gray-200'
                                            }`}>
                                            {task.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="relative pl-10 pt-2">
                        <div className="absolute left-[9px] top-3 w-1.5 h-1.5 rounded-full bg-gray-300 ring-4 ring-white"></div>
                        <span className="text-xs font-medium text-gray-400">End of recent history</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimelineView;
