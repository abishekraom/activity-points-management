import React, { useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer
} from "recharts";

const ProgressGraph = ({ activities, admissionYear }) => {
    const { chartData, uniqueEvents } = useMemo(() => {
        const mockData = [
            { 
                name: 'Year 1', 
                "Quiz": 10, 
                "Hackathon": 20, 
                "Workshop": 5, 
                total: 35 
            },
            { 
                name: 'Year 2', 
                "Hackathon": 15, 
                "CSI Seminar": 10, 
                "Research Paper": 30, 
                total: 55 
            },
            { 
                name: 'Year 3', 
                "Internship": 40, 
                "Project Phase 1": 20, 
                total: 60 
            },
            { 
                name: 'Year 4', 
                "Final Project": 50, 
                "Paper Pub": 20, 
                total: 70 
            }
        ];

        // This list tells Recharts which keys to look for to build the stacks
        const mockEvents = [
            "Quiz", "Hackathon", "Workshop", "CSI Seminar", 
            "Research Paper", "Internship", "Project Phase 1", 
            "Final Project", "Paper Pub"
        ];

        return { chartData: mockData, uniqueEvents: mockEvents };
    }, []);
    // Custom Tooltip Component
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-gray-900 text-white p-4 rounded-xl shadow-2xl border border-gray-700 min-w-[180px]">
                    <p className="text-gray-400 text-xs font-bold mb-2 uppercase tracking-widest">{label}</p>
                    <div className="space-y-2">
                        {payload.map((entry, index) => (
                            <div key={index} className="flex justify-between gap-4 text-sm">
                                <span className="text-gray-300 truncate max-w-[120px]">{entry.name}</span>
                                <span className="font-bold text-green-400">+{entry.value}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-3 pt-2 border-t border-gray-700 flex justify-between font-bold text-sm">
                        <span>Year Total:</span>
                        <span>{payload[0].payload.total} pts</span>
                    </div>
                </div>
            );
        }
        return null;
    };

    const colors = ['#22c55e', '#16a34a', '#15803d', '#166534', '#14532d', '#4ade80'];

    // Fallback UI if no activities are confirmed yet
    if (chartData.length === 0) {
        return (
            <div className="w-full h-full min-h-[300px] flex items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl">
                <p className="text-gray-400">No confirmed activities to display</p>
            </div>
        );
    }

    return (
        <div className="w-full h-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: -20, bottom: 5 }}
                    barSize={50}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 600 }}
                    />
                    <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                    />
                    <Tooltip 
                        content={<CustomTooltip />} 
                        cursor={{ fill: '#f3f4f6', opacity: 0.4 }}
                    />
                    
                    {uniqueEvents.map((event, index) => (
                        <Bar 
                            key={event} 
                            dataKey={event} 
                            stackId="a" 
                            fill={colors[index % colors.length]}
                            // Only round the top-most bar in the stack
                            radius={index === uniqueEvents.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]} 
                        />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ProgressGraph;