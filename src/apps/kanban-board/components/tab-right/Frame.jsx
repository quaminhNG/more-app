
import TabLink from "./TabLink";
import Task from "../task/Task";
import TitleTask from "./TitleTask";
import AddTask from "./AddTask";
import { useState } from "react";
import useMoveTask from "../../hooks/MoveTask";
import TabActive from "./TabActive";
import { useToast } from "../../contexts/ToastContext";

const Frame = ({ handleOpen, isOpen, activeTab, handleActiveTab }) => {
    const { showToast } = useToast();
    const [columns, setColumns] = useState([
        {
            id: 1, title: "To Do", tasks: [
                {
                    id: crypto.randomUUID(), title: "Task 1", description: "Description 1", priority: "High", startDate: "2022-01-01", endDate: "2022-01-02", status: "In Progress", assignees: [1, 2, 3],
                    items: [{ label: "Research", done: true },
                    { label: "Wireframes", done: false },
                    { label: "Design", done: false },
                    { label: "Development", done: false },
                    { label: "Testing", done: false },
                    { label: "Deployment", done: false }]
                },
                {
                    id: crypto.randomUUID(), title: "Task 2", description: "Description 2", priority: "Medium", startDate: "2022-01-01", endDate: "2022-01-02", status: "Done", assignees: [1, 2, 3],
                    items: [{ label: "Code", done: false }, { label: "Test", done: false }]
                },
                {
                    id: crypto.randomUUID(), title: "Task 3", description: "Description 3", priority: "Low", startDate: "2022-01-01", endDate: "2022-01-02", status: "Todo", assignees: [1, 2, 3],
                    items: [{ label: "Review", done: true }]
                },
            ]
        },
        {
            id: 2, title: "In Progress", tasks: [
                {
                    id: crypto.randomUUID(), title: "Task 4", description: "Description 4", priority: "High", startDate: "2022-01-01", endDate: "2022-01-02", status: "In Progress", assignees: [1, 2, 3],
                    items: [{ label: "Analysis", done: true }]
                },
                {
                    id: crypto.randomUUID(), title: "Task 5", description: "Description 5", priority: "Medium", startDate: "2022-01-01", endDate: "2022-01-02", status: "Done", assignees: [1, 2, 3],
                    items: [{ label: "Deployment", done: true }, { label: "Monitoring", done: true }]
                },
                {
                    id: crypto.randomUUID(), title: "Task 6", description: "Description 6", priority: "Low", startDate: "2022-01-01", endDate: "2022-01-02", status: "Todo", assignees: [1, 2, 3],
                    items: [{ label: "Meeting", done: false }]
                },
            ]
        },
        {
            id: 3, title: "Done", tasks: [
                {
                    id: crypto.randomUUID(), title: "Task 7", description: "Description 7", priority: "High", startDate: "2022-01-01", endDate: "2022-01-02", status: "In Progress", assignees: [1, 2, 3],
                    items: [{ label: "Fix bug", done: true }]
                },
                {
                    id: crypto.randomUUID(), title: "Task 8", description: "Description 8", priority: "Medium", startDate: "2022-01-01", endDate: "2022-01-02", status: "Done", assignees: [1, 2, 3],
                    items: [{ label: "Refactor", done: true }]
                },
                {
                    id: crypto.randomUUID(), title: "Task 9", description: "Description 9", priority: "Low", startDate: "2022-01-01", endDate: "2022-01-02", status: "Todo", assignees: [1, 2, 3],
                    items: [{ label: "Docs", done: true }]
                },
            ]
        },
        {
            id: 4, title: "Backlog", tasks: [
                {
                    id: crypto.randomUUID(), title: "Task 10", description: "Description 10", priority: "High", startDate: "2022-01-01", endDate: "2022-01-02", status: "In Progress", assignees: [1, 2, 3],
                    items: [{ label: "Idea", done: false }]
                },
                {
                    id: crypto.randomUUID(), title: "Task 11", description: "Description 11", priority: "Medium", startDate: "2022-01-01", endDate: "2022-01-02", status: "Done", assignees: [1, 2, 3],
                    items: [{ label: "Prototype", done: false }]
                },
                {
                    id: crypto.randomUUID(), title: "Task 12", description: "Description 12", priority: "Low", startDate: "2022-01-01", endDate: "2022-01-02", status: "Todo", assignees: [1, 2, 3],
                    items: [{ label: "Launch", done: false }]
                },
            ]
        },
    ]);
    const moveTask = useMoveTask(setColumns);
    const handleDrop = (e, toColumnId) => {
        const data = JSON.parse(e.dataTransfer.getData("task"));
        if (data.fromColumnId !== toColumnId) {
            moveTask(data.id, data.fromColumnId, toColumnId);
            showToast("Moved task successfully", "success");
        }
    }
    return (
        <div className="flex-1 h-full bg-white rounded-3xl p-6 relative shadow-sm">
            <div className="absolute top-6 left-6 z-10 flex flex-row items-center gap-6">
                {!isOpen && (
                    <div>
                        <button onClick={handleOpen} className="p-2 cursor-pointer bg-gray-100 rounded-xl shadow-lg hover:bg-gray-50 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 cursor-pointer">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                            </svg>
                        </button>
                    </div>
                )}
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
                                key={item.id} className="flex-1 min-w-[300px] h-full bg-gray-50 rounded-2xl p-4 overflow-y-hidden">
                                <TitleTask title={item.title} count={item.tasks.length} />
                                {item.tasks.map((task) => (
                                    <Task task={task} fromColumnId={item.id} key={task.id} />
                                ))}
                                <AddTask />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Frame;