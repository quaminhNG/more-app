import React, { useState, useEffect, useMemo } from 'react';
import TabLink from '../tab-right/TabLink';
import TabActive from '../tab-right/TabActive';

const DashboardView = ({ handleOpen, isOpen }) => {
    const [activeTab, setActiveTab] = useState('Overview');
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState({ todo: [], inProgress: [], inReview: [], done: [] });

    useEffect(() => {
        const storedProjects = localStorage.getItem("more_app_projects");
        if (storedProjects) setProjects(JSON.parse(storedProjects));

        const storedTasks = localStorage.getItem("more_app_tasks_v3");
        if (storedTasks) setTasks(JSON.parse(storedTasks));
    }, []);

    const metrics = useMemo(() => {
        const activeProjectsCount = projects.filter(p => !p.isDeleted && p.status === 'In Progress').length || 0;

        const allPendingTasks = [...(tasks.todo || []), ...(tasks.inProgress || []), ...(tasks.inReview || [])];
        const pendingCount = allPendingTasks.filter(t => !t.isDeleted).length || 0;

        const completedCount = (tasks.done || []).filter(t => !t.isDeleted).length || 0;

        const totalValidTasks = pendingCount + completedCount;
        const completionRate = totalValidTasks > 0 ? Math.round((completedCount / totalValidTasks) * 100) : 0;

        return {
            activeProjects: activeProjectsCount,
            pendingTasks: pendingCount,
            completedTasks: completedCount,
            productivity: completionRate
        }
    }, [projects, tasks]);

    return (
        <div className="flex-1 h-full bg-white rounded-3xl p-3 md:p-6 relative shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 z-10 shrink-0 gap-4">
                <div className="flex items-center">
                    <div className={`transition-all duration-300 ease-in-out flex items-center ${!isOpen ? 'w-10 mr-6 opacity-100 visible' : 'w-0 mr-0 opacity-0 invisible'}`}>
                        <button onClick={handleOpen} className="p-2 cursor-pointer bg-gray-100 rounded-xl shadow-lg hover:bg-gray-50 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                            </svg>
                        </button>
                    </div>
                    <div>
                        <TabLink activeItem="Dashboard" activeTab="Overview" />
                    </div>
                </div>

                <button className="hidden sm:flex self-start md:self-auto items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-indigo-500/30 transition-all cursor-pointer hover:-translate-y-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    <span>Download Report</span>
                </button>
            </div>

            <div className="mb-6 flex">
                <TabActive tabs={[{ name: 'Overview' }, { name: 'Reports' }]} isActive={activeTab} handleActive={setActiveTab} />
            </div>

            {activeTab === 'Overview' ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 w-full">
                        <div className="bg-white border-l-4 border-indigo-500 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-16 text-indigo-500"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0A2.25 2.25 0 0 0 1.5 12v4.5c0 1.242.101 2.454.296 3.619a2.25 2.25 0 0 0 2.193 1.881h16.022a2.25 2.25 0 0 0 2.193-1.881 24.373 24.373 0 0 0 .296-3.619V12a2.25 2.25 0 0 0-2.25-2.224M3.75 9.776 5.8 4.65A2.25 2.25 0 0 1 7.89 3h8.22a2.25 2.25 0 0 1 2.09 1.65l2.05 5.126M12 15.75h.008v.008H12v-.008Z" /></svg>
                            </div>
                            <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2 relative z-10">Active Projects</h3>
                            <div className="flex items-end gap-3 relative z-10">
                                <h2 className="text-4xl font-extrabold text-gray-900 leading-none">{metrics.activeProjects}</h2>
                                <span className="text-sm font-bold text-gray-400 flex items-center bg-gray-50 px-2 py-0.5 rounded-md">
                                    Live
                                </span>
                            </div>
                        </div>
                        <div className="bg-white border-l-4 border-blue-500 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-16 text-blue-500"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" /></svg>
                            </div>
                            <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2 relative z-10">Tasks Pending</h3>
                            <div className="flex items-end gap-3 relative z-10">
                                <h2 className="text-4xl font-extrabold text-gray-900 leading-none">{metrics.pendingTasks}</h2>
                                <span className="text-sm font-bold text-gray-400 flex items-center bg-gray-50 px-2 py-0.5 rounded-md">
                                    To Do & Doing
                                </span>
                            </div>
                        </div>
                        <div className="bg-white border-l-4 border-emerald-500 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-16 text-emerald-500"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                            </div>
                            <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2 relative z-10">Tasks Completed</h3>
                            <div className="flex items-end gap-3 relative z-10">
                                <h2 className="text-4xl font-extrabold text-gray-900 leading-none">{metrics.completedTasks}</h2>
                                <span className="text-sm font-bold text-gray-400 flex items-center bg-gray-50 px-2 py-0.5 rounded-md">
                                    Done
                                </span>
                            </div>
                        </div>

                        <div className="bg-white border-l-4 border-orange-500 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-16 text-orange-500"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg>
                            </div>
                            <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2 relative z-10">Productivity</h3>
                            <div className="flex items-end gap-3 relative z-10">
                                <h2 className="text-4xl font-extrabold text-gray-900 leading-none">{metrics.productivity}%</h2>
                                <span className="text-sm font-bold text-gray-400 flex items-center bg-gray-50 px-2 py-0.5 rounded-md">
                                    Completion Rate
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 w-full">

                        <div className="xl:col-span-2 space-y-6 flex flex-col">
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex-1 flex flex-col min-h-[350px]">
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800">Weekly Task Completion</h3>
                                        <p className="text-sm text-gray-500 font-medium">Overview of team productivity over the last 7 days.</p>
                                    </div>
                                    <div className="hidden sm:flex gap-2 bg-gray-100 p-1 rounded-lg">
                                        <button className="px-3 py-1.5 bg-white text-gray-800 font-bold text-sm rounded cursor-pointer shadow-sm">Week</button>
                                        <button className="px-3 py-1.5 text-gray-500 font-medium text-sm rounded hover:text-gray-800 cursor-pointer transition-colors">Month</button>
                                    </div>
                                </div>

                                <div className="relative flex-1 bg-gray-50/50 rounded-2xl flex items-end px-4 pb-8 pt-10 border border-gray-50">
                                    <div className="absolute inset-x-0 bottom-8 top-10 flex flex-col justify-between px-4">
                                        <div className="border-b border-gray-200/60 w-full h-0"></div>
                                        <div className="border-b border-gray-200/60 w-full h-0"></div>
                                        <div className="border-b border-gray-200/60 w-full h-0"></div>
                                        <div className="border-b border-gray-200/60 w-full h-0"></div>
                                    </div>

                                    <div className="w-full flex justify-between items-end h-full z-10 px-2 lg:px-8 relative">
                                        {[30, 60, 45, 80, 50, 95, 70].map((height, i) => (
                                            <div key={i} className="flex flex-col items-center group w-1/12 min-w-[30px]">
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs font-bold py-1 px-2 rounded mb-2 absolute -mt-10 pointer-events-none z-20 whitespace-nowrap">
                                                    {height} Tasks
                                                </div>
                                                <div
                                                    className={`w-full rounded-t-lg transition-all duration-500 ease-out group-hover:brightness-110 cursor-pointer ${i === 5 ? 'bg-indigo-600' : 'bg-indigo-300'}`}
                                                    style={{ height: `${height}%` }}
                                                ></div>
                                                <span className="text-xs font-bold text-gray-400 mt-3 absolute -bottom-6">
                                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col space-y-6">
                            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-6 shadow-md text-white flex-1 relative overflow-hidden">
                                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl pointer-events-none"></div>
                                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl pointer-events-none"></div>

                                <div className="flex justify-between items-center mb-6 relative z-10">
                                    <h3 className="text-lg font-bold">Team Activity</h3>
                                    <span className="bg-indigo-500/50 px-2 py-1 rounded text-xs font-bold border border-indigo-400/30 w-fit flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div> Live</span>
                                </div>

                                <div className="space-y-4 relative z-10">
                                    {[
                                        { name: "Sarah Connor", role: "Design Lead", action: "commented on", target: "Website Mockups", time: "5m ago", avatar: "SC" },
                                        { name: "John Doe", role: "Developer", action: "moved task to Done", target: "API Integration", time: "12m ago", avatar: "JD" },
                                        { name: "Emily Chen", role: "Product Manager", action: "created new project", target: "Q3 Roadmap", time: "1h ago", avatar: "EC" }
                                    ].map((user, i) => (
                                        <div key={i} className="flex gap-3 items-start p-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer border border-transparent hover:border-white/10">
                                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm shrink-0 shadow-inner">
                                                {user.avatar}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium leading-tight">
                                                    <span className="font-bold">{user.name}</span> <span className="opacity-80">{user.action}</span> <span className="font-bold opacity-100">{user.target}</span>
                                                </p>
                                                <p className="text-xs text-indigo-200 font-medium mt-1">{user.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full mt-6 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold transition-colors border border-white/20">View All Activity</button>
                            </div>
                        </div>

                    </div>
                </>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-10 min-h-[500px] border-2 border-dashed border-gray-200 rounded-3xl mt-4">
                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-12 text-gray-300">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Reports Generating</h3>
                    <p className="text-gray-500 text-center max-w-md">Detailed PDF and spreadsheet exports will be available in the upcoming v4.0 update. Stay tuned!</p>
                </div>
            )}
        </div>
    );
};
export default DashboardView;
