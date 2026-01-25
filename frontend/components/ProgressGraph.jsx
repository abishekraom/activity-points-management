import React, { useMemo } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer
} from "recharts";

const ProgressGraph = ({ activities }) => {
    const { chartData } = useMemo(() => {
        // Handle null or empty activities
        if (!activities || activities.length === 0) {
            return { chartData: [] };
        }

        // Filter confirmed activities only
        const confirmedActivities = activities.filter(activity => activity.status === 'confirmed');

        if (confirmedActivities.length === 0) {
            return { chartData: [] };
        }

        // Sort activities by date
        const sortedActivities = [...confirmedActivities].sort((a, b) => new Date(a.date) - new Date(b.date));

        // Group activities by month
        const monthlyData = {};

        sortedActivities.forEach(activity => {
            const date = new Date(activity.date);
            const monthKey = `${date.toLocaleDateString('en-US', { month: 'short' })} ${date.getFullYear()}`;
            
            if (!monthlyData[monthKey]) {
                monthlyData[monthKey] = 0;
            }
            monthlyData[monthKey] += activity.points || 0;
        });

        // Create cumulative data
        let cumulativePoints = 0;
        const chartDataArray = Object.entries(monthlyData).map(([month, points]) => {
            cumulativePoints += points;
            return {
                month,
                points: Math.min(cumulativePoints, 100) // Cap at 100
            };
        });

        return { chartData: chartDataArray };
    }, [activities]);
    // Custom Tooltip Component
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-gray-900 text-white p-4 rounded-xl shadow-2xl border border-gray-700 min-w-[180px]">
                    <p className="text-gray-400 text-xs font-bold mb-2 uppercase tracking-widest">{payload[0].payload.month}</p>
                    <div className="flex justify-between gap-4 text-sm">
                        <span className="text-gray-300">Points:</span>
                        <span className="font-bold text-green-400">{payload[0].value}</span>
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
                <LineChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: -20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis 
                        dataKey="month" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 600 }}
                    />
                    <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                        domain={[0, 100]}
                    />
                    <Tooltip 
                        content={<CustomTooltip />} 
                        cursor={{ stroke: '#22c55e', strokeWidth: 2 }}
                    />
                    <Line 
                        type="monotone" 
                        dataKey="points" 
                        stroke="#22c55e" 
                        strokeWidth={3}
                        dot={{ fill: '#22c55e', r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ProgressGraph;