import { faChevronDown, faChevronUp, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UserDropDown() {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('role')
        navigate('/')
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setOpen(!open)} 
                className='flex items-center py-1 px-2 md:px-3 cursor-pointer border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'
                aria-label="User menu"
                aria-expanded={open}
            >
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-200 text-indigo-600 flex items-center justify-center font-bold">
                    {'A'}
                </div>
                <span className='ms-2 font-semibold hidden md:inline'>{'Admin'}</span>
                <FontAwesomeIcon 
                    className='text-indigo-500 ms-1 md:ms-2 text-sm' 
                    icon={open ? faChevronUp : faChevronDown} 
                />
            </button>

            {open && (
                <div className="absolute right-0 mt-1 w-48 border border-gray-200 bg-white rounded-lg shadow-lg z-50 overflow-hidden">
                    <ul className="py-1">
                        <li
                            className="px-4 py-2 hover:bg-indigo-50 cursor-pointer flex items-center"
                            onClick={() => {
                                navigate('/home/profile');
                                setOpen(false);
                            }}
                        >
                            <FontAwesomeIcon icon={faUser} className="text-gray-500 mr-2" />
                            <span className="font-medium">My Profile</span>
                        </li>
                        <li
                            className="px-4 py-2 hover:bg-red-50 cursor-pointer flex items-center"
                            onClick={handleLogout}
                        >
                            <FontAwesomeIcon icon={faSignOutAlt} className="text-red-500 mr-2" />
                            <span className="font-medium text-red-500">Logout</span>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default UserDropDown;