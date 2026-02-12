import { useState } from "react";
import AddTaskModal from "../task/AddTaskModal";

const AddTask = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex items-center">
            <button
                onClick={() => setIsModalOpen(true)}
                className="flex flex-row items-center gap-2 cursor-pointer group"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6 text-gray-400 transition-all duration-500 ease-out
                                                                            group-hover:rotate-[360deg]
                                                                            group-hover:scale-105"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                    />
                </svg>

                <span className="font-semibold text-gray-700 group-hover:scale-105 ease-in-out duration-200">
                    Add Task
                </span>
            </button>

            <AddTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};
export default AddTask;