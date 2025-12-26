import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';

const ProgressGraph = () => {
  const data = [
    { date: '21-03-2025', points: 5 },
    { date: 'Tue', points: 12 },
    { date: 'Wed', points: 8 },
    { date: 'Thu', points: 22 },
    { date: 'Fri', points: 18 },
    { date: 'Sat', points: 30 },
    { date: 'Sun', points: 25 },
  ];

  return (
    <div className="w-full h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
            </linearGradient>
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
          
          <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            dy={15}
          />
          
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9ca3af', fontSize: 12 }} 
          />
          
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ stroke: '#22c55e', strokeWidth: 2, strokeDasharray: '5 5' }}
          />
          
          <Area 
            type="monotone" 
            dataKey="points" 
            stroke="#22c55e"
            fillOpacity={1} 
            fill="url(#colorPoints)" 
            strokeWidth={3}
            activeDot={{ r: 6, strokeWidth: 0, fill: '#22c55e' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

// Add this helper for a professional tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 text-white p-3 rounded-lg shadow-xl border-none text-sm">
        <p className="font-bold">{`${payload[0].value} Points`}</p>
        <p className="text-gray-400 text-xs">{payload[0].payload.date}</p>
      </div>
    );
  }
  return null;
};

export default ProgressGraph;