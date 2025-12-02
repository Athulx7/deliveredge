import React, { useEffect, useState } from "react";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, Link } from "react-router-dom";
import { ApiCall, getTokenData } from "../library/utils/constants";

const getDynamicIcon = (iconName) => {
    if (!iconName) return Icons["faHouse"]
    return Icons[iconName] || Icons["faHouse"]
}

function SideBar({ isCollapsed, isMobileOpen, isMobile, handleToggle, setIsMobileOpen }) {
    const [menuItems, setMenuItems] = useState([])
    const role = getTokenData()?.role_id

    const settingsItems = [
        { to: "/home/settings", label: "Settings", icon: Icons["faGear"] },
        { to: "/home/feedback", label: "Feedback", icon: Icons["faComment"] },
        { to: "/home/help", label: "Help", icon: Icons["faCircleInfo"] },
    ]

    useEffect(() => {
        getMenuItems()
    }, [role])

    const getMenuItems = async () => {
        try {
            const ApiResponse = await ApiCall("/menuitems");

            if (ApiResponse.success) {
                const apiMenus = ApiResponse.data.menus.map((item) => {
                    return {
                        ...item,
                        icon: getDynamicIcon(item.icon)
                    }
                })

                setMenuItems(apiMenus)
            }
        } catch (err) {
            console.log("Error fetching menu items:", err)
        }
    }

    return (
        <>
            <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200 sticky top-0 z-50">
                <Link to="/home" className="flex items-center">
                    <FontAwesomeIcon icon={Icons["faTruckFast"]} className="text-indigo-500 text-xl" />
                    <span className="ml-2 font-bold">Deliver Edge</span>
                </Link>
                <button onClick={handleToggle} className="text-gray-700">
                    <FontAwesomeIcon icon={Icons["faBars"]} className="text-2xl" />
                </button>
            </div>

            <div
                className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 shadow-md z-40 transition-all duration-300
                ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
                ${isCollapsed && !isMobile ? "w-20" : "w-64"} lg:translate-x-0`}
            >
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={Icons["faTruckFast"]} className="text-indigo-500 text-xl" />
                        {!isCollapsed && <span className="font-bold ml-2">Deliver Edge</span>}
                    </div>

                    <button onClick={handleToggle} className="w-8 h-8 flex justify-center cursor-pointer items-center rounded-md hover:bg-gray-100">
                        <FontAwesomeIcon
                            icon={
                                isMobile
                                    ? isMobileOpen
                                        ? Icons["faXmark"]
                                        : Icons["faBars"]
                                    : isCollapsed
                                        ? Icons["faChevronRight"]
                                        : Icons["faChevronLeft"]
                            }
                        />
                    </button>
                </div>

                <div className="flex flex-col justify-between h-[calc(100%-4rem)] px-2 py-3 overflow-y-auto">
                    <div>
                        {!isCollapsed && (
                            <div className="font-semibold text-gray-500 text-sm uppercase mb-2 px-2">Menu</div>
                        )}

                        <nav className="space-y-1">
                            {menuItems.map((item, idx) => (
                                <NavLink
                                    key={idx}
                                    to={item.url}
                                    className={({ isActive }) =>
                                        `flex items-center ${isCollapsed ? "justify-center p-3" : "px-3 py-2.5"}
                                        rounded-lg transition-all
                                        ${isActive
                                            ? "bg-indigo-500 text-white"
                                            : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                                        }`
                                    }
                                >
                                    <FontAwesomeIcon icon={item.icon} className="w-5" />
                                    {!isCollapsed && <span className="ml-3">{item.name}</span>}
                                </NavLink>
                            ))}
                        </nav>

                        <div className="mt-4">
                            {!isCollapsed && (
                                <div className="font-semibold text-gray-500 text-sm uppercase mb-2 px-2">
                                    Help & Settings
                                </div>
                            )}

                            <nav className="space-y-1">
                                {settingsItems.map((item, idx) => (
                                    <NavLink
                                        key={idx}
                                        to={item.to}
                                        className={({ isActive }) =>
                                            `flex items-center ${isCollapsed ? "justify-center p-3" : "px-3 py-2.5"}
                                            rounded-lg transition-all
                                            ${isActive
                                                ? "bg-indigo-500 text-white"
                                                : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                                            }`
                                        }
                                    >
                                        <FontAwesomeIcon icon={item.icon} className="w-5" />
                                        {!isCollapsed && <span className="ml-3">{item.label}</span>}
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
