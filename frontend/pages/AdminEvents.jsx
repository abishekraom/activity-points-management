import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getData } from '../context/userContext.jsx';

const AdminEvents = () => {
    const { user, loading: authLoading } = getData(); 
    const [events, setEvents] = useState([]);
    const [fetching, setFetching] = useState(true); 
    
    const [formData, setFormData] = useState({
        eventName: '', date: '', points: '', posterUrl: '', registrationUrl: ''
    });

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/events');
                setEvents(res.data);
            } catch (err) {
                console.error("Error fetching events", err);
            } finally {
                setFetching(false);
            }
        };
        fetchEvents();
    }, []);

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/events/create-event', formData, { withCredentials: true });
            alert("Event Posted!");
            setEvents([res.data, ...events]); 
            setFormData({ eventName: '', date: '', points: '', posterUrl: '', registrationUrl: '' });
        } catch (err) {
            alert("Failed to post event: " + (err.response?.data?.message || "Server Error"));
        }
    };

    if (authLoading || fetching) return <div className="text-center p-10">Loading...</div>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">College Events - Admin</h1>

            {/* ADMIN FORM */}
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-8 border border-blue-200">
                <h2 className="text-xl font-bold mb-4 text-blue-700">Post New Upcoming Event</h2>
                <form onSubmit={handleCreateEvent} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Event Name" className="border p-2 rounded" required
                        value={formData.eventName}
                        onChange={(e) => setFormData({...formData, eventName: e.target.value})} />
                    <input type="date" className="border p-2 rounded" required
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})} />
                    <input type="number" placeholder="Points" className="border p-2 rounded" required
                        value={formData.points}
                        onChange={(e) => setFormData({...formData, points: e.target.value})} />
                    <input type="text" placeholder="Poster Image URL" className="border p-2 rounded"
                        value={formData.posterUrl}
                        onChange={(e) => setFormData({...formData, posterUrl: e.target.value})} />
                    <input type="text" placeholder="Registration Link" className="border p-2 rounded md:col-span-1"
                        value={formData.registrationUrl}
                        onChange={(e) => setFormData({...formData, registrationUrl: e.target.value})} />
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md:col-span-2 transition shadow-md">
                        Create Event
                    </button>
                </form>
            </div>

            {/* EVENT LIST - All Events */}
            {events.length === 0 ? (
                <p className="text-center text-gray-500">No events found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <div key={event._id} className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all transform hover:-translate-y-1">
                            {event.posterUrl ? (
                                <img src={event.posterUrl} alt="Poster" className="w-full h-48 object-cover" />
                            ) : (
                                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">No Image</div>
                            )}
                            <div className="p-4">
                                <h3 className="text-xl font-bold mb-2 text-gray-800">{event.eventName}</h3>
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-gray-600 text-sm">📅 {new Date(event.date).toLocaleDateString()}</span>
                                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                                        {event.points} pts
                                    </span>
                                </div>
                                {event.registrationUrl && (
                                    <a href={event.registrationUrl} target="_blank" rel="noreferrer" 
                                       className="block text-center bg-gray-800 hover:bg-black text-white py-2 rounded-lg transition font-medium">
                                        Register Now
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminEvents;
