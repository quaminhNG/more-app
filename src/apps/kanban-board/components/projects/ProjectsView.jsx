import React, { useState, useEffect } from 'react';
import { useToast } from '../../contexts/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';
import TabLink from '../tab-right/TabLink';
import TabActive from '../tab-right/TabActive';
import ListBox from '../task/ListBox';
import ProjectDetail from './ProjectDetail';
import ConfirmModal from '../common/ConfirmModal';

const COLOR_MAP = {
    "Blue": "bg-blue-500",
    "Purple": "bg-purple-500",
    "Emerald": "bg-emerald-500",
    "Orange": "bg-orange-500",
    "Pink": "bg-pink-500"
};

const AddProjectModal = ({ isOpen, onClose, onAddProject }) => {
    const [themeColor, setThemeColor] = useState("Blue");
    const [projectName, setProjectName] = useState("");

    const handleSubmit = () => {
        if (!projectName.trim()) return;
        onAddProject({
            id: `proj-${Date.now()}`,
            name: projectName,
            status: "Planning",
            members: [],
            tasks: 0,
            progress: 0,
            color: COLOR_MAP[themeColor] || "bg-blue-500"
        });
        setProjectName("");
        setThemeColor("Blue");
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
                                    <h2 className="text-xl font-bold text-gray-800">Create New Project</h2>
                                    <p className="text-sm text-gray-500 mt-1">Fill in the details for the new project.</p>
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
                                    <label className="text-sm font-semibold text-gray-600 block mb-1">Project Name</label>
                                    <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Enter project name" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300" />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-600 block mb-1">Theme Color</label>
                                    <ListBox
                                        selectedPriority={themeColor}
                                        setSelectedPriority={setThemeColor}
                                        options={["Blue", "Purple", "Emerald", "Orange", "Pink"]}
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
                                    onClick={handleSubmit}
                                    className="px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 shadow-lg shadow-indigo-500/25 transition-all cursor-pointer"
                                >
                                    Create Project
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

const COLOR_OPTIONS = [
    { label: 'Blue', value: 'bg-blue-500' },
    { label: 'Purple', value: 'bg-purple-500' },
    { label: 'Emerald', value: 'bg-emerald-500' },
    { label: 'Orange', value: 'bg-orange-500' },
    { label: 'Pink', value: 'bg-pink-500' },
    { label: 'Rose', value: 'bg-rose-500' },
    { label: 'Indigo', value: 'bg-indigo-500' },
];
const STATUS_LIST = ['Planning', 'In Progress', 'Done'];

const EditProjectModal = ({ project, onClose, onSave }) => {
    const [editName, setEditName] = useState(project?.name || '');
    const [editColor, setEditColor] = useState(project?.color || 'bg-blue-500');
    const [editStatus, setEditStatus] = useState(project?.status || 'Planning');

    React.useEffect(() => {
        if (project) {
            setEditName(project.name);
            setEditColor(project.color);
            setEditStatus(project.status);
        }
    }, [project]);

    if (!project) return null;

    return (
        <AnimatePresence>
            <>
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]"
                    onClick={onClose}
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="fixed inset-0 z-[201] flex items-center justify-center p-4"
                >
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md flex flex-col">
                        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">Edit Project</h2>
                                <p className="text-sm text-gray-400 mt-0.5">Update project information</p>
                            </div>
                            <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5 text-gray-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-6 space-y-5">
                            <div>
                                <label className="text-sm font-semibold text-gray-600 block mb-1.5">Project Name</label>
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    placeholder="Enter project name"
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-600 block mb-1.5">Status</label>
                                <div className="flex gap-2 flex-wrap">
                                    {STATUS_LIST.map(s => (
                                        <button
                                            key={s}
                                            onClick={() => setEditStatus(s)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${editStatus === s
                                                ? s === 'Done' ? 'bg-emerald-500 text-white border-emerald-500'
                                                    : s === 'In Progress' ? 'bg-blue-500 text-white border-blue-500'
                                                        : 'bg-orange-400 text-white border-orange-400'
                                                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                                                }`}
                                        >{s}</button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-600 block mb-1.5">Theme Color</label>
                                <div className="flex gap-2 flex-wrap">
                                    {COLOR_OPTIONS.map(c => (
                                        <button
                                            key={c.value}
                                            onClick={() => setEditColor(c.value)}
                                            className={`w-8 h-8 rounded-full ${c.value} transition-all cursor-pointer ${editColor === c.value ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : 'hover:scale-110'
                                                }`}
                                            title={c.label}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex bg-gray-50 p-4 gap-3 justify-end border-t border-gray-100 rounded-b-3xl">
                            <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-white hover:shadow-sm transition-all cursor-pointer">Cancel</button>
                            <button
                                onClick={() => { if (editName.trim()) onSave({ ...project, name: editName.trim(), color: editColor, status: editStatus }); }}
                                disabled={!editName.trim()}
                                className="px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-300 shadow-lg shadow-indigo-500/25 transition-all cursor-pointer"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </motion.div>
            </>
        </AnimatePresence>
    );
};

const ProjectsView = ({ handleOpen, isOpen }) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [deletingProjectId, setDeletingProjectId] = useState(null);
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [activeProjectsTab, setActiveProjectsTab] = useState("All Projects");
    const { showToast } = useToast();

    useEffect(() => {
        const stored = localStorage.getItem("more_app_projects");
        if (stored) {
            setProjects(JSON.parse(stored));
        } else {
            setProjects([]);
        }
    }, []);

    const handleAddProject = (newProject) => {
        const updated = [newProject, ...projects];
        setProjects(updated);
        localStorage.setItem("more_app_projects", JSON.stringify(updated));
        showToast("Tạo dự án mới thành công!", "success");
    };

    const handleUpdateProject = (updatedProject) => {
        const updated = projects.map(p => p.id === updatedProject.id ? updatedProject : p);
        setProjects(updated);
        localStorage.setItem("more_app_projects", JSON.stringify(updated));
        setSelectedProject(updatedProject);
    };

    const handleDeleteProject = (projectId) => {
        const updated = projects.map(p =>
            p.id === projectId
                ? { ...p, isDeleted: true, deletedAt: new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }) }
                : p
        );
        setProjects(updated);
        localStorage.setItem("more_app_projects", JSON.stringify(updated));
        setSelectedProject(null);
        setDeletingProjectId(null);
        showToast("Đã chuyển dự án vào Trash!", "success");
    };

    const handleRestoreProject = (projectId) => {
        const updated = projects.map(p =>
            p.id === projectId ? { ...p, isDeleted: false, deletedAt: undefined } : p
        );
        setProjects(updated);
        localStorage.setItem("more_app_projects", JSON.stringify(updated));
        showToast("Dự án đã được khôi phục!", "success");
    };

    const handleDeleteForeverProject = (projectId) => {
        const updated = projects.filter(p => p.id !== projectId);
        setProjects(updated);
        localStorage.setItem("more_app_projects", JSON.stringify(updated));
        showToast("Dự án đã bị xóa vĩnh viễn!", "success");
    };

    const handleEmptyProjectTrash = () => {
        const updated = projects.filter(p => !p.isDeleted);
        setProjects(updated);
        localStorage.setItem("more_app_projects", JSON.stringify(updated));
        showToast("Trash đã được làm sạch!", "success");
    };

    const handleEditSave = (updatedProject) => {
        const updated = projects.map(p => p.id === updatedProject.id ? updatedProject : p);
        setProjects(updated);
        localStorage.setItem("more_app_projects", JSON.stringify(updated));
        if (selectedProject?.id === updatedProject.id) setSelectedProject(updatedProject);
        setEditingProject(null);
        showToast("Cập nhật dự án thành công!", "success");
    };

    return (
        <>
            {selectedProject ? (
                <ProjectDetail
                    project={selectedProject}
                    onBack={() => setSelectedProject(null)}
                    onUpdateProject={handleUpdateProject}
                    onDeleteProject={handleDeleteProject}
                />
            ) : (
                <div className="flex-1 h-full bg-white rounded-3xl p-3 md:p-6 relative shadow-sm flex flex-col overflow-hidden">
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
                                <TabLink activeItem="Projects" activeTab="All" />
                            </div>
                        </div>
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="flex self-start md:self-auto items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-indigo-500/30 transition-all cursor-pointer hover:-translate-y-0.5"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            <span className="whitespace-nowrap">New Project</span>
                        </button>
                    </div>
                    <div className="mb-6 flex shrink-0">
                        <TabActive
                            tabs={[
                                { name: 'All Projects' },
                                { name: 'In Progress' },
                                { name: 'Trash', badge: projects.filter(p => p.isDeleted).length || null }
                            ]}
                            isActive={activeProjectsTab}
                            handleActive={setActiveProjectsTab}
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto w-full pb-4">

                        {/* Trash tab */}
                        {activeProjectsTab === "Trash" && (() => {
                            const deletedProjects = projects.filter(p => p.isDeleted);
                            return (
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-gray-500 font-medium">
                                            {deletedProjects.length > 0 ? `${deletedProjects.length} deleted projects` : 'Empty Trash'}
                                        </p>
                                        {deletedProjects.length > 0 && (
                                            <button onClick={handleEmptyProjectTrash} className="flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-xl transition-colors cursor-pointer">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                                Empty Trash
                                            </button>
                                        )}
                                    </div>
                                    {deletedProjects.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center h-64 text-gray-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 mb-3">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                            <p className="text-base font-medium text-gray-400">Empty Trash</p>
                                            <p className="text-sm text-gray-400 mt-1">All deleted projects will appear here.</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                                            {deletedProjects.map(project => (
                                                <div key={project.id} className="group bg-white border border-dashed border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col gap-3 opacity-75 hover:opacity-100 transition-opacity">
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${project.color} opacity-60 shrink-0`}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0A2.25 2.25 0 0 0 1.5 12v4.5c0 1.242.101 2.454.296 3.619a2.25 2.25 0 0 0 2.193 1.881h16.022a2.25 2.25 0 0 0 2.193-1.881 24.373 24.373 0 0 0 .296-3.619V12a2.25 2.25 0 0 0-2.25-2.224M3.75 9.776 5.8 4.65A2.25 2.25 0 0 1 7.89 3h8.22a2.25 2.25 0 0 1 2.09 1.65l2.05 5.126M12 15.75h.008v.008H12v-.008Z" />
                                                                </svg>
                                                            </div>
                                                            <div>
                                                                <h3 className="font-bold text-sm text-gray-500 line-through decoration-gray-400">{project.name}</h3>
                                                                <p className="text-[11px] text-gray-400 mt-0.5">{(project.projectTasks || []).filter(t => !t.isDeleted).length} tasks · {(project.members || []).length} members</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button onClick={() => handleRestoreProject(project.id)} className="p-1.5 text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer" title="Khôi phục">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-3.5">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                                                                </svg>
                                                            </button>
                                                            <button onClick={() => handleDeleteForeverProject(project.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer" title="Xóa vĩnh viễn">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-3.5">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    {project.deletedAt && (
                                                        <p className="text-[11px] text-gray-400 flex items-center gap-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3 shrink-0">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                            </svg>
                                                            Xóa ngày {project.deletedAt}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })()}

                        {/* Active projects */}
                        {activeProjectsTab !== "Trash" && (() => {
                            const filtered = projects.filter(p => {
                                if (p.isDeleted) return false;
                                if (activeProjectsTab === "In Progress") return p.status === "In Progress";
                                return true;
                            });
                            return filtered.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mb-4 opacity-50">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    <p className="text-lg font-medium text-gray-500">
                                        {activeProjectsTab === "In Progress" ? "No projects in progress" : "No projects found"}
                                    </p>
                                    {activeProjectsTab === "All Projects" && <p className="text-sm mt-1">Click "New Project" to create your first project.</p>}
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    {filtered.map(project => {
                                        const activeTasks = (project.projectTasks || []).filter(t => !t.isDeleted);
                                        const doneTasks = activeTasks.filter(t => t.status === 'Done').length;
                                        const totalTasks = activeTasks.length;
                                        const progress = totalTasks === 0 ? 0 : Math.round((doneTasks / totalTasks) * 100);
                                        return (
                                            <div
                                                key={project.id}
                                                onClick={() => setSelectedProject(project)}
                                                className="group flex items-center gap-4 px-4 py-4 rounded-2xl cursor-pointer hover:bg-gray-50 transition-all duration-150 relative"
                                            >
                                                {/* Accent bar */}
                                                <div className={`absolute left-0 top-3 bottom-3 w-1 rounded-full ${project.color} opacity-70 group-hover:opacity-100 group-hover:top-1 group-hover:bottom-1 transition-all duration-200`} />

                                                {/* Icon */}
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${project.color} shrink-0 ml-3`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0A2.25 2.25 0 0 0 1.5 12v4.5c0 1.242.101 2.454.296 3.619a2.25 2.25 0 0 0 2.193 1.881h16.022a2.25 2.25 0 0 0 2.193-1.881 24.373 24.373 0 0 0 .296-3.619V12a2.25 2.25 0 0 0-2.25-2.224M3.75 9.776 5.8 4.65A2.25 2.25 0 0 1 7.89 3h8.22a2.25 2.25 0 0 1 2.09 1.65l2.05 5.126M12 15.75h.008v.008H12v-.008Z" />
                                                    </svg>
                                                </div>

                                                {/* Name + progress */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-3 mb-1.5">
                                                        <h3 className="font-bold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">{project.name}</h3>
                                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide shrink-0 ${project.status === 'Done' ? 'bg-emerald-100 text-emerald-600' : project.status === 'In Progress' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                                                            {project.status}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                            <div className={`h-full rounded-full transition-all duration-500 ${progress === 100 ? 'bg-emerald-500' : progress > 50 ? 'bg-indigo-500' : 'bg-orange-400'}`} style={{ width: `${progress}%` }} />
                                                        </div>
                                                        <span className="text-xs font-bold text-gray-400 shrink-0">{progress}%</span>
                                                    </div>
                                                </div>

                                                {/* Members */}
                                                <div className="hidden md:flex -space-x-1.5 shrink-0">
                                                    {(project.members || []).slice(0, 3).map((_, i) => (
                                                        <div key={i} className={`w-7 h-7 rounded-full ring-2 ring-white bg-gradient-to-tr ${['from-indigo-400 to-indigo-600', 'from-emerald-400 to-teal-400', 'from-orange-400 to-rose-400'][i % 3]} flex items-center justify-center text-[9px] text-white font-bold`}>
                                                            {String.fromCharCode(65 + i)}
                                                        </div>
                                                    ))}
                                                    {(project.members || []).length > 3 && (
                                                        <div className="w-7 h-7 rounded-full ring-2 ring-white bg-gray-100 flex items-center justify-center text-[9px] text-gray-500 font-bold">
                                                            +{project.members.length - 3}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Tasks */}
                                                <span className="hidden md:block text-sm text-gray-400 font-medium shrink-0 w-20 text-right">{totalTasks} tasks</span>

                                                {/* Actions */}
                                                <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button onClick={(e) => { e.stopPropagation(); setEditingProject(project); }} className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer" title="Edit">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
                                                        </svg>
                                                    </button>
                                                    <button onClick={(e) => { e.stopPropagation(); setDeletingProjectId(project.id); }} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer" title="Delete">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })()}

                    </div>

                    <AddProjectModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAddProject={handleAddProject} />
                    <EditProjectModal project={editingProject} onClose={() => setEditingProject(null)} onSave={handleEditSave} />
                    <ConfirmModal
                        isOpen={!!deletingProjectId}
                        onClose={() => setDeletingProjectId(null)}
                        onConfirm={() => handleDeleteProject(deletingProjectId)}
                        title="Deleted"
                        message={`Are you sure you want to delete this project? The project will be moved to Trash and can be restored later.`}
                        confirmText="Deleted"
                        confirmType="danger"
                    />
                </div>
            )}
        </>
    );
};

export default ProjectsView;
