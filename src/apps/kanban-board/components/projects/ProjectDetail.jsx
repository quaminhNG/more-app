import React, { useState, useEffect } from 'react';
import TabActive from '../tab-right/TabActive';
import { useToast } from '../../contexts/ToastContext';
import ListBox from '../task/ListBox';
import AddTaskModal from '../task/AddTaskModal';
import Task from '../task/Task';
import TitleTask from '../tab-right/TitleTask';
import { DEFAULT_COLUMNS } from '../../constants/tab-right/DefaultColumns';
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from '../../constants/task/Options';
import ConfirmModal from '../common/ConfirmModal';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectTrashView = ({ deletedTasks, onRestore, onDeleteForever, onEmptyTrash }) => {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [confirmData, setConfirmData] = useState({ type: null, taskId: null });

    const onConfirmExecute = () => {
        if (confirmData.type === 'single') onDeleteForever(confirmData.taskId);
        else if (confirmData.type === 'empty') onEmptyTrash();
        else if (confirmData.type === 'restore') onRestore(confirmData.taskId);
    };

    return (
        <div className="w-full h-full bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex flex-wrap justify-between items-end gap-4 shrink-0">
                <div>
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                        Trash Bin
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5">{deletedTasks.length} task đã xóa</p>
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

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-4 md:p-5 bg-gray-50/30">
                {deletedTasks.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8 text-gray-300">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </div>
                        <h3 className="text-sm font-semibold text-gray-500">Trash trống</h3>
                        <p className="text-xs mt-1">Chưa có task nào bị xóa.</p>
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-4">
                        {deletedTasks.map((item) => (
                            <div key={item.id} className="w-full sm:flex-1 sm:min-w-[260px] sm:max-w-[300px] group bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-gray-300 hover:shadow-md transition-all duration-200 flex flex-col p-4">
                                <div className="flex items-center justify-between mb-2.5">
                                    <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-red-50 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3 text-red-400">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                        <span className="text-[10px] font-bold text-red-400 uppercase tracking-wide">Deleted</span>
                                    </div>
                                    {item.status && (
                                        <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-gray-100 text-gray-400 uppercase tracking-wide">
                                            {item.status}
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-start justify-between gap-2 mb-3">
                                    <h3 className="font-semibold text-gray-700 text-sm leading-tight line-through decoration-gray-300 flex-1 min-w-0 break-words" title={item.title}>
                                        {item.title}
                                    </h3>
                                    <div className="flex items-center gap-1 shrink-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => { setConfirmData({ type: 'restore', taskId: item.id }); setIsConfirmOpen(true); }}
                                            className="p-1.5 flex items-center justify-center text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                                            title="Restore Task"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-3.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => { setConfirmData({ type: 'single', taskId: item.id }); setIsConfirmOpen(true); }}
                                            className="p-1.5 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                            title="Delete Permanently"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-3.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-auto flex flex-row items-center gap-3 pt-2.5 border-t border-gray-50 flex-wrap">
                                    {item.deletedBy && (
                                        <p className="flex items-center gap-1 text-[11px] text-gray-400 font-medium">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3 shrink-0">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                            </svg>
                                            <span>Xóa bởi <span className="text-gray-600 font-semibold">{item.deletedBy}</span></span>
                                        </p>
                                    )}
                                    {item.deletedBy && <span className="text-gray-200 text-[11px]">·</span>}
                                    <p className="flex items-center gap-1 text-[11px] text-gray-400 font-medium">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3 shrink-0">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                        {item.deletedAt || "Không rõ thời gian"}
                                    </p>
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
                message={
                    confirmData.type === 'empty'
                        ? "Xóa vĩnh viễn tất cả task trong trash? Hành động này không thể hoàn tác."
                        : confirmData.type === 'restore'
                            ? "Khôi phục task này về board?"
                            : "Xóa vĩnh viễn task này? Hành động này không thể hoàn tác."
                }
                confirmText={confirmData.type === 'empty' ? "Empty Trash" : confirmData.type === 'restore' ? "Restore" : "Delete"}
                confirmType={confirmData.type === 'restore' ? "primary" : "danger"}
            />
        </div>
    );
};

const COLOR_OPTIONS = [
    { label: "Blue", value: "bg-blue-500" },
    { label: "Purple", value: "bg-purple-500" },
    { label: "Emerald", value: "bg-emerald-500" },
    { label: "Orange", value: "bg-orange-500" },
    { label: "Pink", value: "bg-pink-500" },
    { label: "Rose", value: "bg-rose-500" },
    { label: "Indigo", value: "bg-indigo-500" },
];
const STATUS_LIST = ["Planning", "In Progress", "Done"];

const ProjectDetail = ({ project, onBack, onUpdateProject, onDeleteProject }) => {
    const [activeTab, setActiveTab] = useState("Overview");
    const [allEmployees, setAllEmployees] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
    const [selectedNewMember, setSelectedNewMember] = useState("");
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editName, setEditName] = useState(project.name);
    const [editColor, setEditColor] = useState(project.color);
    const [editStatus, setEditStatus] = useState(project.status);
    const { showToast } = useToast();

    const projectMembers = project.members || [];
    const projectTasksList = project.projectTasks || [];

    useEffect(() => {
        const stored = localStorage.getItem("more_app_employees_v3");
        if (stored) {
            setAllEmployees(JSON.parse(stored));
        }
    }, []);

    const projectEmployees = allEmployees.filter(emp => projectMembers.includes(emp.id));

    const departments = ["All Departments", ...new Set(allEmployees.map(e => e.department).filter(Boolean))];

    const availableEmployees = allEmployees.filter(emp =>
        !projectMembers.includes(emp.id) &&
        (selectedDepartment === "All Departments" || emp.department === selectedDepartment)
    );
    const availableEmployeeNames = availableEmployees.map(e => e.name);

    useEffect(() => {
        if (activeTab === "Members") {
            if (availableEmployeeNames.length > 0 && !availableEmployeeNames.includes(selectedNewMember)) {
                setSelectedNewMember(availableEmployeeNames[0]);
            } else if (availableEmployeeNames.length === 0) {
                setSelectedNewMember("");
            }
        }
    }, [availableEmployeeNames, selectedNewMember, activeTab]);

    const handleAddMember = () => {
        if (!selectedNewMember) return;
        const empToAdd = availableEmployees.find(e => e.name === selectedNewMember);
        if (empToAdd) {
            const updatedProject = {
                ...project,
                members: [...projectMembers, empToAdd.id]
            };
            onUpdateProject(updatedProject);
            showToast(`Added ${empToAdd.name} to project!`, "success");
            setSelectedNewMember("");
        }
    };

    const handleAddTask = (newTask) => {
        const updatedProject = {
            ...project,
            projectTasks: [...projectTasksList, newTask],
            tasks: projectTasksList.length + 1
        };
        onUpdateProject(updatedProject);
        showToast("Task created successfully!", "success");
    };

    const updateTaskStatus = (taskId, newStatus) => {
        const movedTask = projectTasksList.find(task => task.id === taskId);
        if (!movedTask) return false;

        if (newStatus === "Done") {
            const itemsToCheck = movedTask.items || movedTask.checklistItems;
            const allCheckDone = (itemsToCheck || []).length === 0 || itemsToCheck?.every(item => item.done);

            if (!allCheckDone) {
                showToast(
                    "All checklist items must be completed before moving to Done",
                    "error"
                );
                return false;
            }
        }
        const updatedTasks = projectTasksList.map(t => {
            if (t.id === taskId) {
                return { ...t, status: newStatus };
            }
            return t;
        });
        onUpdateProject({ ...project, projectTasks: updatedTasks });
        showToast(`Moved task successfully "${newStatus}"`, "success");
        return true;
    };

    const handleUpdateSingleTask = (taskId, updatedData) => {
        const updatedTasks = projectTasksList.map(t => {
            if (t.id === taskId) {
                return { ...t, ...updatedData };
            }
            return t;
        });
        onUpdateProject({ ...project, projectTasks: updatedTasks });
    };

    const handleDeleteTask = (taskId) => {
        const updatedTasks = projectTasksList.map(t =>
            t.id === taskId
                ? { ...t, isDeleted: true, deletedBy: "User", deletedAt: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) }
                : t
        );
        onUpdateProject({ ...project, projectTasks: updatedTasks });
        showToast("Task moved to Trash successfully", "success");
    };

    const handleRestoreTask = (taskId) => {
        const updatedTasks = projectTasksList.map(t =>
            t.id === taskId ? { ...t, isDeleted: false, deletedBy: undefined, deletedAt: undefined } : t
        );
        onUpdateProject({ ...project, projectTasks: updatedTasks });
        showToast("Task restored successfully", "success");
    };

    const handleDeleteForever = (taskId) => {
        const updatedTasks = projectTasksList.filter(t => t.id !== taskId);
        onUpdateProject({ ...project, projectTasks: updatedTasks });
        showToast("Task permanently deleted", "success");
    };

    const handleEmptyTrash = () => {
        const updatedTasks = projectTasksList.filter(t => !t.isDeleted);
        onUpdateProject({ ...project, projectTasks: updatedTasks });
        showToast("Trash emptied", "success");
    };

    const handleDrop = (e, toColumnId) => {
        const dataStr = e.dataTransfer.getData("task");
        if (!dataStr) return;
        const data = JSON.parse(dataStr);
        if (data.fromColumnId !== toColumnId) {
            const targetColumn = DEFAULT_COLUMNS.find(col => col.id === toColumnId);
            if (targetColumn) {
                updateTaskStatus(data.id, targetColumn.title);
            }
        }
    };

    const activeTasks = projectTasksList.filter(t => !t.isDeleted);
    const doneTasks = activeTasks.filter(t => t.status === 'Done').length;
    const inProgressTasks = activeTasks.filter(t => t.status === 'In Progress').length;
    const todoTasks = activeTasks.filter(t => (t.status || 'To Do') === 'To Do').length;
    const totalTasks = activeTasks.length;
    const progress = totalTasks === 0 ? 0 : Math.round((doneTasks / totalTasks) * 100);
    const deletedTasksCount = projectTasksList.filter(t => t.isDeleted).length;

    const handleSaveEdit = () => {
        if (!editName.trim()) return;
        onUpdateProject({ ...project, name: editName.trim(), color: editColor, status: editStatus });
        setIsEditOpen(false);
        showToast("Cập nhật dự án thành công!", "success");
    };

    const derivedColumns = DEFAULT_COLUMNS.map(col => ({
        ...col,
        tasks: projectTasksList.filter(t => (t.status || "To Do") === col.title)
    }));

    return (
        <div className="flex-1 h-full bg-white rounded-3xl p-3 md:p-6 relative shadow-sm flex flex-col overflow-hidden">
            <div className="flex items-center gap-4 mb-6 z-10 shrink-0">
                <button onClick={onBack} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                </button>
                <div className="flex flex-1 min-w-0 flex-wrap items-center gap-2.5 md:gap-3">
                    <div className="flex flex-1 items-center gap-2.5 min-w-0">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${project.color} shadow-sm shrink-0`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0A2.25 2.25 0 0 0 1.5 12v4.5c0 1.242.101 2.454.296 3.619a2.25 2.25 0 0 0 2.193 1.881h16.022a2.25 2.25 0 0 0 2.193-1.881 24.373 24.373 0 0 0 .296-3.619V12a2.25 2.25 0 0 0-2.25-2.224M3.75 9.776 5.8 4.65A2.25 2.25 0 0 1 7.89 3h8.22a2.25 2.25 0 0 1 2.09 1.65l2.05 5.126M12 15.75h.008v.008H12v-.008Z" />
                            </svg>
                        </div>
                        <h2 className="text-lg font-bold text-gray-900 leading-tight truncate">{project.name}</h2>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide shrink-0
                        ${project.status === 'Done' ? 'bg-emerald-50 text-emerald-600' :
                            project.status === 'In Progress' ? 'bg-blue-50 text-blue-600' :
                                'bg-orange-50 text-orange-600'}`}>
                        {project.status}
                    </span>
                </div>
            </div>

            <div className="mb-6 flex shrink-0">
                <TabActive
                    tabs={[
                        { name: 'Overview' },
                        { name: 'Tasks' },
                        { name: 'Members' },
                        {
                            name: 'Trash',
                            badge: projectTasksList.filter(t => t.isDeleted).length || null
                        }
                    ]}
                    isActive={activeTab}
                    handleActive={setActiveTab}
                />
            </div>

            <div className={`flex-1 w-full flex flex-col ${activeTab === "Overview" ? "overflow-y-auto pb-4" : "overflow-hidden"}`}>
                {activeTab === "Overview" && (
                    <div className="flex flex-col gap-6">
                        <div className={`relative overflow-hidden rounded-2xl p-4 sm:p-6 text-white ${project.color || 'bg-indigo-500'}`}>
                            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full pointer-events-none" />
                            <div className="absolute -left-8 -bottom-8 w-28 h-28 bg-white/10 rounded-full pointer-events-none" />
                            <div className="relative z-10 flex items-center divide-x divide-white/20">
                                <div className="flex-1 flex flex-col items-center py-1 px-1">
                                    <span className="text-xl sm:text-4xl font-black leading-none">{progress}%</span>
                                    <span className="text-[9px] sm:text-xs font-bold uppercase tracking-wider mt-1.5 opacity-70">Progress</span>
                                </div>
                                <div className="flex-1 flex flex-col items-center py-1 px-1">
                                    <span className="text-xl sm:text-4xl font-black leading-none">{todoTasks}</span>
                                    <span className="text-[9px] sm:text-xs font-bold uppercase tracking-wider mt-1.5 opacity-70">To Do</span>
                                </div>
                                <div className="flex-1 flex flex-col items-center py-1 px-1">
                                    <span className="text-xl sm:text-4xl font-black leading-none">{inProgressTasks}</span>
                                    <span className="text-[9px] sm:text-xs font-bold uppercase tracking-wider mt-1.5 opacity-70">
                                        <span className="sm:hidden">WIP</span>
                                        <span className="hidden sm:inline">In Progress</span>
                                    </span>
                                </div>
                                <div className="flex-1 flex flex-col items-center py-1 px-1">
                                    <span className="text-xl sm:text-4xl font-black leading-none">{doneTasks}</span>
                                    <span className="text-[9px] sm:text-xs font-bold uppercase tracking-wider mt-1.5 opacity-70">Done</span>
                                </div>
                                <div className="flex-1 flex flex-col items-center py-1 px-1">
                                    <span className="text-xl sm:text-4xl font-black leading-none">{totalTasks}</span>
                                    <span className="text-[9px] sm:text-xs font-bold uppercase tracking-wider mt-1.5 opacity-70">Total</span>
                                </div>
                            </div>
                            {/* Progress bar */}
                            <div className="relative z-10 mt-4 h-1.5 bg-white/20 rounded-full overflow-hidden">
                                <div className="h-full bg-white/70 rounded-full transition-all duration-1000" style={{ width: `${progress}%` }} />
                            </div>
                        </div>

                        <div className="flex flex-col gap-8">

                            {/* ── Task Allocation ── */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-extrabold text-gray-800 text-base tracking-tight">Task Allocation</h3>
                                    <span className="text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">{totalTasks} total</span>
                                </div>

                                {totalTasks === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-12 text-gray-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-14 mb-3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z" />
                                        </svg>
                                        <p className="text-sm font-semibold text-gray-400">No tasks yet</p>
                                        <button onClick={() => setActiveTab('Tasks')} className="mt-2 text-sm text-indigo-500 font-bold hover:underline cursor-pointer">Add first task →</button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-3">
                                        {[
                                            { label: 'To Do', count: todoTasks, bar: 'bg-orange-400', dot: 'bg-orange-400', pct: Math.round((todoTasks / totalTasks) * 100) },
                                            { label: 'In Progress', count: inProgressTasks, bar: 'bg-blue-500', dot: 'bg-blue-500', pct: Math.round((inProgressTasks / totalTasks) * 100) },
                                            { label: 'Done', count: doneTasks, bar: 'bg-emerald-500', dot: 'bg-emerald-500', pct: Math.round((doneTasks / totalTasks) * 100) },
                                        ].map(({ label, count, bar, dot, pct }) => (
                                            <div key={label} className="flex items-center gap-4 group">
                                                <div className={`w-2 h-2 rounded-full shrink-0 ${dot}`} />
                                                <span className="text-sm font-semibold text-gray-600 w-24 shrink-0">{label}</span>
                                                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                    <div className={`h-full ${bar} rounded-full transition-all duration-700`} style={{ width: `${pct || 0}%` }} />
                                                </div>
                                                <span className="text-xs font-bold text-gray-400 w-8 text-right shrink-0">{count}</span>
                                                <span className="text-xs text-gray-300 w-8 text-right shrink-0">{pct || 0}%</span>
                                            </div>
                                        ))}

                                        {deletedTasksCount > 0 && (
                                            <button onClick={() => setActiveTab('Trash')} className="mt-2 flex items-center gap-2 text-xs text-gray-400 hover:text-red-500 font-bold transition-colors cursor-pointer">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3.5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                                {deletedTasksCount} in trash · View →
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Divider */}
                            <div className="h-px bg-gray-100" />

                            {/* ── Members ── */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-extrabold text-gray-800 text-base tracking-tight">Members</h3>
                                    <button onClick={() => setActiveTab('Members')} className="text-xs font-bold text-indigo-500 hover:text-indigo-700 transition-colors cursor-pointer">
                                        Manage →
                                    </button>
                                </div>

                                {projectEmployees.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-10 text-gray-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-14 mb-3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                        </svg>
                                        <p className="text-sm font-semibold text-gray-400">No members yet</p>
                                        <button onClick={() => setActiveTab('Members')} className="mt-2 text-sm text-indigo-500 font-bold hover:underline cursor-pointer">Add now →</button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-2">
                                        {projectEmployees.slice(0, 6).map((emp, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setActiveTab('Members')}
                                                className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-gray-50 transition-colors group cursor-pointer text-left w-full"
                                            >
                                                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white bg-gradient-to-tr ${emp.color} text-xs font-bold shrink-0 group-hover:scale-105 transition-transform`}>
                                                    {emp.initials}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-bold text-gray-800 truncate group-hover:text-indigo-600 transition-colors">{emp.name}</p>
                                                    <p className="text-xs text-gray-400 font-medium truncate">{emp.role}</p>
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3.5 text-gray-300 group-hover:text-indigo-400 shrink-0 transition-colors">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                </svg>
                                            </button>
                                        ))}
                                        {projectEmployees.length > 6 && (
                                            <button onClick={() => setActiveTab('Members')} className="mt-1 text-xs font-bold text-indigo-500 hover:text-indigo-700 text-center py-2 transition-colors cursor-pointer">
                                                +{projectEmployees.length - 6} more members →
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                )}
                {activeTab === "Tasks" && (
                    <div className="flex-1 w-full flex flex-wrap gap-6 overflow-y-auto content-start p-1 h-full">
                        {derivedColumns.map((item) => (
                            <div
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => handleDrop(e, item.id)}
                                key={item.id} className="flex-1 min-w-[280px] md:min-w-[300px] h-full bg-gray-50 rounded-2xl p-4 overflow-y-hidden">
                                <TitleTask title={item.title} count={item.tasks.filter(t => !t.isDeleted).length} handleAddTask={handleAddTask} availableUsers={projectEmployees} />
                                <div className="flex flex-col gap-2 h-full overflow-y-auto pb-10 hide-scrollbar">
                                    {item.tasks.filter(t => !t.isDeleted).map((task) => (
                                        <Task
                                            key={task.id}
                                            task={task}
                                            fromColumnId={item.id}
                                            selectStatusAndMoveTask={({ taskId, newStatus }) => updateTaskStatus(taskId, newStatus)}
                                            statusOptions={DEFAULT_COLUMNS.map(c => c.title)}
                                            updateTask={handleUpdateSingleTask}
                                            setColumns={() => { }}
                                            deleteTask={handleDeleteTask}
                                            availableUsers={projectEmployees}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === "Members" && (
                    <div className="flex flex-col gap-4 h-full">
                        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200 transition-transform hover:scale-105">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.125a7.125 7.125 0 0 1 4.5-6.576 4.125 4.125 0 0 1 2.25 4.697l-.001.122a.75.75 0 0 1-.363.63 12.956 12.956 0 0 1-6.386 1.705V19.125Z" />
                                        </svg>
                                    </div>
                                    <div className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full bg-rose-500 border-2 border-white text-[10px] font-bold text-white flex items-center justify-center shadow-sm">
                                        {projectMembers.length}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg leading-tight">Thành viên dự án</h3>
                                    <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">Quản lý nhân sự</p>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full xl:w-auto">
                                <div className="relative flex-1 sm:w-48 shrink-0 z-[51]">
                                    <ListBox
                                        selectedPriority={selectedDepartment}
                                        setSelectedPriority={setSelectedDepartment}
                                        options={departments}
                                        direction="down" width="w-full"
                                        className="font-semibold !py-3"
                                    />
                                </div>
                                {availableEmployeeNames.length > 0 ? (
                                    <div className="relative flex-1 sm:w-56 shrink-0 z-50">
                                        <ListBox
                                            selectedPriority={selectedNewMember || availableEmployeeNames[0]}
                                            setSelectedPriority={setSelectedNewMember}
                                            options={availableEmployeeNames}
                                            direction="down" width="w-full"
                                            className="font-semibold !py-3"
                                        />
                                    </div>
                                ) : (
                                    <div className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-400 bg-gray-50 whitespace-nowrap text-center h-[46px] flex items-center justify-center">
                                        No members available
                                    </div>
                                )}
                                <button onClick={handleAddMember} disabled={availableEmployeeNames.length === 0 || !selectedNewMember} className="bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20 shrink-0 cursor-pointer h-[46px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    Add
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto">
                            {projectEmployees.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50/30 rounded-2xl border border-gray-100/50 border-dashed">
                                    <div className="w-16 h-16 rounded-full bg-white border border-gray-100 flex items-center justify-center mb-4 shadow-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-300">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                        </svg>
                                    </div>
                                    <p className="text-sm font-medium">Chưa có thành viên nào.</p>
                                </div>
                            ) : (
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col">
                                    <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-gray-50 text-[11px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50/50 rounded-t-2xl">
                                        <div className="col-span-5">Employee</div>
                                        <div className="col-span-4">Role</div>
                                        <div className="col-span-3 text-right">Contact</div>
                                    </div>
                                    <div className="flex flex-col">
                                        {projectEmployees.map((employee, idx) => (
                                            <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center px-4 md:px-6 py-4 border-b border-gray-50 hover:bg-slate-50/50 transition-colors last:border-b-0 group">
                                                <div className="col-span-1 md:col-span-5 flex items-center gap-4">
                                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white bg-gradient-to-tr ${employee.color} shadow-sm group-hover:scale-110 transition-transform shrink-0`}>
                                                        <span className="font-bold text-sm tracking-widest">{employee.initials}</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-[14px] text-gray-900 group-hover:text-indigo-600 transition-colors">{employee.name}</span>
                                                        <span className="text-xs text-gray-400 font-medium md:hidden mt-0.5">{employee.role}</span>
                                                    </div>
                                                </div>
                                                <div className="hidden md:flex flex-col col-span-4">
                                                    <span className="text-sm font-semibold text-gray-700">{employee.role}</span>
                                                    <span className="text-xs text-gray-400 mt-0.5">{employee.department}</span>
                                                </div>
                                                <div className="col-span-1 md:col-span-3 md:text-right flex items-center justify-between md:justify-end gap-2 text-sm text-gray-500">
                                                    <span className="truncate max-w-[150px] md:max-w-none text-xs font-medium">{employee.email}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {activeTab === "Trash" && (
                    <ProjectTrashView
                        deletedTasks={projectTasksList.filter(t => t.isDeleted)}
                        onRestore={handleRestoreTask}
                        onDeleteForever={handleDeleteForever}
                        onEmptyTrash={handleEmptyTrash}
                    />
                )}
            </div>
            <AnimatePresence>
                {isEditOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]"
                            onClick={() => setIsEditOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="fixed inset-0 z-[201] flex items-center justify-center p-4"
                        >
                            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md flex flex-col">
                                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-800">Chỉnh sửa dự án</h2>
                                        <p className="text-sm text-gray-400 mt-0.5">Cập nhật thông tin dự án</p>
                                    </div>
                                    <button onClick={() => setIsEditOpen(false)} className="p-1.5 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5 text-gray-400">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="p-6 space-y-5">
                                    <div>
                                        <label className="text-sm font-semibold text-gray-600 block mb-1.5">Tên dự án</label>
                                        <input
                                            type="text"
                                            value={editName}
                                            onChange={(e) => setEditName(e.target.value)}
                                            placeholder="Nhập tên dự án"
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-gray-600 block mb-1.5">Trạng thái</label>
                                        <div className="flex gap-2 flex-wrap">
                                            {STATUS_LIST.map(s => (
                                                <button
                                                    key={s}
                                                    onClick={() => setEditStatus(s)}
                                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${editStatus === s
                                                        ? s === 'Done' ? 'bg-emerald-500 text-white border-emerald-500'
                                                            : s === 'In Progress' ? 'bg-blue-500 text-white border-blue-500'
                                                                : 'bg-orange-400 text-white border-orange-400'
                                                        : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                                                        }`}
                                                >{s}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-gray-600 block mb-1.5">Màu chủ đề</label>
                                        <div className="flex gap-2 flex-wrap">
                                            {COLOR_OPTIONS.map(c => (
                                                <button
                                                    key={c.value}
                                                    onClick={() => setEditColor(c.value)}
                                                    className={`w-8 h-8 rounded-full ${c.value} transition-all cursor-pointer ${editColor === c.value ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : 'hover:scale-110'
                                                        }`}
                                                    title={c.label}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex bg-gray-50 p-4 gap-3 justify-end border-t border-gray-100 rounded-b-3xl">
                                    <button onClick={() => setIsEditOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-white hover:shadow-sm transition-all cursor-pointer">Hủy</button>
                                    <button onClick={handleSaveEdit} disabled={!editName.trim()} className="px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-300 shadow-lg shadow-indigo-500/25 transition-all cursor-pointer">Lưu thay đổi</button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>


        </div>
    );
};
export default ProjectDetail;
