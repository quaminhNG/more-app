import React, { useState, useEffect } from 'react';
import TabActive from '../tab-right/TabActive';
import { useToast } from '../../contexts/ToastContext';

const DepartmentDetail = ({ department, onBack, actualEmpCount, onUpdateDepartment }) => {
    const [activeTab, setActiveTab] = useState("Overview");
    const [members, setMembers] = useState([]);
    const { showToast } = useToast();

    useEffect(() => {
        const storedEmps = localStorage.getItem("more_app_employees_v3");
        if (storedEmps) {
            const allEmps = JSON.parse(storedEmps);
            setMembers(allEmps.filter(emp => emp.department === department.name));
        }
    }, [department.name]);

    const handleSetHead = (employeeName) => {
        const updatedDept = { ...department, head: employeeName };
        onUpdateDepartment(updatedDept);
        showToast(`${employeeName} is now the Head of ${department.name}`, "success");
    };

    return (
        <div className="flex-1 h-full bg-white rounded-3xl p-3 md:p-6 relative shadow-sm flex flex-col overflow-hidden">
            <div className="flex items-center gap-4 mb-6 z-10 shrink-0">
                <button onClick={onBack} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                </button>
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white bg-gradient-to-tr ${department.color} shadow-sm shrink-0`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 leading-tight truncate">{department.name}</h2>
                    </div>
                </div>
            </div>

            <div className="mb-6 flex shrink-0">
                <TabActive tabs={[{ name: 'Overview' }, { name: 'Members' }, { name: 'Projects' }]} isActive={activeTab} handleActive={setActiveTab} />
            </div>
            <div className="flex-1 overflow-y-auto w-full pb-4">
                {activeTab === "Overview" && (
                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 h-full flex items-center justify-center flex-col text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mb-4 opacity-50">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
                        </svg>
                        <p className="text-lg font-medium text-gray-500">Overview Placeholder</p>
                        <p className="text-sm">Summary and metrics will appear here.</p>
                    </div>
                )}

                {activeTab === "Members" && (
                    <div className="flex flex-col gap-2 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm h-full overflow-y-auto">
                        {members.length === 0 ? (
                            <div className="flex flex-col items-center justify-center p-10 text-gray-400">
                                <p className="text-sm font-medium">Chưa có thành viên nào.</p>
                            </div>
                        ) : (
                            <>
                                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-50">
                                    <div className="col-span-4">Employee</div>
                                    <div className="col-span-3">Role</div>
                                    <div className="col-span-3">Contact</div>
                                    <div className="col-span-2 text-right">Action</div>
                                </div>
                                {members.map((employee, idx) => (
                                    <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-white hover:bg-gray-50 border-b border-gray-100 last:border-b-transparent p-4 transition-all duration-200 group rounded-xl">
                                        <div className="col-span-4 flex items-center gap-4 min-w-0">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white bg-gradient-to-tr ${employee.color} shadow-sm transition-transform shrink-0`}>
                                                <span className="font-bold text-sm tracking-widest">{employee.initials}</span>
                                            </div>
                                            <div className="flex flex-col min-w-0 flex-1">
                                                <div className="flex flex-wrap lg:flex-nowrap items-center gap-2">
                                                    <span className="font-bold text-sm text-gray-900 group-hover:text-indigo-600 transition-colors truncate flex-1 min-w-0">{employee.name}</span>
                                                    {employee.name === department.head && (
                                                        <span className="flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide bg-indigo-50 text-indigo-600 border border-indigo-100 shrink-0">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3">
                                                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                                            </svg>
                                                            LEAD
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="text-[10px] text-gray-400 font-medium md:hidden mt-0.5">{employee.role}</span>
                                            </div>
                                        </div>
                                        <div className="hidden md:flex flex-col col-span-3">
                                            <span className="text-sm font-semibold text-gray-700 truncate">{employee.role}</span>
                                        </div>
                                        <div className="col-span-3 md:text-right flex items-center justify-between md:justify-end gap-2 text-sm text-gray-500 overflow-hidden">
                                            <span className="truncate text-xs">{employee.email}</span>
                                        </div>
                                        <div className="col-span-2 flex justify-end">
                                            {employee.name !== department.head && (
                                                <button
                                                    onClick={() => handleSetHead(employee.name)}
                                                    className="bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer whitespace-nowrap border border-indigo-100 transition-colors duration-200"
                                                >
                                                    Set as Head
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                )}

                {activeTab === "Projects" && (
                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 h-full flex items-center justify-center flex-col text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mb-4 opacity-50">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5" />
                        </svg>
                        <p className="text-lg font-medium text-gray-500">Projects Placeholder</p>
                        <p className="text-sm">Department's associated projects will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DepartmentDetail;
