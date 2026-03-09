import React, { useState } from 'react';
import TabLink from '../tab-right/TabLink';
import TabActive from '../tab-right/TabActive';

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const RefreshIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
);
const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
    </svg>
);
const ChatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
    </svg>
);
const FolderIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0A2.25 2.25 0 0 0 1.5 12v4.5c0 1.242.101 2.454.296 3.619a2.25 2.25 0 0 0 2.193 1.881h16.022a2.25 2.25 0 0 0 2.193-1.881 24.373 24.373 0 0 0 .296-3.619V12a2.25 2.25 0 0 0-2.25-2.224M3.75 9.776 5.8 4.65A2.25 2.25 0 0 1 7.89 3h8.22a2.25 2.25 0 0 1 2.09 1.65l2.05 5.126M12 15.75h.008v.008H12v-.008Z" />
    </svg>
);

const ACTIVITY = [
    { icon: <CheckIcon />, bg: 'bg-emerald-50', color: 'text-emerald-500', time: 'Today, 10:30 AM', title: 'Completed task', sub: '"Design new Profile View" — Kanban Board' },
    { icon: <RefreshIcon />, bg: 'bg-blue-50', color: 'text-blue-500', time: 'Yesterday, 4:15 PM', title: 'Moved to In Progress', sub: '"Fix navigation bugs" — Kanban Board' },
    { icon: <PlusIcon />, bg: 'bg-indigo-50', color: 'text-indigo-500', time: 'Mar 3, 2026', title: 'Joined project', sub: '"Q1 Marketing Campaign" — added by Sarah' },
    { icon: <ChatIcon />, bg: 'bg-violet-50', color: 'text-violet-500', time: 'Mar 2, 2026', title: 'Left a comment', sub: '"Looks great, let\'s ship it!" — Timeline Task' },
    { icon: <FolderIcon />, bg: 'bg-orange-50', color: 'text-orange-500', time: 'Mar 1, 2026', title: 'Created new project', sub: '"Internal Dashboard Revamp"' },
];

