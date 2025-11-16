import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faTruckLoading, faWarehouse, faRoute, faMicrochip, faRobot, faClipboardList, faIndustry, } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function CarousalComponent() {
    const carouselItems = [
        {
            icon: faIndustry,
            title: "End-to-End Supply Chain Control",
            description:
                "Manage purchasing, inventory, logistics, and delivery — all from a unified, AI-powered dashboard."
        },
        {
            icon: faChartLine,
            title: "AI-Driven Forecasting",
            description:
                "Predict demand, restocking needs, and pricing trends using intelligent analytics and data patterns."
        },
        {
            icon: faWarehouse,
            title: "Smart Warehouse Management",
            description:
                "Track inbound and outbound goods, monitor real-time stock levels, and receive AI restock alerts."
        },
        {
            icon: faTruckLoading,
            title: "Supplier & Purchase Order Tracking",
            description:
                "Oversee supplier performance, manage purchase orders, and track deliveries to ensure reliability."
        },
        {
            icon: faRoute,
            title: "Real-Time GPS & Route Optimization",
            description:
                "Visualize routes, assign delivery regions, and let AI suggest the fastest delivery paths."
        },
        {
            icon: faClipboardList,
            title: "Role-Based Dashboards",
            description:
                "Admins, Managers, and Agents each get personalized dashboards with KPIs and analytics."
        },
        {
            icon: faRobot,
            title: "AI Chat & Insights",
            description:
                "Ask AI: “Show me delayed deliveries this week.” Instantly view actionable insights."
        },
        {
            icon: faMicrochip,
            title: "Enterprise Analytics Suite",
            description:
                "Visualize KPIs, generate reports, and analyze performance metrics across your entire network."
        }
    ]

    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % carouselItems.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [carouselItems.length])

    const handleDotClick = (index) => {
        setCurrentIndex(index)
    }

    const currentItem = carouselItems[currentIndex]

    return (
        <div className="md:w-1/2 text-white p-8 flex-col justify-center relative z-10 hidden md:flex">
            <div className="max-w-md mx-auto">
                <Link to={'/'}>
                    <h1 className="text-4xl font-bold mb-6 flex items-center gap-2">
                        {/* <FontAwesomeIcon icon={faMicrochip} className="text-blue-400" /> */}
                        Deliver<span className="text-indigo-200">Edge</span>
                    </h1>
                </Link>
                <p className="text-xl mb-8 opacity-90">
                    Optimize your entire supply chain lifecycle — powered by AI and real-time data.
                </p>

                <div className="bg-opacity-10 border border-white/30 rounded-xl p-6 backdrop-blur-sm relative overflow-hidden">
                    <div
                        key={currentIndex}
                        className="transition-opacity duration-700 ease-in-out opacity-100 animate-fade-in"
                    >
                        <FontAwesomeIcon icon={currentItem.icon} className="text-5xl mb-6 text-indigo-200" />
                        <h3 className="text-2xl font-semibold mb-3">{currentItem.title}</h3>
                        <p className="text-lg opacity-80">{currentItem.description}</p>
                    </div>

                    <div className="flex justify-center mt-4">
                        {carouselItems.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => handleDotClick(i)}
                                className={`h-2 w-2 mx-1 rounded-full transition-all duration-300 
                                    ${i === currentIndex ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/60'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CarousalComponent