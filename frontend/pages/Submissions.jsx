import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Search, Calendar, Check, X, ChevronLeft } from "lucide-react";

function Submissions() {
    const [activities, setActivities] = useState([]);
    const [filters, setFilters] = useState({ eventName: "", date: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchSubmissions = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:5000/api/admin/all-submissions", { 
                params: filters,
                withCredentials: true 
            });
            setActivities(res.data);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubmissions();
    }, [filters]);

    const handleStatusChange = async (activityId, studentId, newStatus) => {
        try {
            await axios.put(`http://localhost:5000/api/admin/update-activity-status`, {
                activityId,
                status: newStatus,
                studentId
            }, { withCredentials: true });
            
            // Remove the item from the list once processed (since we only show pending)
            setActivities(prev => prev.filter(act => act._id !== activityId));
        } catch (error) {
            alert("Failed to update status");
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen py-8 px-10">
            <div className="bg-white rounded-2xl max-w-7xl mx-auto p-8 shadow-md">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-500 hover:text-gray-800 transition-colors mb-4"
                >
                    <ChevronLeft className="w-5 h-5" /> <span>Back to dashboard</span>
                </button>
                <h1 className="text-3xl text-gray-700 mb-4">Pending Submissions</h1>
                
                {/* Filters */}
                <div className="flex gap-4 mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            className="pl-9 pr-4 py-2 bg-gray-100 rounded-lg text-sm outline-none w-64"
                            placeholder="Filter by Event Name"
                            value={filters.eventName}
                            onChange={(e) => setFilters({...filters, eventName: e.target.value})}
                        />
                    </div>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            type="date"
                            className="pl-9 pr-4 py-2 bg-gray-100 rounded-lg text-sm outline-none"
                            value={filters.date}
                            onChange={(e) => setFilters({...filters, date: e.target.value})}
                        />
                    </div>
                </div>

                <table className="w-full text-left border-collapse border-gray-200 border-2">
                    <thead>
                        <tr className="bg-gray-100 border-b border-gray-200 text-lg font-semibold text-gray-600">
                            <th className="px-6 py-4">Student</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Event</th>
                            <th className="px-6 py-4 text-center">Points</th>
                            <th className="px-6 py-4">Links</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {activities.map((activity) => (
                            <tr key={activity._id} className="hover:bg-gray-50 transition text-gray-600 text-lg">
                                <td className="px-6 py-4">
                                    <div className="font-bold">{activity.user?.username}</div>
                                    <div className="text-sm text-gray-400">{activity.user?.usn}</div>
                                </td>
                                <td className="px-6 py-4">
                                    {new Date(activity.date).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">{activity.eventName}</td>
                                <td className="px-6 py-4 text-center font-bold text-blue-600">{activity.points}</td>
                                <td className="px-6 py-4 text-sm">
                                    <a href={activity.certificateUrl} target="_blank" className="text-blue-500 underline block">Cert</a>
                                    <a href={activity.reportUrl} target="_blank" className="text-blue-500 underline block">Report</a>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button 
                                            onClick={() => handleStatusChange(activity._id, activity.user._id, 'confirmed')}
                                            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded shadow-sm"
                                            title="Approve"
                                        >
                                            <Check size={18} />
                                        </button>
                                        <button 
                                            onClick={() => handleStatusChange(activity._id, activity.user._id, 'rejected')}
                                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded shadow-sm"
                                            title="Reject"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {activities.length === 0 && !loading && (
                    <div className="py-20 text-center text-gray-400 italic">No pending submissions found.</div>
                )}
            </div>
        </div>
    );
}

export default Submissions;