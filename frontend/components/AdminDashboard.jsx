import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [students, setStudents] = useState([]);
    const [stats, setStats] = useState({ totalPoints: 0, pending: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAdminData();
    }, []);

    const fetchAdminData = async () => {
        try {
            // Your backend must have this route protected by the isAdmin middleware
            const res = await axios.get("http://localhost:5000/api/admin/all-students", { 
                withCredentials: true 
            });
            setStudents(res.data.students);
            setStats(res.data.summary); // e.g., total points across system
            setLoading(false);
        } catch (error) {
            console.error("Admin data fetch failed", error);
        }
    };

    const handleUpdatePoints = async (id, amount) => {
        try {
            await axios.patch(`http://localhost:5000/api/admin/update-points/${id}`, 
                { points: amount }, 
                { withCredentials: true }
            );
            fetchAdminData(); // Refresh list after update
        } catch (err) {
            alert("Failed to update points");
        }
    };

    if (loading) return <div className="p-10 text-center">Loading Management Console...</div>;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header Stats - Admin Only View */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
                    <p className="text-sm text-gray-500 uppercase font-bold">Total Students</p>
                    <p className="text-2xl font-semibold">{students.length}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
                    <p className="text-sm text-gray-500 uppercase font-bold">Points Issued</p>
                    <p className="text-2xl font-semibold">{stats.totalPoints} pts</p>
                </div>
            </div>

            {/* Management Table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-4 border-b bg-gray-800 flex justify-between items-center">
                    <h2 className="text-white font-semibold">Student Activity Management</h2>
                </div>
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 text-sm uppercase">
                            <th className="p-4">Student</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Activity Points</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student._id} className="border-b hover:bg-gray-50">
                                <td className="p-4 font-medium">{student.name}</td>
                                <td className="p-4 text-gray-600">{student.email}</td>
                                <td className="p-4 font-bold text-blue-600">{student.activityPoints || 0}</td>
                                <td className="p-4 flex justify-center gap-2">
                                    <button 
                                        onClick={() => handleUpdatePoints(student._id, 10)}
                                        className="bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200"
                                    >
                                        +10
                                    </button>
                                    <button className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200">
                                        Reset
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;