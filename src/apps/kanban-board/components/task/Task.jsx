import { useEffect, useState } from "react";
import TaskChecklist from "./TaskChecklist";
import Select from "./Select";
import Assignees from "./Assignees";
import { AnimatePresence, motion } from "framer-motion";
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "../../constants/task/Options";
import { useToast } from "../../contexts/ToastContext";
import colorProgress from "../../utils/ColorProgress";
import ConfirmModal from "../common/ConfirmModal";
import AddTaskModal from "./AddTaskModal";

const ease = [0.4, 0, 0.2, 1];

const Task = ({ task, fromColumnId, selectStatusAndMoveTask, statusOptions, updateTask, setColumns, deleteTask: deleteTaskProp, availableUsers }) => {
    const { showToast } = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [selectedPriority, setSelectedPriority] = useState(task.priority || "Normal");
    const [selectedProgress, setSelectedProgress] = useState(task.status || "To Do");
    const [items, setItems] = useState(task.items || []);

    const totalItems = items.length;
    const doneTask = items.filter(i => i.done).length;
    const progress = totalItems === 0 ? 0 : Math.round((doneTask / totalItems) * 100);
    const progressColor = colorProgress(progress);

    const handleDragStart = (e) => {
        e.dataTransfer.setData("task", JSON.stringify({ id: task.id, fromColumnId }));
    };

    const handlePriorityChange = (newPriority) => {
        setSelectedPriority(newPriority);
        if (updateTask) updateTask(task.id, { priority: newPriority });
        showToast(`Priority changed to ${newPriority}`, "success");
    };

    const handleStatusChange = (newStatus) => {
        if (selectStatusAndMoveTask) selectStatusAndMoveTask({ taskId: task.id, newStatus });
    };

    const handleCheckDone = (e, index) => {
        e.stopPropagation();
        const newItems = [...items];
        newItems[index].done = !newItems[index].done;
        setItems(newItems);
        if (updateTask) updateTask(task.id, { items: newItems });
    };

    const deleteTask = (taskId) => {
        if (deleteTaskProp) {
            deleteTaskProp(taskId);
            return;
        }
        setColumns(prev => prev.map(col => ({
            ...col,
            tasks: col.tasks.map(t =>
                t.id === taskId
                    ? { ...t, isDeleted: true, deletedBy: "User", deletedAt: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) }
                    : t
            )
        })));
        showToast("Task moved to Trash successfully", "success");
    };

    useEffect(() => {
        setSelectedProgress(task.status || "To Do");
    }, [task.status]);

    useEffect(() => {
        setItems(task.items || []);
    }, [task.items]);

    useEffect(() => {
        setSelectedPriority(task.priority || "Normal");
    }, [task.priority]);

    return (
        <div className="w-full pb-4" draggable onDragStart={handleDragStart}>
            <div
                onClick={() => setIsOpen(p => !p)}
                className="bg-white rounded-2xl px-4 pt-3 pb-3 shadow-sm border border-gray-100 cursor-pointer"
            >

                {/* Tags */}
                {task?.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-2">
                        {task.tags.map(tag => (
                            <span key={tag.id} className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${tag.color}`}>
                                {tag.name}
                            </span>
                        ))}
                    </div>
                )}

                <div className="flex items-start justify-between gap-2 mb-2">
                    <span
                        className={`text-gray-800 font-semibold text-base leading-tight flex-1 min-w-0 block ${isOpen ? 'break-words' : 'truncate'}`}
                        title={task.title}
                    >
                        {task.title}
                    </span>

                    {!isOpen && (task.assignees || []).length > 0 && (
                        <div className="flex items-center -space-x-2 shrink-0 mt-0.5">
                            <Assignees isClick={false} assignees={task.assignees || []} />
                        </div>
                    )}

                    {isOpen && (
                        <motion.div
                            key="actions"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.18, ease }}
                            className="flex items-center gap-1.5 shrink-0"
                        >
                            <button
                                onClick={(e) => { e.stopPropagation(); setIsEditModalOpen(true); }}
                                className="p-1.5 rounded-lg border border-gray-100 bg-white shadow-sm hover:bg-indigo-50 transition-colors group"
                                title="Edit"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-gray-400 group-hover:text-indigo-500 transition-colors">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); setIsConfirmOpen(true); }}
                                className="p-1.5 rounded-lg border border-gray-100 bg-white shadow-sm hover:bg-red-50 transition-colors group"
                                title="Delete"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-gray-400 group-hover:text-red-500 transition-colors">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>
                            <div
                                className="p-1.5 rounded-lg border border-gray-100 bg-white shadow-sm hover:bg-gray-50 transition-colors group"
                                title="Close"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-red-400 group-hover:text-red-600 transition-colors">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </div>
                        </motion.div>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-3.5 shrink-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <span className="text-xs">{task.endDate}</span>
                    </div>
                    {totalItems > 0 && (
                        <div className="flex items-center gap-2 flex-1">
                            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden max-w-[80px]">
                                <div
                                    className={`h-full ${progressColor} rounded-full transition-all duration-300`}
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <span className="text-xs text-gray-400 font-medium tabular-nums">{progress}%</span>
                        </div>
                    )}
                </div>

                <AnimatePresence initial={false}>
                    {isOpen && (
                        <motion.div
                            key="detail"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease }}
                            style={{ overflow: "hidden" }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="mt-3 border-t border-gray-100 pt-3 flex flex-col gap-3">

                                {/* Description */}
                                {task?.description && (
                                    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                                        <p className="text-sm text-gray-600 leading-relaxed break-words whitespace-pre-wrap [word-break:break-word]">
                                            {task.description}
                                        </p>
                                    </div>
                                )}

                                {/* Checklist */}
                                {totalItems > 0 && (
                                    <TaskChecklist isClick={true} items={items} handleCheckDone={handleCheckDone} />
                                )}

                                {/* Assignees */}
                                {(task.assignees || []).length > 0 && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-medium text-gray-400 shrink-0">Assignees</span>
                                        <div className="flex items-center -space-x-2">
                                            <Assignees isClick={true} assignees={task.assignees || []} />
                                        </div>
                                    </div>
                                )}

                                {/* Divider */}
                                <div className="border-t border-gray-100" />

                                {/* Selects */}
                                <div className="flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
                                    <Select
                                        isClick={true}
                                        selectedPriority={selectedPriority}
                                        setSelectedPriority={handlePriorityChange}
                                        options={PRIORITY_OPTIONS}
                                        label="Priority"
                                        selectStatusAndMoveTask={selectStatusAndMoveTask}
                                    />
                                    <Select
                                        isClick={true}
                                        selectedPriority={selectedProgress}
                                        setSelectedPriority={handleStatusChange}
                                        options={statusOptions || STATUS_OPTIONS}
                                        label="Status"
                                        selectStatusAndMoveTask={selectStatusAndMoveTask}
                                    />
                                </div>

                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
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

export default Task;