import React, { useState } from 'react';
import ConfirmModal from '../common/ConfirmModal';

const TrashView = ({ columns, setColumns, showToast }) => {
    const deletedTasks = columns ? columns.flatMap(col => col.tasks.filter(t => t.isDeleted)) : [];

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [confirmData, setConfirmData] = useState({ type: null, taskId: null });

    const handleRestore = (taskId) => {
        setColumns(prev => prev.map(col => ({
            ...col,
            tasks: col.tasks.map(t => t.id === taskId ? { ...t, isDeleted: false } : t)
        })));
        showToast("Task restored successfully", "success");
    };

    const handleDeleteForever = (taskId) => {
        setColumns(prev => prev.map(col => ({
            ...col,
            tasks: col.tasks.filter(t => t.id !== taskId)
        })));
        showToast("Task permanently deleted", "success");
    };

    const handleEmptyTrash = () => {
        setColumns(prev => prev.map(col => ({
            ...col,
            tasks: col.tasks.filter(t => !t.isDeleted)
        })));
        showToast("Trash emptied", "success");
    };

    const onConfirmExecute = () => {
        if (confirmData.type === 'single') {
            handleDeleteForever(confirmData.taskId);
        } else if (confirmData.type === 'empty') {
            handleEmptyTrash();
        } else if (confirmData.type === 'restore') {
            handleRestore(confirmData.taskId);
        }
    };

    return (
        <div className="w-full h-full bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex flex-wrap justify-between items-end gap-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                        Trash Bin
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Showing {deletedTasks.length} deleted items.
                    </p>
                </div>
                {deletedTasks.length > 0 && (
                    <button
                        onClick={() => { setConfirmData({ type: 'empty', taskId: null }); setIsConfirmOpen(true); }}
                        className="px-4 py-2 text-xs font-semibold text-red-600 hover:text-white bg-red-50 hover:bg-red-500 border border-red-100 hover:border-red-500 rounded-lg transition-all shadow-sm cursor-pointer flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75h1.5m-6 0h1.5m-2.41 3h11.82M5.625 19.5h12.75c1.242 0 2.25-1.008 2.25-2.25V9.75c0-1.242-1.008-2.25-2.25-2.25H5.625c-1.242 0-2.25 1.008-2.25 2.25v7.5c0 1.242 1.008 2.25 2.25 2.25Z" />
                        </svg>
                        Empty All
                    </button>
                )}
            </div>
            <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50/30">
                {deletedTasks.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10 text-gray-300">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-600">No items in trash</h3>
                        <p className="text-sm mt-1">Everything is clean!</p>
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-5">
                        {deletedTasks.map((item) => (
                            <div key={item.id} className="w-full sm:flex-1 sm:min-w-[280px] sm:max-w-[300px] min-h-[116px] group bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-gray-300 hover:shadow-md transition-all duration-200 flex flex-col p-3 relative">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="p-1 px-2 bg-gray-50 uppercase tracking-wider text-[10px] font-bold text-gray-400 rounded-md border border-gray-100">
                                        Deleted Task
                                    </div>
                                    <div className="p-1 bg-red-50 text-red-500 rounded-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                        </svg>
                                    </div>
                                </div>

                                <h3 className="font-semibold text-gray-800 text-base leading-tight line-through decoration-gray-300 truncate block w-full mb-2" title={item.title}>
                                    {item.title}
                                </h3>

                                <div className="mt-auto flex items-end justify-between">
                                    <div className="flex flex-col gap-1 text-xs text-gray-400">
                                        <p className="flex items-center gap-1.5 font-medium">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                            {item.deletedAt || "Unknown date"}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => { setConfirmData({ type: 'restore', taskId: item.id }); setIsConfirmOpen(true); }}
                                            className="p-1.5 flex items-center justify-center text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                                            title="Restore Task"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                                            </svg>
                                        </button>

                                        <button
                                            onClick={() => { setConfirmData({ type: 'single', taskId: item.id }); setIsConfirmOpen(true); }}
                                            className="p-1.5 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                            title="Delete Permanently"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <ConfirmModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={onConfirmExecute}
                title={confirmData.type === 'empty' ? "Empty Trash" : confirmData.type === 'restore' ? "Restore Task" : "Delete Permanently"}
                message={confirmData.type === 'empty' ? "Are you sure you want to permanently delete all tasks in the trash? This action cannot be undone." : confirmData.type === 'restore' ? "Are you sure you want to restore this task back to the board?" : "Are you sure you want to permanently delete this task? This action cannot be undone."}
                confirmText={confirmData.type === 'empty' ? "Empty Trash" : confirmData.type === 'restore' ? "Restore" : "Delete"}
                confirmType={confirmData.type === 'restore' ? "primary" : "danger"}
            />
        </div>
    );
};

export default TrashView;