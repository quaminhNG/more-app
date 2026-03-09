import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProgressBar from "./ProgressBar";
import Assignees from "./Assignees";
import ConfirmModal from "../common/ConfirmModal";
import AddTaskModal from "./AddTaskModal";

const ease = [0.4, 0, 0.2, 1];

const HeaderTask = ({ isClick, doneTask, items, progress, title, startDate, endDate, deleteTask, updateTask, task, availableUsers }) => {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    return (
        <div className="relative mb-3">

            {/* Action buttons — absolute top-right, chỉ khi mở */}
            <AnimatePresence initial={false}>
                {isClick && (
                    <motion.div
                        key="actions"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.18, ease }}
                        className="absolute top-0 right-0 flex items-center gap-1.5 z-20"
                    >
                        <button
                            className="rounded-lg border border-gray-100 p-1 md:p-1.5 shadow-sm bg-white cursor-pointer hover:bg-indigo-50 transition-colors group"
                            title="Edit Task"
                            onClick={(e) => { e.stopPropagation(); setIsEditModalOpen(true); }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-gray-400 group-hover:text-indigo-500 transition-colors">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                        </button>
                        <button
                            className="rounded-lg border border-gray-100 p-1 md:p-1.5 shadow-sm bg-white cursor-pointer hover:bg-red-50 transition-colors group"
                            title="Delete Task"
                            onClick={(e) => { e.stopPropagation(); setIsConfirmOpen(true); }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-gray-400 group-hover:text-red-500 transition-colors">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </button>
                        <div
                            className="rounded-lg border border-gray-100 p-1 md:p-1.5 shadow-sm bg-white cursor-pointer hover:bg-gray-50 transition-colors group"
                            title="Close"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-red-400 group-hover:text-red-600 transition-colors">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Tags */}
            {task?.tags && task.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-2">
                    {task.tags.map(tag => (
                        <span key={tag.id} className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${tag.color}`}>
                            {tag.name}
                        </span>
                    ))}
                </div>
            )}

            {/* Title row: title bên trái, avatars bên phải — luôn hiện, không animation */}
            <div className="flex items-start justify-between gap-2">
                <span
                    className={`text-gray-800 font-semibold text-base leading-tight block flex-1 min-w-0 ${!isClick ? 'truncate' : 'break-words'} ${isClick ? 'pr-24' : ''}`}
                    title={title}
                >
                    {title}
                </span>

                {/* Avatars — luôn hiện ở góc phải title, không animate */}
                {!isClick && (
                    <div className="flex items-center -space-x-2 shrink-0">
                        <Assignees isClick={false} assignees={task.assignees || []} />
                    </div>
                )}
            </div>

            {/* Due date */}
            <div className="flex items-center gap-1 text-gray-400 mt-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <span className="text-xs font-medium">{endDate}</span>
            </div>

            {/* Assignees row — chỉ hiện khi mở, có label, animate height */}
            <AnimatePresence initial={false}>
                {isClick && (
                    <motion.div
                        key="assignees-row"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease }}
                        style={{ overflow: "hidden" }}
                    >
                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs font-medium text-gray-400">Assignees</span>
                            <div className="flex items-center -space-x-2">
                                <Assignees isClick={true} assignees={task.assignees || []} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Description — chỉ khi mở */}
            <AnimatePresence initial={false}>
                {isClick && task?.description && (
                    <motion.div
                        key="desc"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease }}
                        style={{ overflow: "hidden" }}
                    >
                        <div className="mt-2 bg-gray-50/80 p-3 rounded-xl border border-gray-100">
                            <p className="text-sm text-gray-600 leading-relaxed break-words whitespace-pre-wrap [word-break:break-word]">
                                {task.description}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Progress bar */}
            <div className="mt-2.5">
                <ProgressBar isClick={isClick} doneTask={doneTask} items={items} progress={progress} />
            </div>

            <ConfirmModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={() => deleteTask(task.id)}
                title="Delete Task"
                message="Are you sure you want to delete this task? It will be moved to the Trash."
                confirmText="Delete"
                confirmType="danger"
            />
            <AddTaskModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                handleUpdateTask={(updatedTask) => updateTask(task.id, updatedTask)}
                initialTask={task}
                availableUsers={availableUsers}
            />
        </div>
    );
};

export default HeaderTask;