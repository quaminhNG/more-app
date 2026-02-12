import { COLOR_BG, COLOR_SPAN } from "../../constants/tab-right/ColorTittleTasks";
import AddTask from "./AddTask";
const TitleTask = ({ title, count, handleAddTask }) => {
    return (
        <div className="flex justify-between items-center mb-4 px-2">
            <div className="flex items-center gap-2">
                <div className={`self-stretch w-[3px] ${COLOR_BG[title]} rounded-full`}></div>

                <span className="font-semibold text-gray-700">{title}</span>

                <span className={`${COLOR_SPAN[title]} px-2 py-0.5 rounded-full text-sm font-medium`}>
                    {count}
                </span>
            </div>
            {title === "To Do" && (
                <AddTask handleAddTask={handleAddTask} />
            )}
        </div>
    );
};
export default TitleTask;