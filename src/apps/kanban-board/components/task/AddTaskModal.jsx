import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "../../constants/task/Options";
import { LIST_BOX_COLOR } from "../../constants/task/ListBoxColors";
import ListBox from "./ListBox";
import { AVAILABLE_USERS } from "../../constants/task/Users";
import validateForm from "../../hooks/ValidateFormTask";
const AddTaskModal = ({ isOpen, onClose, handleAddTask }) => {
    const [isAssigneeDropdownOpen, setIsAssigneeDropdownOpen] = useState(false);
    const assigneeRef = useRef(null);
    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
        priority: "Normal",
        status: "To Do",
        startDate: "",
        endDate: "",
        checklistItems: [{ id: crypto.randomUUID(), text: "" }],
        assignees: []
    });
    const [formError, setFormError] = useState({
        title: "",
        description: "",
        priority: "",
        status: "",
        startDate: "",
        endDate: "",
        checklistItems: "",
        assignees: ""
    });


    const handleAddChecklistItem = () => {
        setTaskData(prev => ({
            ...prev,
            checklistItems: [...prev.checklistItems, { id: crypto.randomUUID(), text: "" }]
        }));
    };

    const handleRemoveChecklistItem = (id) => {
        setTaskData(prev => ({
            ...prev,
            checklistItems: prev.checklistItems.filter((item) => item.id !== id)
        }));
    };

    const handleChecklistChange = (id, value) => {
        setTaskData(prev => ({
            ...prev,
            checklistItems: prev.checklistItems.map(item =>
                item.id === id ? { ...item, text: value } : item
            )
        }));
    };

    const toggleAssignee = (userId) => {
        setTaskData(prev => {
            const currentAssignees = prev.assignees;
            if (currentAssignees.includes(userId)) {
                return { ...prev, assignees: currentAssignees.filter(id => id !== userId) };
            } else {
                return { ...prev, assignees: [...currentAssignees, userId] };
            }
        });
    };
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
            resetForm();
            setFormError({});
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (assigneeRef.current && !assigneeRef.current.contains(event.target)) {
                setIsAssigneeDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(taskData);
    };
    const resetForm = () => {
        setTaskData({
            title: "",
            description: "",
            priority: "Normal",
            status: "To Do",
            startDate: "",
            endDate: "",
            checklistItems: [{ id: crypto.randomUUID(), text: "" }],
            assignees: []
        });
    };
    const handleCreateTask = () => {
        if (!validateForm({ taskData, setFormError })) return;
        const newTask = {
            ...taskData,
            id: crypto.randomUUID(),
            items: taskData.checklistItems.filter(item => item.text.trim() !== "").map(item => ({
                label: item.text,
                done: false
            })),
            assignees: AVAILABLE_USERS.filter(u => taskData.assignees.includes(u.id))
        };
        handleAddTask(newTask);
        resetForm();
        onClose();
    };
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="fixed inset-0 z-[201] flex items-center justify-center p-4"
                    >
                        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col pointer-events-auto will-change-transform">
                            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
                                <h2 className="text-lg font-bold text-gray-800">Create New Task</h2>
                                <button
                                    onClick={onClose}
                                    className="p-1.5 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5 text-gray-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="px-6 py-2 space-y-5 overflow-y-auto flex-1 custom-scrollbar">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-600">Task Title</label>
                                    <input
                                        name="title"
                                        type="text"
                                        value={taskData.title}
                                        onChange={handleChange}
                                        placeholder="Enter task title..."
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all"
                                    />
                                    {formError.title && <p className="text-red-500 text-sm">{formError.title}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-600">Description</label>
                                    <textarea
                                        name="description"
                                        value={taskData.description}
                                        onChange={handleChange}
                                        placeholder="Add a description..."
                                        rows={3}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all resize-none"
                                    />
                                    {formError.description && <p className="text-red-500 text-sm">{formError.description}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-gray-600">Priority</label>
                                        <ListBox
                                            selectedPriority={taskData.priority}
                                            setSelectedPriority={(value) => setTaskData(prev => ({ ...prev, priority: value }))}
                                            options={PRIORITY_OPTIONS}
                                            direction="down"
                                            width="w-full"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-gray-600">Status</label>
                                        <ListBox
                                            selectedPriority={taskData.status}
                                            setSelectedPriority={(value) => setTaskData(prev => ({ ...prev, status: value }))}
                                            options={STATUS_OPTIONS}
                                            direction="down"
                                            width="w-full"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-gray-600">Start Date</label>
                                        <input
                                            type="date"
                                            name="startDate"
                                            value={taskData.startDate}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all cursor-pointer"
                                        />
                                        {formError.startDate && <p className="text-red-500 text-sm">{formError.startDate}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-gray-600">End Date</label>
                                        <input
                                            type="date"
                                            name="endDate"
                                            value={taskData.endDate}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all cursor-pointer"
                                        />
                                        {formError.endDate && <p className="text-red-500 text-sm">{formError.endDate}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2.5">
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-semibold text-gray-600">Checklist</label>
                                        <button
                                            onClick={handleAddChecklistItem}
                                            className="flex items-center gap-1 text-xs font-medium text-indigo-500 hover:text-indigo-600 transition-colors cursor-pointer"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                            Add Item
                                        </button>
                                    </div>
                                    <div className="space-y-2">
                                        {taskData.checklistItems.map((item) => (
                                            <motion.div
                                                key={item.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="flex items-center gap-2"
                                            >
                                                <input
                                                    value={item.text}
                                                    onChange={(e) => handleChecklistChange(item.id, e.target.value)}
                                                    type="text"
                                                    placeholder="List item..."
                                                    className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all"
                                                />
                                                {taskData.checklistItems.length > 1 && (
                                                    <button
                                                        onClick={() => handleRemoveChecklistItem(item.id)}
                                                        className="p-1 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4 text-red-400">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                    {formError.checklistItems && <p className="text-red-500 text-sm">{formError.checklistItems}</p>}
                                </div>

                                <div className="flex flex-col gap-1 space-y-1.5 relative" ref={assigneeRef}>
                                    <label className="text-sm font-semibold text-gray-600">Assignees</label>
                                    <div className="flex items-center gap-2">
                                        <div className="flex -space-x-2">
                                            {AVAILABLE_USERS.filter(user => taskData.assignees.includes(user.id)).map((user) => (
                                                <img
                                                    key={user.id}
                                                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                                                    src={user.avatar}
                                                    alt={user.name}
                                                    title={user.name}
                                                />
                                            ))}
                                        </div>
                                        <button
                                            onClick={() => setIsAssigneeDropdownOpen(!isAssigneeDropdownOpen)}
                                            className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-indigo-300 hover:bg-indigo-50 transition-all cursor-pointer relative"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4 text-gray-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                        </button>

                                        <AnimatePresence>
                                            {isAssigneeDropdownOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    className="absolute bottom-full left-0 mb-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-10"
                                                >
                                                    <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
                                                        {AVAILABLE_USERS.map((user) => (
                                                            <div
                                                                key={user.id}
                                                                onClick={() => toggleAssignee(user.id)}
                                                                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${taskData.assignees.includes(user.id) ? 'bg-indigo-50' : 'hover:bg-gray-50'}`}
                                                            >
                                                                <img
                                                                    src={user.avatar}
                                                                    alt={user.name}
                                                                    className="w-8 h-8 rounded-full object-cover"
                                                                />
                                                                <span className={`text-sm flex-1 ${taskData.assignees.includes(user.id) ? 'font-medium text-indigo-700' : 'text-gray-700'}`}>
                                                                    {user.name}
                                                                </span>
                                                                {taskData.assignees.includes(user.id) && (
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-indigo-500">
                                                                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                                                                    </svg>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                                {formError.assignees && <p className="text-red-500 text-sm">{formError.assignees}</p>}
                            </div>
                            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
                                <button
                                    onClick={onClose}
                                    className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCreateTask}
                                    className="px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 shadow-lg shadow-indigo-500/25 transition-all cursor-pointer"
                                >
                                    Create Task
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AddTaskModal;
