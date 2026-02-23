import React from 'react';

const MOCK_TRASH = [
    {
        id: "t1",
        title: "Old Redesign Proposal",
        deletedBy: "U1",
        deletedAt: "2 days ago",
    },
    {
        id: "t2",
        title: "Test Task 123",
        deletedBy: "System",
        deletedAt: "1 week ago",
    },
    {
        id: "t3",
        title: "Design Homepage UI Draft",
        deletedBy: "U2",
        deletedAt: "3 weeks ago",
    }
];

const TrashView = () => {
    return (
        <div className="w-full h-full bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">Trash</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Recently deleted items. Items are permanently deleted after 30 days.</p>
                </div>
                <button className="w-28 h-8 flex justify-center items-center text-xs font-medium text-red-600 hover:text-white bg-red-50 hover:bg-red-500 border border-red-100 hover:border-red-500 rounded-lg transition-colors shadow-sm cursor-pointer">
                    Empty Trash
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6">
                <div className="max-w-4xl mx-auto flex flex-col gap-3 md:gap-4">
                    {MOCK_TRASH.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-12 text-center text-gray-500 mt-10">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mb-4 text-gray-300">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                            <h3 className="text-lg font-medium text-gray-800">Trash is empty</h3>
                            <p className="text-sm mt-1">Items you delete will show up here.</p>
                        </div>
                    ) : (
                        MOCK_TRASH.map((item) => (
                            <div key={item.id} className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-red-200 transition-colors shadow-sm">
                                <div className="flex-1">
                                    <h3 className="text-sm font-semibold text-gray-800 line-through decoration-gray-400/70">{item.title}</h3>
                                    <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1.5">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                        Deleted by <span className="font-medium">{item.deletedBy}</span> • {item.deletedAt}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity justify-end">
                                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-emerald-700 bg-white hover:bg-emerald-50 rounded-lg border border-gray-200 hover:border-emerald-200 shadow-sm transition-colors cursor-pointer" title="Restore">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                        </svg>
                                        Restore
                                    </button>
                                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-red-700 bg-white hover:bg-red-50 rounded-lg border border-gray-200 hover:border-red-200 shadow-sm transition-colors cursor-pointer" title="Delete Permanently">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                        Delete Forever
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default TrashView;
