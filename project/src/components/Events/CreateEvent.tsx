import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, ArrowLeft } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000';

const CreateEvent: React.FC = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [attendees, setAttendees] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!title || !date) {
            setError('Please fill out both the title and date fields.');
            return;
        }
        
        setSubmitting(true);

        try {
            const response = await fetch(`${API_BASE_URL}/api/events`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    date,
                    attendees: Number(attendees)
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create event.');
            }

            // On success, navigate back to the dashboard to see the new event
            navigate('/dashboard');

        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4">
            <div className="max-w-xl mx-auto">
                 <button 
                    onClick={() => navigate(-1)} 
                    className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6 font-medium"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                </button>
                <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Create New Event</h1>
                    <p className="text-gray-600 mb-8">Fill in the details below to add a new event to the portal.</p>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g., Annual Alumni Gala"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                            />
                        </div>

                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                            <div className="relative">
                                <Calendar className="h-5 w-5 text-gray-400 absolute top-1/2 -translate-y-1/2 left-4" />
                                <input
                                    type="date"
                                    id="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="attendees" className="block text-sm font-medium text-gray-700 mb-1">Initial Attendees (Optional)</label>
                            <div className="relative">
                                <Users className="h-5 w-5 text-gray-400 absolute top-1/2 -translate-y-1/2 left-4" />
                                <input
                                    type="number"
                                    id="attendees"
                                    value={attendees}
                                    onChange={(e) => setAttendees(e.target.value)}
                                    placeholder="e.g., 50"
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                                />
                            </div>
                        </div>

                        {error && <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</p>}

                        <div>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-400 transition-all duration-200 transform hover:scale-105"
                            >
                                {submitting ? 'Creating Event...' : 'Create Event'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateEvent;
