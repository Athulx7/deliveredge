import React from 'react'
import CommonTable from '../../../basicComponents/commonTable';
import CardSection from './CardSection';

function AdminDashboard() {
    const recentOrdersData = [
        {
            id: 1,
            orderId: "#ORD-1001",
            customer: "Rahul Sharma",
            lastTransaction: "2024-01-12",
            status: "Completed"
        },
        {
            id: 2,
            orderId: "#ORD-1002",
            customer: "Amit Verma",
            lastTransaction: "2024-01-10",
            status: "Pending"
        },
        {
            id: 3,
            orderId: "#ORD-1003",
            customer: "Priya Singh",
            lastTransaction: "2024-01-09",
            status: "Cancelled"
        }
    ];
    const recentOrdersColumns = [
        { header: "Order ID", accessor: "orderId" },
        { header: "Customer Name", accessor: "customer" },
        { header: "Last Transaction", accessor: "lastTransaction" },
        { header: "Order Status", accessor: "status" },
    ];

    return (
        <div className="">

            {/* ---------- TOP CARDS ---------- */}
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-gray-500">Total Orders</h3>
                    <h1 className="text-3xl font-bold mt-2">1,240</h1>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-gray-500">Pending Orders</h3>
                    <h1 className="text-3xl font-bold mt-2">82</h1>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-gray-500">Revenue</h3>
                    <h1 className="text-3xl font-bold mt-2">₹8,40,000</h1>
                </div>

            </div> */}
            <CardSection />

            {/* ---------- GRAPHS (PLACEHOLDERS) ---------- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

                <div className="bg-white p-6 rounded-xl shadow-md min-h-[250px]">
                    <h2 className="text-xl font-semibold">Order Trends</h2>
                    <p className="mt-6 text-gray-500">Graph will come here...</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md min-h-[250px]">
                    <h2 className="text-xl font-semibold">Delivery Performance</h2>
                    <p className="mt-6 text-gray-500">Graph will come here...</p>
                </div>

            </div>
            <div className='my-5'>
                <CommonTable
                    columns={recentOrdersColumns}
                    data={recentOrdersData}
                    customHeader={'RECENT ORDERS'}
                />
            </div>

        </div>
    );
}

export default AdminDashboard
