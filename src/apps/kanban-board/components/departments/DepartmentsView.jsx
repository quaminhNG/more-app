import React, { useState, useEffect } from 'react';
import { useToast } from '../../contexts/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';
import TabLink from '../tab-right/TabLink';
import TabActive from '../tab-right/TabActive';
import ListBox from '../task/ListBox';
import DepartmentDetail from './DepartmentDetail';

const COLOR_MAP = {
    "Blue": "from-blue-400 to-blue-600",
    "Emerald": "from-emerald-400 to-emerald-600",
    "Purple": "from-purple-400 to-purple-600",
    "Orange": "from-orange-400 to-orange-600"
};

const defaultDepartments = [
    { id: 1, name: "Engineering / Tech", head: "Trần Tuấn Anh", color: "from-blue-400 to-blue-600" },
    { id: 2, name: "Design", head: "Lê Ngọc Hân", color: "from-indigo-400 to-indigo-600" },
    { id: 3, name: "Product Management", head: "Phạm Hà Giang", color: "from-emerald-400 to-emerald-600" },
    { id: 4, name: "Sales & Marketing", head: "Hoàng Gia Bảo", color: "from-orange-400 to-orange-600" },
    { id: 5, name: "Quality Assurance", head: "Vũ Thanh Trúc", color: "from-purple-400 to-purple-600" },
    { id: 6, name: "Human Resources", head: "Ngô Quang Phát", color: "from-pink-400 to-pink-600" }
];

const AddDepartmentModal = ({ isOpen, onClose, onAddDepartment, employees }) => {
    const [color, setColor] = useState("Blue");
    const [name, setName] = useState("");
    const [head, setHead] = useState("");
    const { showToast } = useToast();

    const employeeOptions = employees.length > 0 ? ["None", ...employees.map(emp => emp.name)] : ["None"];

    useEffect(() => {
        if (isOpen && !head) {
            setHead("None");
        }
    }, [isOpen]);

    const handleAddDepartment = () => {
        if (!name.trim()) {
            showToast("Vui lòng nhập tên phòng ban", "warning");
            return;
        }

        onAddDepartment({
            id: Date.now(),
            name,
            head: head === "None" ? "None" : head,
            color: COLOR_MAP[color] || COLOR_MAP["Blue"]
        });
        setName("");
        setHead("None");
        setColor("Blue");
        onClose();
    };
    if (typeof document === "undefined") return null;

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
                        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md flex flex-col">
                            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">Add Department</h2>
                                    <p className="text-sm text-gray-500 mt-1">Create a new functional department.</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-1.5 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5 text-gray-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="text-sm font-semibold text-gray-600 block mb-1">Department Name</label>
                                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="e.g., Accounting, HR..." className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300" />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-600 block mb-1">Department Head</label>
                                    <ListBox
                                        selectedPriority={head || employeeOptions[0]}
                                        setSelectedPriority={setHead}
                                        options={employeeOptions}
                                        direction="down"
                                        width="w-full"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-600 block mb-1">Identifier Color</label>
                                    <ListBox
                                        selectedPriority={color}
                                        setSelectedPriority={setColor}
                                        options={["Blue", "Emerald", "Purple", "Orange"]}
                                        direction="down"
                                        width="w-full"
                                    />
                                </div>
                            </div>

                            <div className="flex bg-gray-50 p-4 gap-3 justify-end border-t border-gray-100 rounded-b-3xl">
                                <button
                                    onClick={onClose}
                                    className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-white hover:shadow-sm transition-all cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddDepartment}
                                    className="px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 shadow-lg shadow-indigo-500/25 transition-all cursor-pointer"
                                >
                                    Create Department
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

