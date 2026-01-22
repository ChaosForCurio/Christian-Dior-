"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, Package } from "lucide-react";

const orders = [
    {
        id: "#ORD-7829",
        customer: "Isabella Rossellini",
        items: ["Silk Scarf", "Leather Handbag"],
        total: "$3,200",
        status: "Completed",
        time: "2 mins ago"
    },
    {
        id: "#ORD-7830",
        customer: "Marc M.",
        items: ["Wool Coat"],
        total: "$4,500",
        status: "Processing",
        time: "15 mins ago"
    },
    {
        id: "#ORD-7831",
        customer: "Sophie Marceau",
        items: ["Evening Gown", "Pumps"],
        total: "$12,800",
        status: "Completed",
        time: "1 hour ago"
    },
    {
        id: "#ORD-7832",
        customer: "Alain Delon",
        items: ["Classic Suit"],
        total: "$5,300",
        status: "Completed",
        time: "3 hours ago"
    },
];

export default function EmployeeOrders() {
    return (
        <div className="w-full max-w-5xl mx-auto p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between mb-12"
            >
                <h1 className="text-4xl md:text-5xl font-bodoni text-dior-black">
                    Incoming Orders
                </h1>
                <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-full">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-sm font-medium">Live Feed</span>
                </div>
            </motion.div>

            <div className="space-y-4">
                {orders.map((order, index) => (
                    <motion.div
                        key={order.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative bg-white border border-gray-100 hover:border-gray-300 transition-all duration-300 p-6 shadow-sm hover:shadow-md"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                            {/* Left: ID & Status */}
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-full ${order.status === 'Completed' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                                    }`}>
                                    {order.status === 'Completed' ? <CheckCircle2 size={24} /> : <Clock size={24} />}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bodoni">{order.id}</h3>
                                    <span className="text-xs text-gray-400 font-mulish uppercase tracking-wide">{order.time}</span>
                                </div>
                            </div>

                            {/* Middle: Items */}
                            <div className="flex-1 md:px-12">
                                <div className="flex items-center gap-2 mb-1">
                                    <Package size={16} className="text-gray-400" />
                                    <span className="font-medium text-gray-900">{order.customer}</span>
                                </div>
                                <p className="text-sm text-gray-500 pl-6">
                                    {order.items.join(", ")}
                                </p>
                            </div>

                            {/* Right: Total */}
                            <div className="text-right">
                                <p className="text-2xl font-bodoni">{order.total}</p>
                                <p className="text-xs text-gray-400 font-mulish uppercase">Total Paid</p>
                            </div>

                        </div>

                        {/* Status Line */}
                        <div className={`absolute bottom-0 left-0 h-[2px] w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ${order.status === 'Completed' ? 'bg-green-500' : 'bg-amber-500'
                            }`} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
