import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Filter, 
  Search,
  Plus,
  Share,
  Heart,
  Loader2
} from 'lucide-react';
import { format } from 'date-fns';

// The base URL for your backend server
const API_BASE_URL = 'http://localhost:5000';

interface Event {
  _id: string; // Changed from id to _id to match MongoDB
  title: string;
  description: string;
  date: string; // Dates from backend will be ISO strings
  time: string;
  location: string;
  type: 'reunion' | 'networking' | 'workshop' | 'webinar' | 'career' | 'social';
  attendees: number;
  maxAttendees?: number;
  organizer: string;
  image: string;
  isRegistered: boolean;
  price: number;
}

const Events: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // --- DATA FETCHING with useEffect ---
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE_URL}/api/events`);
        
        // --- IMPROVED ERROR HANDLING ---
        // Check if the response is actually JSON before trying to parse it.
        const contentType = response.headers.get("content-type");
        if (!response.ok || !contentType || !contentType.includes("application/json")) {
          // This block will run if the server is down, returning an HTML error page,
          // or if the response isn't JSON for any other reason.
          throw new Error('Failed to get a valid response from the server. Is your backend server running?');
        }
        
        const data = await response.json();
        setEvents(data);

      } catch (err: any) {
        // The new error message will be more specific.
        setError(err.message || 'Failed to fetch events.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);


  const eventTypes = [
    { value: 'reunion', label: 'Reunion' },
    { value: 'networking', label: 'Networking' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'webinar', label: 'Webinar' },
    { value: 'career', label: 'Career' },
    { value: 'social', label: 'Social' },
  ];

  const getTypeColor = (type: string) => {
    const colors = {
      reunion: 'bg-purple-50 text-purple-700',
      networking: 'bg-blue-50 text-blue-700',
      workshop: 'bg-green-50 text-green-700',
      webinar: 'bg-orange-50 text-orange-700',
      career: 'bg-red-50 text-red-700',
      social: 'bg-teal-50 text-teal-700',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-50 text-gray-700';
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || event.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        <p className="ml-4 text-lg text-gray-700">Loading Events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] p-4">
        <div className="text-center p-8 bg-white rounded-lg shadow-md border border-red-200">
          <h2 className="text-xl font-bold text-red-600">An Error Occurred</h2>
          <p className="text-gray-600 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Alumni Events</h1>
          <p className="text-gray-600">Discover and join events in your alumni community</p>
        </div>
        <button onClick={() => navigate('/events/new')} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Create Event</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1 relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div>

        {showFilters && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              <button
                onClick={() => setSelectedType('')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  selectedType === '' ? 'bg-blue-100 text-blue-700' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                All Events
              </button>
              {eventTypes.map(type => (
                <button
                  key={type.value}
                  onClick={() => setSelectedType(type.value)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    selectedType === type.value ? 'bg-blue-100 text-blue-700' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredEvents.map((event) => (
          <div
            key={event._id} // Use _id from MongoDB
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            <div className="relative h-48">
              <img
                src={event.image || 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?w=800&h=400&fit=crop'} // Fallback image
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(event.type)}`}>
                  {eventTypes.find(t => t.value === event.type)?.label || 'General'}
                </span>
              </div>
              <div className="absolute top-4 right-4 flex space-x-2">
                <button className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all duration-200">
                  <Heart className="h-4 w-4 text-gray-600" />
                </button>
                <button className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all duration-200">
                  <Share className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  {format(new Date(event.date), 'MMMM dd, yyyy')}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  {event.time || 'N/A'}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {event.location || 'N/A'}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  {event.attendees} attending{event.maxAttendees && ` • ${event.maxAttendees} max`}
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">by {event.organizer || 'Alumni Office'}</span>
                {event.price > 0 && (
                  <span className="text-lg font-semibold text-gray-900">${event.price}</span>
                )}
                {event.price === 0 && (
                  <span className="text-lg font-semibold text-green-600">Free</span>
                )}
              </div>

              <div className="flex space-x-3">
                {event.isRegistered ? (
                  <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium">
                    Registered
                  </button>
                ) : (
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
                    Register Now
                  </button>
                )}
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200">
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {!loading && filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or creating a new event.</p>
        </div>
      )}
    </div>
  );
};

export default Events;

