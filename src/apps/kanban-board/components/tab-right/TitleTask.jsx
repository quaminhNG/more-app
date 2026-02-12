import { COLOR_BG, COLOR_SPAN } from "../../constants/tab-right/ColorTittleTasks";
const TitleTask = ({ title, count }) => {
    return (
        <div className="flex justify-between items-center mb-4 px-2">
            <div className="flex items-center gap-2">
                <div className={`self-stretch w-[3px] ${COLOR_BG[title]} rounded-full`}></div>
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700">{title}</span>
                    <span className={`${COLOR_SPAN[title]} px-2 py-0.5 rounded-full text-sm font-medium`}>{count}</span>
                </div>
            </div>
        </div>
    );
};
export default TitleTask;