import React, { useState, useEffect } from "react";
import { getData } from "../context/userContext";
import axios from "axios";

function Profile() {
    const { user, setUser } = getData();
    const [formData, setFormData] = useState({
        name: '',
        usn: '',
        year: '',
        branch: '',
        counsellor: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                usn: user.usn || '',
                year: user.year || '',
                branch: user.branch || '',
                counsellor: user.counsellor || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            const res = await axios.put("http://localhost:5000/api/auth/update", formData, {
                withCredentials: true
            });
            setUser(res.data);
            setMessage('Profile updated successfully!');
            setIsEditing(false);
        } catch (error) {
            console.error("Update error:", error);
            setMessage('Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
        setMessage('');
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData({
            name: user.name || '',
            usn: user.usn || '',
            year: user.year || '',
            branch: user.branch || '',
            counsellor: user.counsellor || ''
        });
        setMessage('');
    };

    if (!user) {
        return <div>Please log in to view your profile.</div>;
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>
            {message && (
                <div className={`mb-4 p-2 rounded ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message}
                </div>
            )}
            {!isEditing ? (
                <div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                        <p className="text-gray-900">{user.name || 'Not set'}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">USN</label>
                        <p className="text-gray-900">{user.usn || 'Not set'}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Year</label>
                        <p className="text-gray-900">{user.year || 'Not set'}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Branch</label>
                        <p className="text-gray-900">{user.branch || 'Not set'}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Counsellor</label>
                        <p className="text-gray-900">{user.counsellor || 'Not set'}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            onClick={handleEdit}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="usn">
                            USN
                        </label>
                        <input
                            type="text"
                            id="usn"
                            name="usn"
                            value={formData.usn}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="year">
                            Year
                        </label>
                        <input
                            type="text"
                            id="year"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="branch">
                            Branch
                        </label>
                        <input
                            type="text"
                            id="branch"
                            name="branch"
                            value={formData.branch}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="counsellor">
                            Counsellor
                        </label>
                        <input
                            type="text"
                            id="counsellor"
                            name="counsellor"
                            value={formData.counsellor}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                        >
                            {loading ? 'Updating...' : 'Update Profile'}
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default Profile;