const ProfileView = ({ handleOpen, isOpen }) => {
    const [activeSection, setActiveSection] = useState('Activity');

    return (
        <div className="flex-1 h-full flex overflow-hidden rounded-3xl shadow-sm bg-gray-50">
            <div className="hidden lg:flex w-72 xl:w-80 shrink-0 flex-col bg-gradient-to-b from-indigo-600 via-violet-600 to-purple-700 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full p-8 justify-between">
                    <div className="flex flex-col items-center text-center mt-6 mb-8">
                        <div className="relative">
                            <div className="w-28 h-28 rounded-full bg-white/20 ring-4 ring-white/30 flex items-center justify-center text-4xl font-black text-white backdrop-blur-sm">
                                JD
                            </div>
                            <span className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-400 rounded-full ring-2 ring-white shadow" />
                        </div>
                        <h1 className="text-2xl font-black text-white mt-5 leading-tight">John Doe</h1>
                        <p className="text-white/70 text-sm font-medium mt-1">Senior Frontend Engineer</p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-8 text-center">
                        {[
                            { v: '12', l: 'Projects' },
                            { v: '148', l: 'Tasks' },
                            { v: '5', l: 'Active' },
                        ].map(s => (
                            <div key={s.l}>
                                <div className="text-2xl font-black text-white">{s.v}</div>
                                <div className="text-[11px] text-white/50 font-bold uppercase tracking-wider mt-0.5">{s.l}</div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-4 mb-8">
                        {[
                            { label: 'john.doe@example.com', icon: 'M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75' },
                            { label: '+1 (555) 123-4567', icon: 'M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.54-4.24-7.136-7.136l1.292-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z' },
                            { label: 'San Francisco, CA', icon: 'M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z' },
                        ].map(item => (
                            <div key={item.label} className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-white/70">
                                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                                    </svg>
                                </div>
                                <span className="text-sm text-white/70 font-medium truncate">{item.label}</span>
                            </div>
                        ))}
                    </div>

                    <button className="w-full py-2.5 px-6 bg-white/10 hover:bg-white text-white hover:text-red-500 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all backdrop-blur-sm">
                        Log Out
                    </button>
                </div>
            </div>

            <div className="flex-1 flex flex-col p-4 md:p-8 overflow-y-auto min-w-0 bg-white md:bg-gray-50 md:rounded-r-3xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 z-10 shrink-0 gap-4">
                    <div className="flex items-center">
                        <div className={`transition-all duration-300 ease-in-out flex items-center ${!isOpen ? 'w-10 mr-4 opacity-100 visible' : 'w-0 mr-0 opacity-0 invisible'}`}>
                            <button onClick={handleOpen} className="p-2 cursor-pointer bg-gray-100 rounded-xl shadow-lg hover:bg-gray-50 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                                </svg>
                            </button>
                        </div>
                        <div>
                            <TabLink activeItem="Profile" activeTab={activeSection} />
                        </div>
                    </div>

                    <button onClick={() => setActiveSection('Edit')} className="hidden sm:flex self-start md:self-auto items-center px-5 py-2.5 text-sm font-bold text-indigo-600 hover:text-white bg-indigo-50 hover:bg-indigo-600 rounded-xl transition-all cursor-pointer shadow-sm md:shadow-md hover:shadow-lg hover:-translate-y-0.5">
                        Edit Profile
                    </button>
                </div>

                <div className="lg:hidden flex flex-col px-5 py-6 mb-6 bg-gradient-to-tr from-indigo-500 to-violet-500 rounded-2xl text-white shadow-lg shadow-indigo-500/20">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-xl font-black ring-4 ring-white/30 backdrop-blur-sm shrink-0">JD</div>
                        <div className="flex-1 min-w-0">
                            <h1 className="text-xl font-black truncate">John Doe</h1>
                            <p className="text-sm text-white/80 font-medium truncate">Senior Frontend Engineer</p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-5">
                        <div className="flex gap-2 items-center w-full sm:w-auto">
                            <button onClick={() => setActiveSection('Edit')} className="flex-1 sm:flex-none justify-center flex items-center px-4 py-2 text-sm font-bold text-white hover:text-indigo-600 bg-white/20 hover:bg-white rounded-xl transition-all cursor-pointer backdrop-blur-sm shadow-md hover:shadow-lg">
                                Edit Profile
                            </button>
                            <button onClick={() => { }} className="flex-1 sm:flex-none justify-center flex items-center px-4 py-2 text-sm font-bold text-white hover:text-red-500 bg-white/10 hover:bg-white rounded-xl transition-all cursor-pointer backdrop-blur-sm shadow-md hover:shadow-lg">
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>

                {activeSection !== 'Edit' && (
                    <div className="mb-6 flex shrink-0">
                        <TabActive
                            tabs={[{ name: 'Activity' }, { name: 'About' }]}
                            isActive={activeSection}
                            handleActive={setActiveSection}
                        />
                    </div>
                )}

                <div className="flex-1 md:px-2 overflow-y-auto min-w-0">

                    {activeSection === 'Activity' && (
                        <div>
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-2xl font-black text-gray-900">Recent Activity</h2>
                                    <p className="text-sm text-gray-400 font-medium mt-1">Your last 30 days at a glance</p>
                                </div>
                                <div className="hidden md:flex gap-1.5 items-end">
                                    {[3, 5, 2, 7, 4, 6, 1].map((h, i) => (
                                        <div key={i} title={`${h} events`} style={{ height: `${h * 6 + 8}px` }} className={`w-4 rounded-sm ${h > 5 ? 'bg-indigo-500' : h > 3 ? 'bg-indigo-300' : 'bg-indigo-100'} transition-all`} />
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-0">
                                {ACTIVITY.map((item, idx) => (
                                    <div key={idx} className="group flex gap-5 py-5 px-4 border-b border-gray-100 last:border-0 hover:bg-white rounded-2xl transition-all duration-200 cursor-default">
                                        <div className="shrink-0 mt-1">
                                            <div className={`w-10 h-10 rounded-2xl ${item.bg} ${item.color} group-hover:shadow-sm flex items-center justify-center transition-all`}>
                                                {item.icon}
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">{item.title}</h4>
                                            <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{item.sub}</p>
                                        </div>
                                        <div className="shrink-0 text-right">
                                            <span className="text-[11px] font-bold text-gray-400 whitespace-nowrap">{item.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeSection === 'About' && (
                        <div className="max-w-2xl">
                            <h2 className="text-2xl font-black text-gray-900 mb-8">About Me</h2>
                            <p className="text-gray-600 font-medium leading-loose text-base mb-10">
                                Passionate Frontend Engineer with over <strong className="text-gray-900">5 years</strong> of experience building modern, responsive, and highly interactive web applications. I specialize in React, TypeScript, Tailwind CSS and product-focused UX design. Always eager to learn new technologies and push the user experience further.
                            </p>
                            <div>
                                <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-5">Contact Info</p>
                                <div className="space-y-4">
                                    {[
                                        { label: 'Email', value: 'john.doe@example.com' },
                                        { label: 'Phone', value: '+1 (555) 123-4567' },
                                        { label: 'Location', value: 'San Francisco, CA' },
                                        { label: 'Department', value: 'Engineering' },
                                    ].map(item => (
                                        <div key={item.label} className="flex items-baseline gap-4">
                                            <span className="text-[11px] font-black uppercase tracking-widest text-gray-300 w-24 shrink-0">{item.label}</span>
                                            <span className="text-sm font-semibold text-gray-700">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'Edit' && (
                        <div className="max-w-2xl">
                            <h2 className="text-2xl font-black text-gray-900 mb-8">Edit Profile</h2>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                                        <input type="text" defaultValue="John Doe" placeholder="Your name" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 outline-none transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Role</label>
                                        <input type="text" defaultValue="Senior Frontend Engineer" placeholder="Your job title" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 outline-none transition-all" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                                        <input type="email" defaultValue="john.doe@example.com" placeholder="Email address" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 outline-none transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                                        <input type="text" defaultValue="+1 (555) 123-4567" placeholder="Phone number" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 outline-none transition-all" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
                                    <input type="text" defaultValue="San Francisco, CA" placeholder="City, Country" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">About Me</label>
                                    <textarea rows="5" defaultValue="Passionate Frontend Engineer with over 5 years of experience building modern, responsive, and highly interactive web applications. I specialize in React, TypeScript, Tailwind CSS and product-focused UX design. Always eager to learn new technologies and push the user experience further." className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 outline-none transition-all resize-none"></textarea>
                                </div>

                                <div className="flex justify-end gap-3 pt-4">
                                    <button onClick={() => setActiveSection('About')} className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer">Cancel</button>
                                    <button onClick={() => setActiveSection('About')} className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors cursor-pointer shadow-lg shadow-indigo-200">Save Changes</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileView;
