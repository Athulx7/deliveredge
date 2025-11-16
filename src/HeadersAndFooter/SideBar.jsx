import React from "react";
import { faBars, faHouse, faWallet, faRightLeft, faMessage, faFile, faGear, faComment, faCircleInfo, faChevronLeft, faChevronRight, faXmark, faUser, faChevronDown, faTruckFast, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink } from "react-router-dom";

function SideBar({ isCollapsed, isMobileOpen, isMobile, handleToggle, setIsMobileOpen, }) {
    const menuItems = [
        { to: "/home", label: "Overview", icon: faHouse },
        { to: "/home/wallet", label: "My Wallet", icon: faWallet },
        { to: "/home/activity_expence", label: "Activity - Expense", icon: faRightLeft },
        { to: "/home/activity_income", label: "Activity - Income", icon: faRightLeft },
        { to: "/home/messages", label: "Messages", icon: faMessage },
        { to: "/home/reports", label: "Reports", icon: faFile },
    ]

    const settingsItems = [
        { to: "/home/settings", label: "Settings", icon: faGear },
        { to: "/home/feedback", label: "Feedback", icon: faComment },
        { to: "/home/help", label: "Help", icon: faCircleInfo },
    ]

    return (
        <>
            <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200 sticky top-0 z-50">
                <Link to="/home" className="flex items-center">
                    <FontAwesomeIcon icon={faTruckFast} className="text-indigo-500 text-xl" />
                    <span className="ml-2 font-bold">Deliver Edge</span>
                </Link>
                <div className="flex-1 px-1 hidden md:block ">
                    <input
                        type="text"
                        placeholder="Search Here..."
                        className="max-w-sm px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>
                <div>
                    <button className="text-gray-700 focus:outline-none block md:hidden lg:hidden xl:hidden">
                        <FontAwesomeIcon icon={faChevronDown} className="text-2xl" />
                    </button>
                    <button className="text-gray-700 focus:outline-none">
                        <FontAwesomeIcon icon={faUser} className="text-2xl" />
                    </button>
                    <button className="text-gray-700 focus:outline-none" onClick={handleToggle}>
                        <FontAwesomeIcon icon={faBars} className="text-2xl" />
                    </button>
                </div>
            </div>

            <div className={` fixed top-0 left-0 h-full bg-white border-r border-gray-200 shadow-md z-40 transition-all duration-300 ease-in-out ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} ${isCollapsed && !isMobile ? "w-20" : "w-64"} lg:translate-x-0`}>
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faTruckFast} className="text-indigo-500 text-xl" />
                        {!isCollapsed && <span className="font-bold ml-2">Deliver Edge</span>}
                    </div>

                    <button
                        onClick={handleToggle}
                        className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100 text-gray-600"
                    >
                        <FontAwesomeIcon icon={isMobile ? isMobileOpen ? faXmark : faBars : isCollapsed ? faChevronRight : faChevronLeft} />
                    </button>
                </div>

                <div className="flex flex-col justify-between h-[calc(100%-4rem)] overflow-y-auto overflow-x-visible px-2 py-3">
                    <div>
                        {!isCollapsed && (
                            <div className="font-semibold text-gray-500 text-sm uppercase tracking-wider mb-2 px-2">
                                Menu
                            </div>
                        )}

                        <nav className="space-y-1">
                            {menuItems.map((item, idx) => (
                                <NavLink
                                    key={idx}
                                    to={item.to}
                                    className={({ isActive }) =>
                                        `flex items-center ${isCollapsed && !isMobile ? "justify-center p-3" : "px-3 py-2.5"}
                      rounded-lg transition-all duration-200
                      ${isActive ? "bg-indigo-500 text-white" : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"}`
                                    }
                                >
                                    <FontAwesomeIcon icon={item.icon} className="w-5 text-center" />
                                    {!isCollapsed && <span className="ms-3">{item.label}</span>}
                                </NavLink>
                            ))}
                        </nav>

                        <div className="mt-4">
                            {!isCollapsed && (
                                <div className="font-semibold text-gray-500 text-sm uppercase tracking-wider mb-2 px-2">
                                    Help & Settings
                                </div>
                            )}
                            <nav className="space-y-1">
                                {settingsItems.map((item, idx) => (
                                    <NavLink
                                        key={idx}
                                        to={item.to}
                                        className={({ isActive }) =>
                                            `flex items-center ${isCollapsed && !isMobile ? "justify-center p-3" : "px-3 py-2.5"} rounded-lg transition-all duration-200 ${isActive ? "bg-indigo-500 text-white" : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                                            }`
                                        }
                                    >
                                        <FontAwesomeIcon icon={item.icon} className="w-5 text-center" />
                                        {!isCollapsed && <span className="ms-3">{item.label}</span>}
                                    </NavLink>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-30 lg:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}
        </>
    )
}

export default SideBar
