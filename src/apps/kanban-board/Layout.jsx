import { useState, useEffect } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Frame from "./components/tab-right/Frame";
import ProjectsView from "./components/projects/ProjectsView";
import DashboardView from "./components/dashboard/DashboardView";
import EmployeesView from "./components/employees/EmployeesView";
import DepartmentsView from "./components/departments/DepartmentsView";
import ProfileView from "./components/profile/ProfileView";
import useMatchMedia from "./hooks/MatchMedia";
import ToastProvider from "./contexts/ToastContext";

const Layout = () => {
    const isMobile = useMatchMedia(1023);
    const isSmallMobile = useMatchMedia(767);
    const [isOpen, setIsOpen] = useState(!isMobile);
    const [activeItem, setActiveItem] = useState("Dashboard");
    const [activeTab, setActiveTab] = useState("Board");

    useEffect(() => {
        if (isMobile) {
            setIsOpen(false);
        }
    }, [isMobile]);
    const handleActive = (item) => {
        setActiveItem(item);
    };
    const handleActiveTab = (item) => {
        setActiveTab(item);
    };

    const handleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <ToastProvider>
            <div className="min-h-screen w-full bg-gray-200 p-2 md:p-0">
                <div className={`relative min-h-screen w-full bg-gray-100 rounded-3xl p-3 md:p-6 shadow-lg flex flex-row ${isOpen ? "gap-6" : ""}`}>
                    <Sidebar isOpen={isOpen} handleOpen={handleOpen} activeItem={activeItem} handleActive={handleActive} isMobile={isSmallMobile} />
                    {activeItem === "Dashboard" ? (
                        <DashboardView handleOpen={handleOpen} isOpen={isOpen} />
                    ) : activeItem === "Projects" ? (
                        <ProjectsView handleOpen={handleOpen} isOpen={isOpen} />
                    ) : activeItem === "Employees" ? (
                        <EmployeesView handleOpen={handleOpen} isOpen={isOpen} />
                    ) : activeItem === "Departments" ? (
                        <DepartmentsView handleOpen={handleOpen} isOpen={isOpen} />
                    ) : activeItem === "Tasks" ? (
                        <Frame handleOpen={handleOpen} isOpen={isOpen} activeItem={activeItem} activeTab={activeTab} handleActiveTab={handleActiveTab} />
                    ) : activeItem === "Profile" ? (
                        <ProfileView handleOpen={handleOpen} isOpen={isOpen} />
                    ) : null}
                </div>
            </div>
        </ToastProvider>
    );
};

export default Layout;
