import React, { useState, useEffect } from "react";
import API from '../api/axios.js';
import { useNavigate } from "react-router-dom";
import { UserPlus, Search } from "lucide-react";

function CounselorHome() {
    const [students, setStudents] = useState([]);
    const [newEmail, setNewEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchMyStudents = async () => {
        try {
            const res = await API.get("/api/counselor/my-students", { withCredentials: true });
            setStudents(res.data);
        } catch (err) { console.error(err); }
    };

    useEffect(() => { fetchMyStudents(); }, []);

    const handleAddStudent = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await API.post("/api/counselor/add-student", 
                { studentEmail: newEmail }, 
                { withCredentials: true }
            );
            
            alert(res.data.message || "Student added successfully!");
            setNewEmail("");
            await fetchMyStudents();
        } catch (err) {
            console.error("Add student error:", err);
            alert(err.response?.data?.message || "Error adding student. Check if the email exists.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 min-h-[calc(100vh-5rem)] py-8 px-4 md:px-8">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <div className='mb-8'>
                  <h1 className="text-heading-xl text-gray-900">Counselor Dashboard</h1>
                  <p className='text-small-secondary mt-2'>Add and manage your assigned students</p>
                </div>

                <form onSubmit={handleAddStudent} className="flex gap-4 items-end mb-8 bg-blue-50 p-6 rounded-xl border border-blue-200">
                    <div className="flex-1">
                        <label className="form-label">Add New Student</label>
                        <div className="relative">
                          <Search className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                          <input 
                              type="email" 
                              placeholder="student@college.edu"
                              className="form-input w-full pl-10 bg-white"
                              value={newEmail}
                              onChange={(e) => setNewEmail(e.target.value)}
                              required
                          />
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`btn ${loading ? 'bg-blue-400' : 'btn-primary'}`}
                    >
                        {loading ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        ) : (
                            <UserPlus size={18} />
                        )}
                        {loading ? "Adding..." : "Add"}
                    </button>
                </form>

                <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>USN</th>
                                <th>Branch</th>
                                <th className="text-center">Points</th>
                                <th className="text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, idx) => (
                                <tr key={student._id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="font-medium text-gray-900">{student.username}</td>
                                    <td className="font-mono text-gray-600">{student.usn || "—"}</td>
                                    <td className="text-gray-700">{student.branch || "—"}</td>
                                    <td className="text-center">
                                      <div className="flex items-center justify-center gap-2">
                                        <span className="badge badge-success">{student.confirmedPoints}</span>
                                        <span className="badge badge-warning">{student.pendingPoints}</span>
                                      </div>
                                    </td>
                                    <td className="text-right">
                                        <a 
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigate(`/counselor/edit-student/${student._id}`);
                                            }}
                                            className="text-blue-600 hover:text-blue-700 underline text-sm"
                                        >
                                            Edit
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {students.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p>No students assigned yet</p>
                  </div>
                )}
            </div>
        </div>
    );
}

export default CounselorHome;