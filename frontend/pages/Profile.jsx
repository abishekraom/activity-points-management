import React from "react";
import { getData } from "../context/userContext";
import axios from "axios";

function Profile() {
    const { user } = getData();

    if (!user) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <div className="text-gray-500">Loading profile...</div>
            </div>
        );
    }

    const isProfileEmpty = !user.usn || !user.branch || !user.counselorEmail;

    return (
        <div className="bg-gray-100 min-h-[calc(100vh-5rem)] py-8">
            <div className="bg-white rounded-2xl max-w-6xl mx-auto px-20 py-8 shadow-md">
                <h1 className='text-3xl text-gray-700'>Your Profile</h1>
                <hr className='border-gray-500'></hr>


                {isProfileEmpty ? (
                    <div className="my-6 py-10 text-center">
                        <div className="bg-gray-100 text-gray-700 p-4 rounded-xl">
                            <p className="font-medium">Profile Incomplete</p>
                            <p className="text-sm mt-1">Please ask your faculty counsellor to enter your information in the system.</p>
                        </div>
                    </div>
                ) : (
                    <div className="my-6">
                        <div className="py-2 grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-400 tracking-wider mb-1">
                                    Full Name
                                </label>
                                <p className="py-2 px-4 text-xl w-md font-medium text-gray-800 border-2 border-gray-300 rounded-xl">{user.username}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-400 tracking-wider mb-1">
                                    USN
                                </label>
                                <p className="py-2 px-4 text-xl w-md font-medium text-gray-800 border-2 border-gray-300 rounded-xl">{user.usn}</p>
                            </div>
                        </div>

                        <div className="py-2 grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-400 tracking-wider mb-1">
                                    Branch
                                </label>
                                <p className="py-2 px-4 text-xl w-md font-medium text-gray-800 border-2 border-gray-300 rounded-xl">{user.branch}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-400 tracking-wider mb-1">
                                    Current Year
                                </label>
                                <p className="py-2 px-4 text-xl w-md font-medium text-gray-800 border-2 border-gray-300 rounded-xl">{user.currentYear}</p>
                            </div>
                        </div>

                        <div className="py-2 grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-400 tracking-wider mb-1">
                                    Email
                                </label>
                                <p className="py-2 px-4 text-xl w-md font-medium text-gray-800 border-2 border-gray-300 rounded-xl">{user.email}</p>
                            </div>
                            <div className="border-t border-gray-50">
                                <label className="block text-sm font-semibold text-gray-400 tracking-wider mb-1">
                                    Faculty Counselor
                                </label>
                                <p className="py-2 px-4 text-xl w-md font-medium text-gray-800 border-2 border-gray-300 rounded-xl">{user.counselorEmail}</p>
                            </div>
                        </div>

                        <p className="text-md text-center text-gray-400 mt-8 italic">
                            Note: To update this information, please contact your counselor.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;