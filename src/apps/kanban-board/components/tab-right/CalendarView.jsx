import React, { useState } from 'react';

const CALENDAR_DAYS = [
    { day: 26, isToday: false, tasks: [] },
    { day: 27, isToday: false, tasks: [] },
    { day: 28, isToday: false, tasks: [] },
    { day: 29, isToday: false, tasks: [] },
    { day: 30, isToday: false, tasks: [] },
    { day: 1, isToday: false, tasks: [] },
    { day: 2, isToday: false, tasks: [] },
    { day: 3, isToday: false, tasks: [{ title: "Sprint Planning", color: "bg-purple-100/50 text-purple-700 border-purple-200" }] },
    { day: 4, isToday: false, tasks: [] },
    { day: 5, isToday: false, tasks: [] },
    { day: 6, isToday: false, tasks: [{ title: "Review Design", color: "bg-amber-100/50 text-amber-700 border-amber-200" }] },
    { day: 7, isToday: false, tasks: [] },
    { day: 8, isToday: false, tasks: [] },
    { day: 9, isToday: false, tasks: [] },
    { day: 10, isToday: false, tasks: [{ title: "Client Demo", color: "bg-red-100/50 text-red-700 border-red-200" }] },
    { day: 11, isToday: false, tasks: [] },
    { day: 12, isToday: false, tasks: [] },
    { day: 13, isToday: false, tasks: [] },
    { day: 14, isToday: false, tasks: [] },
    { day: 15, isToday: true, tasks: [{ title: "Deploy Production", color: "bg-emerald-100/50 text-emerald-700 border-emerald-200" }, { title: "Team Lunch", color: "bg-blue-100/50 text-blue-700 border-blue-200" }] },
    { day: 16, isToday: false, tasks: [] },
    { day: 17, isToday: false, tasks: [] },
    { day: 18, isToday: false, tasks: [] },
    { day: 19, isToday: false, tasks: [] },
    { day: 20, isToday: false, tasks: [{ title: "Retro", color: "bg-gray-100/50 text-gray-700 border-gray-200" }] },
    { day: 21, isToday: false, tasks: [] },
    { day: 22, isToday: false, tasks: [] },
    { day: 23, isToday: false, tasks: [] },
    { day: 24, isToday: false, tasks: [] },
    { day: 25, isToday: false, tasks: [] },
    { day: 26, isToday: false, tasks: [] },
    { day: 27, isToday: false, tasks: [] },
    { day: 28, isToday: false, tasks: [] },
    { day: 29, isToday: false, tasks: [] },
    { day: 30, isToday: false, tasks: [] },
];
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const CalendarView = () => {
    return (
        <div className="w-full h-full flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
                <h2 className="text-lg font-semibold text-gray-800">October 2023</h2>
                <div className="flex gap-2">
                    <button className="p-1.5 rounded-lg hover:bg-white hover:shadow-sm text-gray-500 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-white hover:shadow-sm text-gray-500 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="hidden md:grid grid-cols-7 border-b border-gray-100 bg-gray-50 text-center">
                {WEEKDAYS.map(day => (
                    <div key={day} className="py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        {day}
                    </div>
                ))}
            </div>

            <div className="flex-1 overflow-y-auto">
                <div className="flex flex-col md:hidden">
                    {CALENDAR_DAYS.filter(d => d.tasks.length > 0 || d.isToday).map((date, idx) => (
                        <div key={idx} className={`p-4 border-b border-gray-50 flex gap-4 ${date.isToday ? 'bg-indigo-50/20' : ''}`}>
                            <div className="flex flex-col items-center min-w-[3rem]">
                                <span className="text-xs text-gray-400 font-medium uppercase">{WEEKDAYS[idx % 7]}</span>
                                <span className={`text-xl font-bold ${date.isToday ? 'text-indigo-600' : 'text-gray-800'}`}>{date.day}</span>
                            </div>
                            <div className="flex-1 flex flex-col gap-2">
                                {date.tasks.length > 0 ? (
                                    date.tasks.map((task, tIdx) => (
                                        <div key={tIdx} className={`p-2 rounded-lg border text-sm font-medium ${task.color}`}>
                                            {task.title}
                                        </div>
                                    ))
                                ) : (
                                    <span className="text-sm text-gray-400 italic">No events</span>
                                )}
                            </div>
                        </div>
                    ))}
                    <div className="p-8 text-center text-gray-400 text-sm">
                        Scroll to view more events...
                    </div>
                </div>
                <div className="hidden md:grid grid-cols-7 h-full min-h-[500px]">
                    {CALENDAR_DAYS.map((date, idx) => (
                        <div key={idx} className={`border-b border-r border-gray-50 p-2 relative group hover:bg-gray-50/30 transition-colors flex flex-col ${idx % 7 === 6 ? 'border-r-0' : ''} ${date.isToday ? 'bg-indigo-50/10' : ''}`}>
                            <div className="flex justify-between items-start mb-1">
                                <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${date.isToday ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-700'}`}>
                                    {date.day}
                                </span>
                            </div>

                            <div className="flex-1 flex flex-col gap-1 overflow-y-auto overflow-x-hidden max-h-[100px] no-scrollbar">
                                {date.tasks.map((task, tIdx) => (
                                    <div key={tIdx} className={`text-[10px] font-medium px-2 py-1.5 rounded border truncate transition-all hover:bg-opacity-80 hover:shadow-sm ${task.color} cursor-pointer`}>
                                        {task.title}
                                    </div>
                                ))}
                            </div>

                            <button className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 p-1.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-all shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CalendarView;
