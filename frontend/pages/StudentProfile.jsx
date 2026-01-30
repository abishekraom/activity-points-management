import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Save, User as UserIcon, AlertCircle } from "lucide-react";
import API from '../api/axios.js';

function EditStudentProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [student, setStudent] = useState(null);
    const [formData, setFormData] = useState({
        usn: "",
        manualYear: ""
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const res = await API.get(`/api/counselor/student/${id}`, {
                    withCredentials: true
                });
                setStudent(res.data);
                setFormData({
                    usn: res.data.usn || "",
                    manualYear: res.data.currentYear || ""
                });
            } catch (err) {
                console.error("Error fetching student:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStudent();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await API.put(`/api/counselor/update-student/${id}`, 
                formData, 
                { withCredentials: true }
            );
            alert("Profile updated successfully!");
            navigate("/counselor");
        } catch (err) {
            alert(err.response?.data?.message || "Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-10 text-center">Loading student details...</div>;
    if (!student) return <div className="p-10 text-center text-red-500">Student not found.</div>;

    return (
        <div className="bg-gray-100 min-h-[calc(100vh-5rem)] py-8 px-4">
            <div className="max-w-2xl mx-auto">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-500 hover:text-gray-800 mb-6 transition-colors"
                >
                    <ChevronLeft className="w-5 h-5" /> <span>Back to Dashboard</span>
                </button>

                <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
                    <div className="bg-blue-600 p-6 text-white">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-2xl font-bold">
                                {student.username[0].toUpperCase()}
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">{student.username}</h1>
                                <p className="opacity-80">{student.email}</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 uppercase mb-2">
                                University Seat Number (USN)
                            </label>
                            <input 
                                type="text"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition uppercase font-mono"
                                placeholder="e.g., 1RV21CS001"
                                value={formData.usn}
                                onChange={(e) => setFormData({...formData, usn: e.target.value.toUpperCase()})}
                                required
                            />
                            <p className="mt-2 text-xs text-gray-400">
                                Entering the USN will automatically update the Branch and Year based on the code.
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-600 uppercase mb-2">
                                Current Year (Manual Override)
                            </label>
                            <select 
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                                value={formData.manualYear}
                                onChange={(e) => setFormData({...formData, manualYear: e.target.value})}
                            >
                                <option value="">Select Year</option>
                                <option value="1">1st Year</option>
                                <option value="2">2nd Year</option>
                                <option value="3">3rd Year</option>
                                <option value="4">4th Year</option>
                            </select>
                            <div className="mt-3 flex items-start gap-2 p-3 bg-amber-50 rounded-lg border border-amber-100">
                                <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                                <p className="text-xs text-amber-700">
                                    Use this to override the calculated year for Diploma lateral entry or Year-back students.
                                </p>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button 
                                type="submit"
                                disabled={saving}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2 disabled:bg-blue-300 shadow-lg shadow-blue-200"
                            >
                                <Save size={20} />
                                {saving ? "Saving Changes..." : "Update Student Profile"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditStudentProfile;