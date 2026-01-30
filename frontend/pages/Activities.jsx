import React from "react";
import ActivitiesTable from "../components/ActivitiesTable";
import { useEventList } from "../context/eventContext";
import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import API from '../api/axios.js';


function Activities () {
    const [activities, setActivities] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        eventName: "",
        date: "", 
        points: 0 ,
        certificateUrl: "",
        reportUrl: "",
    });
    const [showSuggestions, setShowSuggestions] = useState(false);
    const { allEvents } = useEventList();
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchUserActivities = async () => {
            try {
                setLoading(true);

                const res = await API.get('/api/events/user-activities', { 
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

    const filteredEvents = allEvents.sort((a, b) => new Date(b.date) - new Date(a.date)).filter(event =>
        event.eventName.toLowerCase().includes(formData.eventName.toLowerCase())
    );

    const selectSuggestion = (event) => {
        setFormData({
            eventName: event.eventName,
            date: new Date(event.date).toISOString().split('T')[0],
            points: event.points,
            certificateUrl: event.certificateUrl || "", 
            reportUrl: event.reportUrl || ""
        });
        setShowSuggestions(false);
    }

    const validateDriveLink = async (url) => {
        const driveRegex = /drive\.google\.com\/(file\/d\/|open\?id=)([\w-]+)/;
        if (!driveRegex.test(url)) return false;

        try {
            const response = await fetch(url, { 
                mode: 'no-cors',
                cache: 'no-cache'
            });
            return response.type === 'opaque'; 
        } catch (e) {
            return false;
        }
    };
    const handleSubmit = async () => {
        setError("");
        
        if (!formData.eventName || !formData.date || !formData.points || !formData.certificateUrl || !formData.reportUrl) {
            setError("All fields are mandatory.");
            return;
        }

        setLoading(true);

        try {
            const isCertValid = await validateDriveLink(formData.certificateUrl);
            const isReportValid = await validateDriveLink(formData.reportUrl);

            if (!isCertValid || !isReportValid) {
                setLoading(false);
                setError(`Permission Denied: Ensure your ${!isCertValid ? 'Certificate' : 'Report'} link is set to "Anyone with the link" in Google Drive.`);
                return;
            }

            const res = await API.post("/api/events/add", formData);


            setActivities(prev => [res.data, ...prev].sort((a, b) => new Date(b.date) - new Date(a.date)));
            setFormData({ eventName: "", date: "", points: 0, certificateUrl: "", reportUrl: "" });
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error adding activity:", error);
            setError("Failed to add activity. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (activityId) => {
        if (!window.confirm("Are you sure you want to delete this activity?")) return;

        try {
            setLoading(true);
            await API.delete(`/api/events/delete/${activityId}`, {
                withCredentials: true
            });

            setActivities(prev => prev.filter(act => act._id !== activityId));
        } catch (error) {
            console.error("Error deleting activity:", error);
            alert("Failed to delete activity.");
        } finally {
            setLoading(false);
        }
    };

    return (
    <div className="bg-gray-100 min-h-[calc(100vh-5rem)] py-8">
        <div className="bg-white rounded-2xl px-20 py-8 max-w-6xl mx-auto shadow-md">
            <h1 className='text-3xl text-gray-700'>Your Activities</h1>
            <hr className='border-gray-500 mb-8'></hr>

            {loading ? (
                    <div className="text-center py-10 text-gray-500">Loading activities...</div>
                ) : (
                    <ActivitiesTable activities={activities} onDelete={handleDelete}/>
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
                    <div>
                        <div className="my-5">
                            <label className="my-1 text-sm text-gray-600">Select an event from the list or type the name of the activity</label>
                            <br />
                            <input
                                type="text"
                                placeholder="Activity Name"
                                className="w-lg p-3 border border-gray-200 rounded-xl focus:border-blue-500 outline-none transition"
                                value={formData.eventName}
                                onChange={(e) => setFormData({...formData, eventName: e.target.value})}
                                onFocus={() => setShowSuggestions(true)}
                                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                            />

                            {showSuggestions && filteredEvents.length > 0 && (
                                <div className="absolute z-20 w-lg mt-1 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
                                    <div className="max-h-60 overflow-y-auto">
                                        {filteredEvents.map((event) => (
                                            <button
                                                key={event._id}
                                                type="button"
                                                onMouseDown={() => selectSuggestion(event)}
                                                className="w-full px-5 py-3 text-left text-gray-800 hover:bg-gray-100 font-medium transition-colors border-b border-gray-50 last:border-none flex justify-between items-center"
                                            >
                                                <span>{event.eventName}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
                            <div>
                                <label className="my-1 text-sm text-gray-600">Date</label>
                                <input 
                                    type="date"
                                    placeholder="Date"
                                    className="w-lg p-3 border border-gray-200 rounded-xl focus:border-blue-500 outline-none transition"
                                    value={formData.date}
                                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                                />
                            </div>

                            <div>
                                <label className="my-1 text-sm text-gray-600">Points</label>
                                <input 
                                    type="number"
                                    placeholder="Points"
                                    className="w-lg p-3 border border-gray-200 rounded-xl focus:border-blue-500 outline-none transition"
                                    value={formData.points}
                                    onChange={(e) => setFormData({...formData, points: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
                            <div>
                                <label className="my-1 text-sm text-gray-600">Certificate</label>
                                <input 
                                    type="url"
                                    placeholder="Google Drive link for certificate"
                                    className="w-lg p-3 border border-gray-200 rounded-xl focus:border-blue-500 outline-none transition"
                                    value={formData.certificateUrl || ""}
                                    onChange={(e) => setFormData({...formData, certificateUrl: e.target.value})}
                                    />
                            </div>

                            <div>
                                <label className="my-1 text-sm text-gray-600">Report</label>
                                <input 
                                    type="url"
                                    placeholder="Google Drive link for report"
                                    className="w-lg p-3 border border-gray-200 rounded-xl focus:border-blue-500 outline-none transition" 
                                    value={formData.reportUrl || ""}
                                    onChange={(e) => setFormData({...formData, reportUrl: e.target.value})}
                                />
                                
                            </div>
                        </div>
                        {error && (
                            <div className="bg-red-100 p-3 mb-4">
                                <p className="text-red-700 text-sm font-medium">{error}</p>
                            </div>
                        )}
                        <div className="w-xl mx-auto mt-5 pt-5">
                            <button 
                                className="w-full flex items-center justify-center-safe gap-2 border-2 border-gray-300 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition shadow-lg"
                                onClick={handleSubmit}
                            >
                                <Plus size={18} /> Add Activity
                            </button>
                        </div>
                        <div className="text-center pt-4">
                            Note: Ensure that the permissions of the files in your Google Drive are set to "Anyone with the link".
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