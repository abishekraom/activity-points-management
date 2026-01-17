import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Search, ChevronLeft, ChevronDown } from 'lucide-react';
import axios from "axios";

function StudentsList() {
    const [students, setStudents] = useState([]);
    const [filters, setFilters] = useState({ search: "", branch: "", year: "" });
    const [loading, setLoading] = useState(false);
    const [showBranchDropdown, setShowBranchDropdown] = useState(false);
    // Added state for Year dropdown
    const [showYearDropdown, setShowYearDropdown] = useState(false);
    
    const navigate = useNavigate();

    const branches = ["AS", "BT", "CD", "CH", "CI", "CS", "CV", "CY", "EC", "EE", "ET", "IM", "IS", "ME"];
    const years = [1, 2, 3, 4];

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get("api/admin/students", { params: filters });
            setStudents(data.students || []);
        } catch (error) {
            console.error("Error fetching students: ", error);   
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(fetchStudents, 400);
        return () => clearTimeout(timeoutId);
    }, [filters]);

    return (
        <div className="bg-gray-100 min-h-[calc(100vh-5rem)] py-8">
            <div className='bg-white rounded-2xl max-w-6xl mx-auto px-20 py-8 shadow-md'>
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-500 hover:text-gray-800 transition-colors mb-4"
                >
                    <ChevronLeft className="w-5 h-5" /> <span>Back to Dashboard</span>
                </button>
                <h1 className='text-3xl text-gray-700'>Students</h1>
                <hr className='border-gray-500 mb-3'></hr>
                
                <div className="flex flex-wrap gap-3 p-2">
                    {/* Search Field */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            className="pl-9 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Search by name or USN"
                            value={filters.search}
                            onChange={(e) => setFilters({...filters, search: e.target.value})}
                        />
                    </div>

                    {/* Department Dropdown */}
                    <div className="relative w-30">
                        <button
                            type="button"
                            onClick={() => setShowBranchDropdown(!showBranchDropdown)}
                            onBlur={() => setTimeout(() => setShowBranchDropdown(false), 200)}
                            className="w-full px-3 py-2 bg-gray-100 text-left focus:ring-2 focus:ring-blue-500 text-sm rounded-lg outline-none flex justify-between items-center"
                        >
                            <span className="text-gray-700">
                                {filters.branch || "Dept"}
                            </span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${showBranchDropdown ? 'rotate-180' : ''}`} />
                        </button>

                        {showBranchDropdown && (
                            <div className="absolute z-20 w-full text-sm mt-1 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
                                <div className="max-h-50 overflow-y-auto">
                                    <button
                                        onClick={() => setFilters({ ...filters, branch: "" })}
                                        className="w-full px-5 py-2 text-left text-gray-700 hover:bg-gray-100 font-medium transition-colors border-b border-gray-50"
                                    >
                                        All
                                    </button>
                                    {branches.map((branch) => (
                                        <button
                                            key={branch}
                                            type="button"
                                            onClick={() => setFilters({ ...filters, branch: branch })}
                                            className="w-full px-5 py-2 text-left text-gray-700 hover:bg-gray-100 font-medium transition-colors border-b border-gray-50 last:border-none"
                                        >
                                            {branch}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="relative w-30">
                        <button
                            type="button"
                            onClick={() => setShowYearDropdown(!showYearDropdown)}
                            onBlur={() => setTimeout(() => setShowYearDropdown(false), 200)}
                            className="w-full px-3 py-2 bg-gray-100 text-left focus:ring-2 focus:ring-blue-500 text-sm rounded-lg outline-none flex justify-between items-center"
                        >
                            <span className="text-gray-700">
                                {filters.year ? `Year ${filters.year}` : "Year"}
                            </span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${showYearDropdown ? 'rotate-180' : ''}`} />
                        </button>

                        {showYearDropdown && (
                            <div className="absolute z-20 w-full text-sm mt-1 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
                                <div className="max-h-50 overflow-y-auto">
                                    <button
                                        onClick={() => setFilters({ ...filters, year: "" })}
                                        className="w-full px-5 py-2 text-left text-gray-700 hover:bg-gray-100 font-medium transition-colors border-b border-gray-50"
                                    >
                                        All
                                    </button>
                                    {years.map((y) => (
                                        <button
                                            key={y}
                                            type="button"
                                            onClick={() => setFilters({ ...filters, year: y })}
                                            className="w-full px-5 py-2 text-left text-gray-700 hover:bg-gray-100 font-medium transition-colors border-b border-gray-50 last:border-none"
                                        >
                                            {y}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Table implementation should go here */}
                {/* Table Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Student</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">USN</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Department</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-center">Activity Points</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-20 text-gray-400">Loading students...</td>
                                </tr>
                            ) : (
                                students.map((student) => (
                                    <tr key={student._id} className="hover:bg-blue-50/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                                    {student.username ? student.username[0].toUpperCase() : "?"}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-800">{student.username}</div>
                                                    <div className="text-xs text-gray-500">{student.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-mono text-gray-600">{student.usn || "N/A"}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                                                {student.branch || "N/A"} • Year {student.currentYear || "?"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center items-center gap-2">
                                                <span className="text-green-600 font-bold" title="Confirmed">{student.confirmedPoints || 0}</span>
                                                <span className="text-gray-300">|</span>
                                                <span className="text-orange-500 font-medium" title="Pending">{student.pendingPoints || 0}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-blue-600 hover:underline text-sm font-medium">View Details</button>
                                        </td>
                                    </tr>
                                ))
                            )}

                            {/* No Results Case */}
                            {!loading && students.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="py-20 text-center text-gray-400">
                                        No students found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default StudentsList;