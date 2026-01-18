import React from "react";
import { useNavigate } from 'react-router-dom';
import { Users, UserCheck, Calendar, FileText } from "lucide-react";

function AdminHome() {
    const navigate = useNavigate();

    return (
        <div className='bg-gray-100 min-h-[calc(100vh-5rem)] py-8'>
            <div className='bg-white rounded-2xl max-w-6xl mx-auto px-20 py-8 shadow-md'>
                <h1 className='text-3xl text-gray-700'>Admin Dashboard</h1>
                <hr className='border-gray-500'></hr>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-5'>
                    <div
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-300 hover:bg-gray-200 hover:shadow-md transition-shadow duration-300 cursor-pointer"
                        onClick={() => {
                            navigate("/admin/students");
                        }}
                        >
                        <div className="flex items-center justify-between mb-4 p-3 rounded-lg text-blue-600">
                                <Users className="w-9 h-9" />
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-gray-700">
                                Students
                            </h3>
                            <p className="text-sm text-gray-700 mt-1">Manage all students</p>
                        </div>
                    </div>


                    <div
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-300 hover:bg-gray-200 hover:shadow-md transition-shadow duration-300 cursor-pointer"
                        >
                        <div className="flex items-center justify-between mb-4 p-3 rounded-lg text-green-600">
                                <UserCheck className="w-9 h-9" />
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-gray-700">
                                Counselors
                            </h3>
                            <p className="text-sm text-gray-700 mt-1">Manage all counselors</p>
                        </div>
                    </div>


                    <div
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-300 hover:bg-gray-200 hover:shadow-md transition-shadow duration-300 cursor-pointer"
                        >
                        <div className="flex items-center justify-between mb-4 p-3 rounded-lg text-purple-600">
                                <Calendar className="w-9 h-9" />
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-gray-700">
                                Events
                            </h3>
                            <p className="text-sm text-gray-700 mt-1">Manage all events</p>
                        </div>
                    </div>


                    <div
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-300 hover:bg-gray-200 hover:shadow-md transition-shadow duration-300 cursor-pointer"
                        onClick={() => {
                            navigate("/admin/submissions");
                        }}
                        >
                        <div className="flex items-center justify-between mb-4 p-3 rounded-lg text-orange-600">
                                <FileText className="w-9 h-9" />
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-gray-700">
                                Submissions
                            </h3>
                            <p className="text-sm text-gray-700 mt-1">Manage all submissions</p>
                        </div>
                    </div>


                </div>                
            </div>
        </div>
    )
}

export default AdminHome;