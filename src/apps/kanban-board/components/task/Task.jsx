import { useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";
import ProgressBar from "./ProgressBar";
import TaskChecklist from "./TaskChecklist";
import Select from "./Select";
import Assignees from "./Assignees";
import { AnimatePresence, motion } from "framer-motion";
import HeaderTask from "./HeaderTask";
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "../../constants/task/Options";
const Task = ({ task, fromColumnId }) => {
    const handleDragStart = (e) => {
        e.dataTransfer.setData(
            "task",
            JSON.stringify({
                id: task.id,
                fromColumnId: fromColumnId,
            })
        );
    };
    const [isClick, setIsClick] = useState(false);

    const handleClick = () => {
        setIsClick(!isClick);
    }


    const [selectedPriority, setSelectedPriority] = useState(task.priority || "Normal");
    const [selectedProgress, setselectedProgress] = useState(task.status || "Todo");

    const [items, setItems] = useState(task.items || []);

    // Calculate progress from local state 'items'
    const totalItems = items.length;
    const doneTask = items.filter(item => item.done).length;
    const progress = totalItems === 0 ? 0 : Math.round((doneTask / totalItems) * 100);

    const handleCheckDone = (e, index) => {
        e.stopPropagation();
        const newItems = [...items];
        newItems[index].done = !newItems[index].done;
        setItems(newItems);
    }
    return (
        <div className="w-full pb-4" draggable onDragStart={handleDragStart}>
            <motion.div
                onClick={handleClick}
                className={`bg-white rounded-2xl px-4 py-2 shadow-sm border border-gray-100 cursor-pointer group relative ${isClick ? 'z-10' : ''}`}
            >
                {/* --- HEADER & PROGRESS --- */}
                <HeaderTask isClick={isClick} doneTask={doneTask} items={items} progress={progress} title={task.title} startDate={task.startDate} endDate={task.endDate} />
                <AnimatePresence>
                    {isClick && (
                        <motion.div
                            initial={{ height: 0, opacity: 0, scale: 0.95 }}
                            animate={{ height: "auto", opacity: 1, scale: 1 }}
                            exit={{ height: 0, opacity: 0, scale: 0.95 }}
                            transition={{
                                height: { duration: 0.4 },
                                opacity: { duration: 0.25, delay: 0.05 },
                                scale: { type: "spring", duration: 0.4, bounce: 0.3 }
                            }}
                            className="overflow-hidden"
                        >
                            <TaskChecklist isClick={isClick} items={items} handleCheckDone={handleCheckDone} />
                        </motion.div>
                    )}
                </AnimatePresence>
                {/* --- FOOTER --- */}
                <div className={`flex justify-between gap-y-2 ${isClick ? 'flex-col' : 'flex-row flex-wrap items-center'}`}>
                    <div className={`flex ${isClick ? 'flex-col pb-3 gap-1' : 'flex-row flex-wrap items-center gap-2'}`}>
                        <Select isClick={isClick} selectedPriority={selectedPriority} setSelectedPriority={setSelectedPriority} options={PRIORITY_OPTIONS} label="Priority" />
                        <Select isClick={isClick} selectedPriority={selectedProgress} setSelectedPriority={setselectedProgress} options={STATUS_OPTIONS} label="In Progress" />
                    </div>
                    <div className={`flex gap-3 ${isClick ? "flex-col items-start" : "flex-row items-center"}`}>
                        <AnimatePresence mode="popLayout">
                            {isClick && (
                                <motion.div
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: "auto" }}
                                    exit={{ opacity: 0, width: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex items-center gap-1 text-gray-500 overflow-hidden"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 shrink-0">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                    </svg>
                                    <span className="text-sm font-medium whitespace-nowrap">Assignees</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="flex items-center -space-x-2">
                            <Assignees isClick={isClick} assignees={task.assignees || []} />
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Task;