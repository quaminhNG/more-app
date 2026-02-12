import { Listbox } from "@headlessui/react";
import { LIST_BOX_COLOR } from "../../constants/task/ListBoxColors"
const ListBox = ({ selectedPriority, setSelectedPriority, options, direction = "up", width = "w-32 sm:w-38", selectStatusAndMoveTask }) => {

    return (
        <Listbox value={selectedPriority} onChange={setSelectedPriority}>
            <div className={`relative ${width} mb-2`}>
                <Listbox.Button className={`w-full flex items-center justify-between px-4 py-1.5 md:py-2 rounded-xl border border-none shadow-sm text-sm font-medium focus:outline-none transition-colors ${LIST_BOX_COLOR[selectedPriority] || "bg-white text-gray-500"}`}>
                    <span className="truncate">{selectedPriority}</span>
                    <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </Listbox.Button>
                <Listbox.Options className={`absolute ${direction === "up" ? "bottom-full mb-2" : "top-full mt-2"} z-[100] w-full bg-white rounded-xl shadow-lg p-1 focus:outline-none border-none max-h-60 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']`}>
                    {options.map((item) => (
                        <Listbox.Option
                            selectStatusAndMoveTask={selectStatusAndMoveTask}
                            key={item}
                            value={item}
                            className={({ active }) =>
                                `cursor-pointer px-3 py-1.5 rounded-lg text-sm transition-colors mb-1 last:mb-0 ${LIST_BOX_COLOR[item]
                                    ? `${LIST_BOX_COLOR[item]} ${active ? "brightness-95" : ""}`
                                    : `${active ? "bg-gray-100" : ""} text-gray-700`
                                }`
                            }
                        >
                            {item}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </div>
        </Listbox>
    );
};
export default ListBox;