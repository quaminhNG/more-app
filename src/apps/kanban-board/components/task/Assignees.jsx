import { motion, AnimatePresence } from "framer-motion";

const Assignees = ({ isClick, assignees }) => {
    return (
        <AnimatePresence>
            {assignees.map((assignee, index) => (
                <div key={index} className="relative z-0">
                    {assignee.avatar ? (
                        <motion.img
                            className={`w-7 h-7 rounded-full border-2 border-white object-cover transition-all duration-300 ${isClick ? "md:w-8 md:h-8" : "md:w-9 md:h-9"}`}
                            src={assignee.avatar}
                            alt={assignee.name || "Assignee"}
                            title={assignee.name}
                        />
                    ) : (
                        <motion.div
                            className={`rounded-full border-2 border-white flex items-center justify-center text-white bg-gradient-to-tr ${assignee.color || 'from-gray-400 to-gray-600'} text-xs font-bold shrink-0 transition-all duration-300 ${isClick ? "w-8 h-8 md:w-8 md:h-8" : "w-7 h-7 md:w-9 md:h-9"}`}
                            title={assignee.name}
                        >
                            {assignee.initials || (assignee.name ? assignee.name.charAt(0) : '?')}
                        </motion.div>
                    )}
                </div>
            ))}
        </AnimatePresence>
    );
};
export default Assignees;