const DepartmentsView = ({ handleOpen, isOpen }) => {
    const [activeTab, setActiveTab] = useState('All');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const { showToast } = useToast();

    useEffect(() => {
        const storedDepts = localStorage.getItem("more_app_departments_v3");
        if (storedDepts) {
            setDepartments(JSON.parse(storedDepts));
        } else {
            setDepartments(defaultDepartments);
            localStorage.setItem("more_app_departments_v3", JSON.stringify(defaultDepartments));
        }

        const storedEmps = localStorage.getItem("more_app_employees_v3");
        if (storedEmps) {
            setEmployees(JSON.parse(storedEmps));
        }
    }, []);

    const handleAddDepartment = (newDept) => {
        const updated = [newDept, ...departments];
        setDepartments(updated);
        localStorage.setItem("more_app_departments_v3", JSON.stringify(updated));
        showToast("Thêm phòng ban thành công!", "success");
    };

    const handleUpdateDepartment = (updatedDept) => {
        const updated = departments.map(d => d.id === updatedDept.id ? updatedDept : d);
        setDepartments(updated);
        localStorage.setItem("more_app_departments_v3", JSON.stringify(updated));
        setSelectedDepartment(updatedDept);
    };

    return (
        <>
            {selectedDepartment ? (
                <DepartmentDetail
                    department={selectedDepartment}
                    onBack={() => setSelectedDepartment(null)}
                    actualEmpCount={employees.filter(emp => emp.department === selectedDepartment.name).length}
                    onUpdateDepartment={handleUpdateDepartment}
                />
            ) : (
                <div className="flex-1 h-full bg-white rounded-3xl p-3 md:p-6 relative shadow-sm flex flex-col overflow-y-auto">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 z-10 shrink-0 gap-4">
                        <div className="flex items-center">
                            <div className={`transition-all duration-300 ease-in-out flex items-center ${!isOpen ? 'w-10 mr-6 opacity-100 visible' : 'w-0 mr-0 opacity-0 invisible'}`}>
                                <button onClick={handleOpen} className="p-2 cursor-pointer bg-gray-100 rounded-xl shadow-lg hover:bg-gray-50 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                                    </svg>
                                </button>
                            </div>
                            <div>
                                <TabLink activeItem="Departments" activeTab="All" />
                            </div>
                        </div>

                        <div className="flex flex-wrap lg:flex-nowrap items-center gap-3">
                            <div className="hidden md:flex relative">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                                <input type="text" placeholder="Search departments..." className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 w-64 shadow-sm" />
                            </div>
                            <button
                                onClick={() => setIsAddModalOpen(true)}
                                className="flex self-start md:self-auto items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-indigo-500/30 transition-all cursor-pointer hover:-translate-y-0.5"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                <span className="whitespace-nowrap">New Department</span>
                            </button>
                        </div>
                    </div>

                    <div className="mb-6 flex space-x-2 items-center justify-between">
                        <TabActive tabs={[{ name: 'All' }, { name: 'Overview' }]} isActive={activeTab} handleActive={setActiveTab} />
                    </div>

                    <div className="flex-1 overflow-y-auto w-full pb-4">
                        {activeTab === 'All' ? (
                            <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-5 md:gap-6 pr-1">
                                {departments.map(dept => {
                                    const actualEmpCount = employees.filter(emp => emp.department === dept.name).length;
                                    return (
                                        <div key={dept.id} onClick={() => setSelectedDepartment(dept)} className={`group relative bg-gradient-to-br ${dept.color} rounded-3xl p-6 cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:brightness-105`}>
                                            <div className="absolute -right-8 -top-8 w-36 h-36 bg-white/10 rounded-full pointer-events-none" />
                                            <div className="absolute -left-6 -bottom-10 w-28 h-28 bg-black/10 rounded-full pointer-events-none" />

                                            <div className="relative z-10 flex flex-col h-full min-h-[120px]">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                                                        </svg>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-3xl font-black text-white leading-none">{actualEmpCount}</div>
                                                        <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest mt-0.5">Members</div>
                                                    </div>
                                                </div>

                                                <div className="mt-auto">
                                                    <h3 className="text-lg font-extrabold text-white leading-tight uppercase tracking-tight">{dept.name}</h3>
                                                    <p className="text-xs text-white/70 font-medium mt-1.5">
                                                        <span className="text-white/50">Lead · </span>{dept.head}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center p-10 min-h-[500px] border-2 border-dashed border-gray-200 rounded-3xl mt-4">
                                <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 text-indigo-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 19.5 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Department Insights Hub</h3>
                                <p className="text-gray-500 text-center max-w-md">The analytic overview showing the distribution of employees, productivity, and budgets by department is coming soon.</p>
                            </div>
                        )}
                    </div>
                    <AddDepartmentModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAddDepartment={handleAddDepartment} employees={employees} />
                </div>
            )}
        </>
    );
};

export default DepartmentsView;
