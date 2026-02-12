import { useState, useEffect } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Frame from "./components/tab-right/Frame";
import useMatchMedia from "./hooks/MatchMedia";
import ToastProvider from "./contexts/ToastContext";

const Layout = () => {
    const isMobile = useMatchMedia(1023);
    const isSmallMobile = useMatchMedia(767);
    const [isOpen, setIsOpen] = useState(!isMobile);
    const [activeItem, setActiveItem] = useState("Home");
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
            <div className="min-h-screen w-full bg-gray-200 p-2 md:p-4">
                <div className={`relative min-h-screen w-full bg-gray-100 rounded-3xl p-3 md:p-6 shadow-lg flex flex-row ${isOpen ? "gap-6" : ""}`}>
                    <Sidebar isOpen={isOpen} handleOpen={handleOpen} activeItem={activeItem} handleActive={handleActive} isMobile={isSmallMobile} />
                    <Frame handleOpen={handleOpen} isOpen={isOpen} activeTab={activeTab} handleActiveTab={handleActiveTab} />
                </div>
            </div>
        </ToastProvider>
    );
};

export default Layout;
