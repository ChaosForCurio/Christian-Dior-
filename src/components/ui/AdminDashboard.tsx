"use client";

import { motion } from "framer-motion";

export default function AdminDashboard() {
    // Mock Data
    const stats = [
        { label: "Total Revenue", value: "$124,500", change: "+12%" },
        { label: "Total Sales", value: "342", change: "+5%" },
        { label: "Unsold Inventory", value: "85", change: "-2%" },
        { label: "Expenses", value: "$45,200", change: "+8%" },
    ];

    const expenses = [
        { category: "Fabric Sourcing", amount: 15000, width: "70%" },
        { category: "Manufacturing", amount: 20000, width: "85%" },
        { category: "Marketing", amount: 8000, width: "40%" },
        { category: "Logistics", amount: 2200, width: "15%" },
    ];

    return (
        <div className="w-full max-w-6xl mx-auto p-8 text-dior-black">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bodoni mb-12"
            >
                Dashboard
            </motion.h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6 border border-gray-200 bg-white/50 backdrop-blur-sm"
                    >
                        <p className="text-gray-500 font-mulish text-sm uppercase tracking-wider mb-2">{stat.label}</p>
                        <div className="flex items-baseline justify-between">
                            <span className="text-3xl font-bodoni">{stat.value}</span>
                            <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
                                {stat.change}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Sales/Inventory Chart (Visual) */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="p-8 border border-gray-200 bg-white"
                >
                    <h2 className="text-2xl font-bodoni mb-8">Sales Overview</h2>
                    <div className="space-y-6">
                        <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "80%" }}
                                transition={{ duration: 1.5, ease: "circOut" }}
                                className="h-full bg-black"
                            />
                        </div>
                        <div className="flex justify-between text-sm font-mulish">
                            <span>Sold (80%)</span>
                            <span className="text-gray-400">Remaining Stock (20%)</span>
                        </div>
                        <p className="text-gray-500 mt-4 text-sm leading-relaxed">
                            Sales performance has been exceptional this quarter, with a significant uptake in the Summer Collection.
                        </p>
                    </div>
                </motion.div>

                {/* Expenses Breakdown */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="p-8 border border-gray-200 bg-white"
                >
                    <h2 className="text-2xl font-bodoni mb-8">Expenses</h2>
                    <div className="space-y-6">
                        {expenses.map((expense, i) => (
                            <div key={expense.category}>
                                <div className="flex justify-between mb-2 text-sm font-mulish">
                                    <span>{expense.category}</span>
                                    <span>${expense.amount.toLocaleString()}</span>
                                </div>
                                <div className="w-full h-1 bg-gray-100">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: expense.width }}
                                        transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                                        className="h-full bg-black/80"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
