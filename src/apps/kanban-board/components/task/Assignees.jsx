import { motion, AnimatePresence } from "framer-motion";

const Assignees = ({ isClick, assignees }) => {
    return (
        <AnimatePresence>
            {assignees.map((assignee, index) => (
                <div key={index} className="relative z-0">
                    <motion.img
                        className={`w-7 h-7 rounded-full border-2 border-white object-cover transition-all duration-300 ${isClick ? "md:w-8 md:h-8" : "md:w-9 md:h-9"}`}
                        src={assignee.avatar || "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=64&h=64"}
                        alt={assignee.name || "Assignee"}
                    />
                </div>
            ))}
        </AnimatePresence>
    );
};
export default Assignees;