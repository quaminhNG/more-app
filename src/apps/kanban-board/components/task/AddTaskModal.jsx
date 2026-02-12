import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "../../constants/task/Options";
import { LIST_BOX_COLOR } from "../../constants/task/ListBoxColors";
import ListBox from "./ListBox";

const AddTaskModal = ({ isOpen, onClose }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Normal");
    const [status, setStatus] = useState("Todo");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [checklistItems, setChecklistItems] = useState([{ id: crypto.randomUUID(), text: "" }]);

    const handleAddChecklistItem = () => {
        setChecklistItems([...checklistItems, { id: crypto.randomUUID(), text: "" }]);
    };

    const handleRemoveChecklistItem = (id) => {
        setChecklistItems(checklistItems.filter((item) => item.id !== id));
    };

    const handleChecklistChange = (id, value) => {
        setChecklistItems(checklistItems.map(item =>
            item.id === id ? { ...item, text: value } : item
        ));
    };
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

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
                        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto pointer-events-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] will-change-transform">
                            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
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

                            <div className="px-6 py-5 space-y-5">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-600">Task Title</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Enter task title..."
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-600">Description</label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Add a description..."
                                        rows={3}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all resize-none"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-gray-600">Priority</label>
                                        <ListBox
                                            selectedPriority={priority}
                                            setSelectedPriority={setPriority}
                                            options={PRIORITY_OPTIONS}
                                            direction="down"
                                            width="w-full"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-gray-600">Status</label>
                                        <ListBox
                                            selectedPriority={status}
                                            setSelectedPriority={setStatus}
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
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all cursor-pointer"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-gray-600">End Date</label>
                                        <input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all cursor-pointer"
                                        />
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
                                        {checklistItems.map((item) => (
                                            <motion.div
                                                key={item.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="flex items-center gap-2"
                                                type="checkbox"
                                            >
                                                <input
                                                    type="text"
                                                    value={item.text}
                                                    onChange={(e) => handleChecklistChange(item.id, e.target.value)}
                                                    placeholder="List item..."
                                                    className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all"
                                                />
                                                {checklistItems.length > 1 && (
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
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-600">Assignees</label>
                                    <div className="flex items-center gap-2">
                                        <div className="flex -space-x-2">
                                            {/* map user */}
                                        </div>
                                        <button className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-indigo-300 hover:bg-indigo-50 transition-all cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4 text-gray-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
                                <button
                                    onClick={onClose}
                                    className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
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
