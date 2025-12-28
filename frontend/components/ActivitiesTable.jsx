import React from "react";
import { useState, useEffect } from 'react';
import { Trash2, ExternalLink, FileText, Plus } from 'lucide-react'

function ActivitiesTable() {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const mockData = [
            { _id: '1', eventName: 'React Workshop', date: '2025-12-20', points: 50, status: 'confirmed', certificateUrl: '#' },
            { _id: '2', eventName: 'Hackathon', date: '2025-12-29', points: 100, status: 'pending', reportUrl: '#' },
            { _id: '3', eventName: 'TEDX talk', date: '2025-11-29', points: 100, status: 'pending', reportUrl: '#' },
            { _id: '4', eventName: 'Blood donation camp', date: '2024-12-29', points: 100, status: 'pending', reportUrl: '#' },
            { _id: '5', eventName: 'Hackathon', date: '2023-05-29', points: 100, status: 'pending', reportUrl: '#' },
        ];

        const sorted = mockData.sort((a, b) => new Date(b.date) - new Date(a.date));
        setActivities(sorted);
        setLoading(false);
    }, []);

    return (
    <div>
        
        <table className="w-full text-left border-collapse border-gray-200 border-2">
            <thead>
                <tr className="bg-gray-100 border-b border-gray-200 text-lg font-semibold text-gray-600">
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Event</th>
                    <th className="px-6 py-4">Points</th>
                    <th className="px-6 py-4">Certificate</th>
                    <th className="px-6 py-4">Report</th>
                    <th className="px-6 py-4">Status</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {activities.map((activity) => (
                    <tr key={activity._id} className="hover:bg-gray-100 transition text-gray-600 text-lg">
                        <td className="px-6 py-4">
                            {new Date(activity.date).toLocaleDateString()}
                        </td>
                        <td  className="px-6 py-4">
                            {activity.eventName}
                        </td>
                        <td  className="px-6 py-4">
                            {activity.points}
                        </td>
                        <td  className="px-6 py-4">
                            {activity.certificateUrl}
                        </td>
                        <td  className="px-6 py-4">
                            {activity.reportUrl}
                        </td>
                        <td  className="px-6 py-4">
                            {activity.status.toUpperCase()}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <button 
        className="flex items-center gap-2 border-2 border-gray-200 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 mt-4 mx-auto rounded-lg transition"
        
        >
            <Plus size={18} /> Add Activity
        </button>
    </div>
    )
}

export default ActivitiesTable;