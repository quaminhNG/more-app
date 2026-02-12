
import TabLink from "./TabLink";
import Task from "../task/Task";
import TitleTask from "./TitleTask";
import AddTask from "./AddTask";
import { useEffect, useState } from "react";
import useMoveTask from "../../hooks/MoveTask";
import TabActive from "./TabActive";
import { useToast } from "../../contexts/ToastContext";
import { DEFAULT_COLUMNS } from "../../constants/tab-right/DefaultColumns";

const Frame = ({ handleOpen, isOpen, activeTab, handleActiveTab }) => {
    const { showToast } = useToast();
    const [columns, setColumns] = useState(() => {
        const saved = localStorage.getItem("kanban-columns");
        return saved ? JSON.parse(saved) : DEFAULT_COLUMNS;
    });
    useEffect(() => {
        localStorage.setItem("kanban-columns", JSON.stringify(columns));
    }, [columns]);
    const moveTask = useMoveTask(setColumns);
    const updateTask = (taskId, updatedData) => {
        setColumns(prev => prev.map(col => ({
            ...col,
            tasks: col.tasks.map(t => t.id === taskId ? { ...t, ...updatedData } : t)
        })));
    }

    const handleDrop = (e, toColumnId) => {
        const data = JSON.parse(e.dataTransfer.getData("task"));
        if (data.fromColumnId !== toColumnId) {
            const targetColumn = columns.find(col => col.id === toColumnId);

            if (targetColumn?.title === "Done") {
                const task = columns.flatMap(col => col.tasks).find(t => t.id === data.id);
                const itemsToCheck = task?.items || task?.checklistItems;
                const allCheckDone = itemsToCheck?.every(item => item.done) ?? true;

                if (!allCheckDone) {
                    showToast("All checklist items must be completed before moving to Done", "error");
                    return;
                }
            }
            moveTask(data.id, data.fromColumnId, toColumnId);
            showToast("Moved task successfully", "success");
        }
    }
    const handleAddTask = (taskData) => {
        setColumns(prev =>
            prev.map(col =>
                col.title === taskData.status
                    ? { ...col, tasks: [...col.tasks, taskData] }
                    : col
            )
        );
    }
    const selectStatusAndMoveTask = ({ taskId, newStatus }) => {
        const movedTask = columns
            .flatMap(c => c.tasks)
            .find(task => task.id === taskId);

        if (!movedTask) return;

        if (newStatus === "Done") {
            const itemsToCheck = movedTask.items || movedTask.checklistItems;
            const allCheckDone = itemsToCheck?.every(item => item.done);

            if (!allCheckDone) {
                showToast(
                    "All checklist items must be completed before moving to Done",
                    "error"
                );
                return;
            }
        }

        setColumns(prev => {
            return prev.map(col => {
                const filteredTasks = col.tasks.filter(
                    task => task.id !== taskId
                );
                if (col.title === newStatus) {
                    return {
                        ...col,
                        tasks: [
                            ...filteredTasks,
                            { ...movedTask, status: newStatus }
                        ]
                    };
                }
                return {
                    ...col,
                    tasks: filteredTasks
                };
            });
        });
        showToast("Moved task successfully", "success");
    };
    return (
        <div className="flex-1 h-full bg-white rounded-3xl p-3 md:p-6 relative shadow-sm">
            <div className="absolute top-3 left-3 md:top-6 md:left-6 z-10 flex flex-row items-center">
                <div className={`transition-all duration-300 ease-in-out flex items-center ${!isOpen ? 'w-10 mr-6 opacity-100 visible' : 'w-0 mr-0 opacity-0 invisible'}`}>
                    <button onClick={handleOpen} className="p-2 cursor-pointer bg-gray-100 rounded-xl shadow-lg hover:bg-gray-50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                        </svg>
                    </button>
                </div>
                <div>
                    <TabLink />
                </div>
            </div>
            <div className="flex flex-col h-full gap-6">
                <div className="h-16 shrink-0 mt-16 flex items-center">
                    <TabActive handleActive={handleActiveTab} isActive={activeTab} />
                </div>
                <div className="frame-layout">
                    <div className="flex-1 w-full flex flex-wrap gap-6 overflow-y-auto content-start">
                        {columns.map((item) => (
                            <div
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => handleDrop(e, item.id)}
                                key={item.id} className="flex-1 min-w-[280px] md:min-w-[300px] h-full bg-gray-50 rounded-2xl p-4 overflow-y-hidden">
                                <TitleTask title={item.title} count={item.tasks.length} handleAddTask={handleAddTask} />
                                {item.tasks.map((task) => (
                                    <Task task={task} fromColumnId={item.id} key={task.id} selectStatusAndMoveTask={selectStatusAndMoveTask} statusOptions={columns.map(c => c.title)} updateTask={updateTask} />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Frame;