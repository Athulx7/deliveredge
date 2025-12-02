import {
    faArrowTrendUp,
    faArrowTrendDown,
    faChevronDown,
    faChevronUp,
    faCircleInfo,
    faTruckFast,
    faMoneyBillTrendUp,
    faUsers,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { getRecentMonths } from '../../../library/CommonFunctions/commonFunction';

function CardSection() {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState('May');

    const months = getRecentMonths()

    const dashboardData = [
        {
            id: 'orders',
            title: "Total Orders",
            value: "1,342",
            change: "+12.5%",
            changeColor: "bg-green-100 text-green-700",
            trendIcon: faArrowTrendUp,
            comparisonText: "Orders this month",
        },
        {
            id: 'deliveries',
            title: "Completed Deliveries",
            value: "1,128",
            change: "-4.3%",
            changeColor: "bg-red-100 text-red-700",
            trendIcon: faArrowTrendDown,
            comparisonText: "Compared to last month",
        },
        {
            id: 'revenue',
            title: "Monthly Revenue",
            value: "5,42,320",
            change: "+18.2%",
            changeColor: "bg-green-100 text-green-700",
            trendIcon: faArrowTrendUp,
            comparisonText: "Revenue generated",
        }
    ];

    const toggleDropdown = (cardId) => {
        setOpenDropdown(openDropdown === cardId ? null : cardId);
    };

    const handleMonthSelect = (month) => {
        setSelectedMonth(month);
        setOpenDropdown(null);
    };

    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
                {dashboardData.map((card) => (
                    <div key={card.id} className='bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100 relative overflow-visible'>

                        <div className='flex justify-between items-start mb-4'>
                            <div className='flex items-center'>
                                <span className='font-semibold text-gray-700'>{card.title}</span>
                                <FontAwesomeIcon
                                    icon={faCircleInfo}
                                    className="text-gray-400 ml-2 text-sm cursor-pointer hover:text-gray-600"
                                />
                            </div>

                            <div className="relative overflow-visible">
                                <div
                                    className="flex items-center border border-gray-200 rounded-xl px-3 py-1 text-sm text-gray-500 cursor-pointer hover:bg-gray-50"
                                    onClick={() => toggleDropdown(card.id)}
                                >
                                    <span>{selectedMonth}</span>
                                    <FontAwesomeIcon
                                        icon={openDropdown === card.id ? faChevronUp : faChevronDown}
                                        className="ml-1 text-xs"
                                    />
                                </div>

                                {openDropdown === card.id && (
                                    <div className="absolute right-0 mt-1 min-w-[130px] bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
                                        {months.map((month) => (
                                            <div
                                                key={month}
                                                className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${selectedMonth === month
                                                        ? "bg-indigo-50 text-indigo-600"
                                                        : "text-gray-700"
                                                    }`}
                                                onClick={() => handleMonthSelect(month)}
                                            >
                                                {month}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                        </div>

                        <div className='text-2xl md:text-3xl font-bold text-gray-800 mb-3'>
                            {card.id === "revenue" ? `₹${card.value}` : card.value}
                        </div>

                        <div className='flex items-center flex-wrap'>
                            <div className={`${card.changeColor} rounded-lg px-3 py-1 text-sm font-medium mr-2`}>
                                <FontAwesomeIcon
                                    icon={card.trendIcon}
                                    className={`mr-1 ${card.change.startsWith('+') ? "text-green-600" : "text-red-600"}`}
                                />
                                {card.change}
                            </div>
                            <div className='text-sm text-gray-500 mt-1 md:mt-0'>
                                {card.comparisonText}
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </>
    )
}

export default CardSection
