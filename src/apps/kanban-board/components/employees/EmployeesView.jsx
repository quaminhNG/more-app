import React, { useState, useEffect, Fragment } from 'react';
import { useToast } from '../../contexts/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Transition } from '@headlessui/react';
import TabLink from '../tab-right/TabLink';
import TabActive from '../tab-right/TabActive';
import ListBox from '../task/ListBox';

const generateInitialEmployees = () => {
    const roles = ["Frontend Developer", "Backend Developer", "Fullstack Developer", "UI/UX Designer", "Graphic Designer", "QA Engineer", "Project Manager", "Business Analyst", "DevOps Engineer", "Marketing Specialist", "Sales Representative", "HR Specialist"];
    const departments = ["Engineering / Tech", "Design", "Product Management", "Quality Assurance", "Sales & Marketing", "Human Resources"];
    const firstNames = ["Ngọc", "Hương", "Lan", "Hoa", "Mai", "Trang", "Linh", "Thủy", "Hà", "An", "Anh", "Minh", "Đức", "Cường", "Tuấn", "Hoàng", "Dũng", "Sơn", "Hải", "Long", "Thành", "Nam", "Quang", "Huy", "Thắng", "Bình", "Hưng", "Tùng", "Phúc", "Tâm"];
    const lastNames = ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Huỳnh", "Phan", "Vũ", "Võ", "Đặng", "Bùi", "Đỗ", "Hồ", "Ngô", "Dương", "Lý"];
    const middleNames = ["Văn", "Khắc", "Thị", "Ngọc", "Thanh", "Minh", "Hữu", "Xuân", "Hồng", "Kim", "Bá", "Đình", "Quốc", "Gia", "Tú", "Thu"];
    const colors = ["from-indigo-400 to-indigo-600", "from-blue-400 to-blue-600", "from-emerald-400 to-emerald-600", "from-orange-400 to-orange-600", "from-amber-400 to-amber-600", "from-pink-400 to-pink-600", "from-purple-400 to-purple-600"];

    const employees = [{
        id: "emp-0",
        name: "Nguyễn Minh Quá",
        role: "CEO",
        department: "Management",
        email: "ceo@more-app.com",
        status: "Active",
        initials: "NQ",
        color: "from-blue-800 to-indigo-900"
    },
    { id: "emp-head-1", name: "Trần Tuấn Anh", role: "Engineering Lead", department: "Engineering / Tech", email: "tuananh.tran@more-app.com", status: "Active", initials: "TA", color: "from-blue-400 to-blue-600" },
    { id: "emp-head-2", name: "Lê Ngọc Hân", role: "Design Lead", department: "Design", email: "ngochan.le@more-app.com", status: "Active", initials: "NH", color: "from-indigo-400 to-indigo-600" },
    { id: "emp-head-3", name: "Phạm Hà Giang", role: "Product Lead", department: "Product Management", email: "hagiang.pham@more-app.com", status: "Active", initials: "HG", color: "from-emerald-400 to-emerald-600" },
    { id: "emp-head-4", name: "Hoàng Gia Bảo", role: "Marketing Lead", department: "Sales & Marketing", email: "giabao.hoang@more-app.com", status: "Active", initials: "GB", color: "from-orange-400 to-orange-600" },
    { id: "emp-head-5", name: "Vũ Thanh Trúc", role: "QA Lead", department: "Quality Assurance", email: "thanhtruc.vu@more-app.com", status: "Active", initials: "TT", color: "from-purple-400 to-purple-600" },
    { id: "emp-head-6", name: "Ngô Quang Phát", role: "HR Lead", department: "Human Resources", email: "quangphat.ngo@more-app.com", status: "Active", initials: "QP", color: "from-pink-400 to-pink-600" }
    ];

    for (let i = 1; i < 100; i++) {
        const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
        const mn = middleNames[Math.floor(Math.random() * middleNames.length)];
        const fn = firstNames[Math.floor(Math.random() * firstNames.length)];
        const fullName = `${ln} ${mn} ${fn}`;
        const nameParts = fullName.split(" ");
        const initials = nameParts.length >= 2 ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase() : fn[0].toUpperCase();

        const role = roles[Math.floor(Math.random() * roles.length)];
        let dept = "Engineering / Tech";
        if (role.includes("Designer")) dept = "Design";
        else if (role.includes("QA")) dept = "Quality Assurance";
        else if (role.includes("Manager") || role.includes("Analyst")) dept = "Product Management";
        else if (role.includes("Marketing") || role.includes("Sales")) dept = "Sales & Marketing";
        else if (role.includes("HR")) dept = "Human Resources";

        const toEng = str => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");

        employees.push({
            id: `emp-${i}`,
            name: fullName,
            role: role,
            department: dept,
            email: `${toEng(fn)}.${toEng(ln)}@more-app.com`,
            status: Math.random() > 0.1 ? "Active" : "On Leave",
            initials: initials,
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }
    return employees;
};

const AddEmployeeModal = ({ isOpen, onClose, onAddEmployee, departmentsList }) => {
    const [department, setDepartment] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const { showToast } = useToast();

    const deptOptions = departmentsList && departmentsList.length > 0
        ? ["None", ...departmentsList.map(d => d.name)]
        : ["None", "Engineering / Tech", "Design", "Product Management", "Sales & Marketing"];

    useEffect(() => {
        if (isOpen) {
            if (!department || !deptOptions.includes(department)) {
                setDepartment("None");
            }
        }
    }, [isOpen, departmentsList]);

    const handleSubmit = () => {
        if (!name.trim()) {
            showToast("Vui lòng nhập họ tên", "warning"); return;
        }
        if (!email.trim() || !email.includes('@')) {
            showToast("Vui lòng nhập đúng email", "warning"); return;
        }
        if (!role.trim()) {
            showToast("Vui lòng nhập chức vụ", "warning"); return;
        }

        const nameParts = name.trim().split(" ");
        const initials = nameParts.length >= 2 ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase() : name.charAt(0).toUpperCase();
        const colors = ["from-indigo-400 to-indigo-600", "from-blue-400 to-blue-600", "from-emerald-400 to-emerald-600", "from-orange-400 to-orange-600", "from-amber-400 to-amber-600", "from-pink-400 to-pink-600", "from-purple-400 to-purple-600"];

        onAddEmployee({
            id: `emp-${Date.now()}`,
            name: name,
            email: email,
            role: role,
            department: department || deptOptions[0],
            status: "Active",
            initials: initials,
            color: colors[Math.floor(Math.random() * colors.length)]
        });

        setName("");
        setEmail("");
        setRole("");
        setDepartment("");
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
                                    <h2 className="text-xl font-bold text-gray-800">Add Employee</h2>
                                    <p className="text-sm text-gray-500 mt-1">Fill in the details for the new employee.</p>
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
                                    <label className="text-sm font-semibold text-gray-600 block mb-1">Full Name</label>
                                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter employee name" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300" />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-600 block mb-1">Email</label>
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email address" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-semibold text-gray-600 block mb-1">Role</label>
                                        <input value={role} onChange={(e) => setRole(e.target.value)} type="text" placeholder="Design Lead, etc." className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-gray-600 block mb-1">Department</label>
                                        <ListBox
                                            selectedPriority={department || deptOptions[0]}
                                            setSelectedPriority={setDepartment}
                                            options={deptOptions}
                                            direction="down"
                                            width="w-full"
                                        />
                                    </div>
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
                                    onClick={handleSubmit}
                                    className="px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 shadow-lg shadow-indigo-500/25 transition-all cursor-pointer"
                                >
                                    Add Employee
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

const StatusDropdown = ({ status, id, handleChangeStatus }) => {
    return (
        <Menu as="div" className="relative inline-block text-left whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
            <div>
                <Menu.Button className={`flex items-center justify-between gap-1 w-24 shrink-0 text-[9px] font-bold px-2 py-1.5 rounded-lg uppercase tracking-wider outline-none transition-colors shadow-sm border cursor-pointer
                    ${status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                        status === 'On Leave' ? 'bg-orange-50 text-orange-600 border-orange-100 hover:bg-orange-100 hover:shadow-orange-500/10' :
                            status === 'Inactive' ? 'bg-gray-50 text-gray-600 border-gray-200' :
                                'bg-red-50 text-red-600 border-red-100'}`}>
                    <span className="truncate">{status}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3 shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-xl bg-white shadow-xl shadow-gray-200/50 ring-1 ring-gray-100 focus:outline-none p-1.5">
                    <div className="flex flex-col gap-1">
                        {['Active', 'On Leave', 'Inactive', 'Terminated'].map((statusOption) => (
                            <Menu.Item key={statusOption}>
                                {({ active }) => (
                                    <button
                                        onClick={() => handleChangeStatus(id, statusOption)}
                                        className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg flex items-center justify-between transition-colors cursor-pointer outline-none
                                            ${active ? (statusOption === 'Active' ? 'bg-emerald-50' : statusOption === 'On Leave' ? 'bg-orange-50' : statusOption === 'Inactive' ? 'bg-gray-100' : 'bg-red-50') : ''}
                                            ${status === statusOption
                                                ? (statusOption === 'Active' ? 'bg-emerald-50 text-emerald-700' : statusOption === 'On Leave' ? 'bg-orange-50 text-orange-700' : statusOption === 'Inactive' ? 'bg-gray-100 text-gray-700' : 'bg-red-50 text-red-700')
                                                : 'text-gray-700'}
                                        `}
                                    >
                                        {statusOption.toUpperCase()}
                                        {status === statusOption && (
                                            <svg
                                                className={`w-3.5 h-3.5 ${statusOption === 'Active' ? 'text-emerald-600' : statusOption === 'On Leave' ? 'text-orange-600' : statusOption === 'Inactive' ? 'text-gray-600' : 'text-red-600'}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="m4.5 12.75 6 6 9-13.5" />
                                            </svg>
                                        )}
                                    </button>
                                )}
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

const EmployeesView = ({ handleOpen, isOpen }) => {
    const [activeTab, setActiveTab] = useState("All Staff");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [departmentsList, setDepartmentsList] = useState([]);
    const { showToast } = useToast();

    const handleChangeStatus = (id, newStatus) => {
        const updatedEmployees = employees.map(emp =>
            emp.id === id ? { ...emp, status: newStatus } : emp
        );
        setEmployees(updatedEmployees);
        localStorage.setItem("more_app_employees_v3", JSON.stringify(updatedEmployees));
        showToast("Status updated successfully", "success");
    };

    const updateDepartmentsFromStorage = () => {
        const storedDepts = localStorage.getItem("more_app_departments_v3");
        if (storedDepts) {
            setDepartmentsList(JSON.parse(storedDepts));
        }
    };

    useEffect(() => {
        const stored = localStorage.getItem("more_app_employees_v3");
        if (stored) {
            setEmployees(JSON.parse(stored));
        } else {
            const initial = generateInitialEmployees();
            setEmployees(initial);
            localStorage.setItem("more_app_employees_v3", JSON.stringify(initial));
        }
        updateDepartmentsFromStorage();
    }, []);

    useEffect(() => {
        if (isOpen) {
            updateDepartmentsFromStorage();
        }
    }, [isOpen]);

    const handleAddEmployee = (newEmp) => {
        const updated = [newEmp, ...employees];
        setEmployees(updated);
        localStorage.setItem("more_app_employees_v3", JSON.stringify(updated));
        showToast("Thêm nhân sự thành công!", "success");
    };

    const displayedEmployees = activeTab === 'Leaders'
        ? employees.filter(emp => emp.role.includes('Lead') || emp.role.includes('Head') || emp.role === 'CEO')
        : employees;

    return (
        <div className="flex-1 h-full bg-white rounded-3xl p-3 md:p-6 relative shadow-sm flex flex-col overflow-hidden">
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
                        <TabLink activeItem="Employees" activeTab="All Staff" />
                    </div>
                </div>

                <div className="flex flex-wrap lg:flex-nowrap items-center gap-3">
                    <div className="hidden md:flex relative">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        <input type="text" placeholder="Search employees..." className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 w-64 shadow-sm" />
                    </div>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex self-start md:self-auto items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-indigo-500/30 transition-all cursor-pointer hover:-translate-y-0.5"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <span className="whitespace-nowrap">Add Employee</span>
                    </button>
                </div>
            </div>

            <div className="mb-6 flex">
                <TabActive tabs={[{ name: 'All Staff' }, { name: 'Leaders' }]} isActive={activeTab} handleActive={setActiveTab} />
            </div>

            <div className="flex-1 overflow-y-auto w-full pb-4">
                <div className="flex flex-col gap-2 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-50">
                        <div className="col-span-4">Employee</div>
                        <div className="col-span-3">Role</div>
                        <div className="col-span-3">Contact</div>
                        <div className="col-span-2 text-right">Status</div>
                    </div>

                    {displayedEmployees.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-10 py-16 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-16 mb-4 text-gray-300">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                            <h3 className="text-lg font-bold text-gray-700 mb-1">Không tìm thấy nhân sự</h3>
                            <p className="text-sm">Chưa có ai ở vị trí Leader trong danh sách này.</p>
                        </div>
                    ) : displayedEmployees.map(employee => (
                        <div key={employee.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-white hover:bg-gray-50 border-b border-gray-100 last:border-b-transparent p-4 transition-all duration-200 cursor-pointer group">

                            <div className="col-span-4 flex items-center gap-4 min-w-0">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white bg-gradient-to-tr ${employee.color} shadow-sm group-hover:scale-105 transition-transform shrink-0`}>
                                    <span className="font-bold text-sm tracking-widest">{employee.initials}</span>
                                </div>
                                <div className="flex flex-col min-w-0 flex-1 gap-1">
                                    <span className="font-bold text-sm text-gray-900 group-hover:text-indigo-600 transition-colors truncate">{employee.name}</span>
                                    <span className="text-xs text-gray-400 font-medium md:hidden mt-0.5 truncate">{employee.role} • {employee.department}</span>
                                    <div className="md:hidden flex items-center justify-between mt-1.5 gap-2 min-w-0">
                                        <div className="flex items-center gap-1.5 min-w-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3.5 shrink-0 text-gray-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                            </svg>
                                            <span className="text-xs text-gray-400 font-medium truncate">{employee.email}</span>
                                        </div>
                                        <StatusDropdown status={employee.status} id={employee.id} handleChangeStatus={handleChangeStatus} />
                                    </div>
                                </div>
                            </div>

                            <div className="hidden md:flex flex-col col-span-3">
                                <span className="text-sm font-semibold text-gray-700">{employee.role}</span>
                                <span className="text-xs text-gray-400 font-medium mt-0.5">{employee.department} Dept</span>
                            </div>
                            <div className="hidden md:flex items-center gap-2 col-span-3 text-sm text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 shrink-0 text-gray-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                </svg>
                                <span className="truncate">{employee.email}</span>
                            </div>

                            {/* Status */}
                            <div className="hidden md:flex col-span-2 text-right items-center justify-end gap-4 min-w-0">
                                <StatusDropdown status={employee.status} id={employee.id} handleChangeStatus={handleChangeStatus} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <AddEmployeeModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAddEmployee={handleAddEmployee} departmentsList={departmentsList} />
        </div>
    );
};

export default EmployeesView;
