import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import ProgressBar from "../components/ProgressBar";
import axios from "axios";

function StudentDetails() {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activities, setActivities] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudentDetails = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/admin/students/${id}`, {
                    withCredentials: true
                });
                setStudent(data.student);
            } catch (error) {
                console.error("Error fetching details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStudentDetails();
    }, [id]);

    useEffect(() => {
        const fetchStudentActivities = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:5000/api/admin/student-activities/${id}`, { 
                    withCredentials: true 
                });
                const sorted = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setActivities(sorted);
            } catch (error) {
                console.error("Error fetching student activities:", error);
            } finally {
                setLoading(false);
            }
        }
            if (id) fetchStudentActivities();
    }, [id]);

    const handleStatusChange = async (activityId, newStatus) => {
        try {
            const res = await axios.put(`http://localhost:5000/api/admin/update-activity-status`, {
                activityId,
                status: newStatus,
                studentId: id 
            }, { withCredentials: true });

            if (res.data.success) {
                setActivities(prev => prev.map(act => 
                    act._id === activityId ? { ...act, status: newStatus } : act
                ));

                setStudent(prev => ({
                    ...prev,
                    confirmedPoints: res.data.confirmedPoints,
                    pendingPoints: res.data.pendingPoints
                }));
            }
        } catch (error) {
            console.error("Update failed", error);
        }
    };

    if (loading) return <div>Loading.</div>;
    if (!student) return <div>Student not found.</div>;

    return (
        <div className="bg-gray-100 min-h-[calc(100vh-5rem)] py-8">
            <div className='bg-white rounded-2xl max-w-6xl mx-auto px-10 py-8 shadow-md'>
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-500 hover:text-gray-800 transition-colors mb-4"
                >
                    <ChevronLeft className="w-5 h-5" /> <span>Back to students</span>
                </button>
                <h1 className='text-3xl font-bold text-gray-700'>{student.username}</h1>
                <hr className='border-gray-200 my-4'></hr>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 grid grid-cols-2">
                        <div className="pt-2">
                            <p className="text-sm text-gray-500">USN</p>
                            <p className="text-md text-gray-800">{student.usn}</p>
                        </div>
                        <div className="pt-2">
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="text-md text-gray-800">{student.email}</p>
                        </div>
                        <div className="pt-2">
                            <p className="text-sm text-gray-500">Year</p>
                            <p className="text-md text-gray-800">{student.currentYear}</p>
                        </div>
                        <div className="pt-2">
                            <p className="text-sm text-gray-500">Branch</p>
                            <p className="text-md text-gray-800">{student.branch}</p>
                        </div>
                        <div className="pt-2">
                            <p className="text-sm text-gray-500">Counselor</p>
                            <p className="text-md text-gray-800">{student.counselorEmail || "N/A"}</p>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 text-lg text-center">
                        <div className="lg:col-span-2">
                            <ProgressBar
                            confirmed={student.confirmedPoints || 0}
                            pending={student.pendingPoints || 0}
                            />
                        </div>
                        <div>
                            Confirmed
                            <br />
                            <span className="text-2xl">{student.confirmedPoints || 0}</span>
                        </div>
                        <div>
                            Pending
                            <br />
                            <span className="text-2xl">{student.pendingPoints || 0}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-8 bg-white rounded-2xl max-w-6xl mx-auto px-10 py-8 shadow-md'>
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
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {activities.map((activity) => (
                                <tr key={activity._id} className="hover:bg-gray-100 transition text-gray-600 text-lg">
                                    <td className="px-6 py-4">
                                        {new Date(activity.date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        {activity.eventName}
                                    </td>
                                    <td className="px-6 py-4">
                                        {activity.points}
                                    </td>
                                    <td className="px-6 py-4">
                                        <a 
                                            href={activity.certificateUrl} 
                                            className="hover:text-blue-500 underline"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Click here
                                        </a>
                                    </td>
                                    <td className="px-6 py-4">
                                        <a 
                                            href={activity.reportUrl} 
                                            className="hover:text-blue-500 underline"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Click here
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 font-bold">
                                        <span className={
                                            activity.status === 'confirmed' ? 'text-green-600' : 
                                            activity.status === 'rejected' ? 'text-red-600' : 'text-orange-500'
                                        }>
                                            {activity.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            {activity.status !== 'confirmed' && (
                                                <button 
                                                    onClick={() => handleStatusChange(activity._id, 'confirmed')}
                                                    className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded transition shadow-sm"
                                                >
                                                    Confirm
                                                </button>
                                            )}
                                            {activity.status !== 'rejected' && (
                                                <button 
                                                    onClick={() => handleStatusChange(activity._id, 'rejected')}
                                                    className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded transition shadow-sm"
                                                >
                                                    Reject
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {activities.length === 0 && (
                        <div className="py-10 text-center text-gray-400 font-medium italic">No activities recorded yet.</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default StudentDetails;