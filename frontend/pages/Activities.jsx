import React from "react";
import ActivitiesTable from "../components/ActivitiesTable";
import { useEventList } from "../context/eventContext";
import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import axios from 'axios';



function Activities () {
    const [activities, setActivities] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const { allEvents } = useEventList();

    useEffect(() => {

        const fetchUserActivities = async () => {
            try {
                setLoading(true);

                const res = await axios.get("http://localhost:5000/api/events/user-activities", { 
                    withCredentials: true 
                });
                const sorted = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setActivities(sorted);
            } catch (error) {
                console.error("Error fetching activities:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchUserActivities();
    }, []);

    const handleAddSelectedEvent = async (eventId) => {
        try {
            const res = await axios.post("http://localhost:5000/api/events/add", 
                { eventId }, 
                { withCredentials: true }
            );

            setActivities(prev => [res.data, ...prev]);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error adding activity:", error);
            alert("Failed to add activity. Please try again.");
        }
    }


    return (
    <div className="bg-gray-100 min-h-[calc(100vh-5rem)] py-8">
        <div className="bg-white rounded-2xl px-20 py-8 max-w-6xl mx-auto shadow-md">
            <h1 className='text-3xl text-gray-700'>Your Activities</h1>
            <hr className='border-gray-500 mb-8'></hr>

            {loading ? (
                    <div className="text-center py-10 text-gray-500">Loading activities...</div>
                ) : (
                    <ActivitiesTable activities={activities} />
                )}

            <button 
            className="flex items-center gap-2 border-2 border-gray-200 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 mt-4 mx-auto rounded-lg transition"
            onClick={() => setIsModalOpen(!isModalOpen)}
        >
            <Plus size={18} /> Add Activity
        </button>

        {isModalOpen && (
            <div className="fixed top-20 inset-0 z-50 flex items-center justify-center p-4"> 
                <div
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    onClick={() => setIsModalOpen(false)}
                >
                </div>

                <div className="relative bg-white rounded-2xl shadow-lg w-6xl max-x-lg p-8 z-10 border border-gray-200">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Activity</h2>

                    <div className="space-y-1">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Select Event from Catalogue</label>
                            <select
                                className="w-xl p-3 border-3 border-gray-100 rounded-xl focus:border-blue-500 outline-none transition"
                                defaultValue=""
                                onChange={(e) => {
                                    handleAddSelectedEvent(e.target.value);
                                }}
                            >
                                <option value="" disabled>-- Select an Event --</option>
                                {allEvents.map((event) => (
                                    <option key={event._id} value={event._id}>
                                        {event.eventName} ({event.points} pts)
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </div>
    </div>
    );
}

export default Activities;