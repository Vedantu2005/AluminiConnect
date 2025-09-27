import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  MessageSquare,
  Award,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

// --- Mock Data (in a real app, this would come from an API) ---
const initialStats = [
  { id: 1, title: 'Total Alumni', value: '2,847', change: '+12.5%', changeType: 'positive' as const, icon: Users },
  { id: 2, title: 'Active This Month', value: '1,234', change: '+8.2%', changeType: 'positive' as const, icon: TrendingUp },
  { id: 3, title: 'Total Donations', value: '$234,567', change: '+15.3%', changeType: 'positive' as const, icon: DollarSign },
  { id: 4, title: 'Upcoming Events', value: '18', change: '-2.1%', changeType: 'negative' as const, icon: Calendar },
];

const initialActivities = [
  { id: 1, action: 'New alumni registration', user: 'Sarah Johnson', time: '2 minutes ago', type: 'registration' as const },
  { id: 2, action: 'Event RSVP', user: 'Michael Chen', time: '15 minutes ago', type: 'event' as const },
  { id: 3, action: 'Donation received', user: 'Emily Davis', time: '1 hour ago', type: 'donation' as const },
  { id: 4, action: 'Profile updated', user: 'Robert Wilson', time: '2 hours ago', type: 'update' as const },
  { id: 5, action: 'Mentorship request', user: 'Lisa Anderson', time: '3 hours ago', type: 'mentorship' as const },
];

const initialEvents = [
  { id: 1, title: 'Annual Alumni Gala', date: 'Dec 15, 2024', attendees: 234 },
  { id: 2, title: 'Tech Career Fair', date: 'Dec 20, 2024', attendees: 156 },
  { id: 3, title: 'Alumni Networking Meet', date: 'Jan 5, 2025', attendees: 89 },
];


const AdminDashboard: React.FC = () => {
  // --- State Management ---
  const [stats, setStats] = useState<typeof initialStats>([]);
  const [activities, setActivities] = useState<typeof initialActivities>([]);
  const [events, setEvents] = useState<typeof initialEvents>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const navigate = useNavigate();

  // --- Data Fetching Simulation ---
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setStats(initialStats);
      setActivities(initialActivities);
      setEvents(initialEvents);
      setIsLoading(false);
    }, 1000); // 1-second delay
  }, []);
  
  // --- Action Handlers ---
  const handleExportData = () => {
    alert('Exporting data as CSV...');
    // In a real app, you would trigger a file download here.
  };
  
  const handleSendAnnouncement = () => {
    const message = prompt("Enter the announcement message to send to all alumni:");
    if (message) {
      alert(`Announcement Sent: "${message}"`);
      // In a real app, you would make an API call to send the announcement.
    } else {
      alert("Announcement cancelled.");
    }
  };
  
  const handleViewEventDetails = (eventTitle: string) => {
    alert(`Viewing details for: ${eventTitle}`);
    // You could also navigate to a specific event page: navigate(`/events/${eventId}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Overview of your alumni network</p>
        </div>
        <div className="flex space-x-4">
          <button onClick={handleExportData} className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            Export Data
          </button>
          <button onClick={handleSendAnnouncement} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
            Send Announcement
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <div className="flex items-center mt-2">
                  {stat.changeType === 'positive' ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <stat.icon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
            <button onClick={() => navigate('/analytics')} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                <div className={`p-2 rounded-full ${
                  activity.type === 'registration' ? 'bg-green-100 text-green-600' :
                  activity.type === 'event' ? 'bg-blue-100 text-blue-600' :
                  activity.type === 'donation' ? 'bg-yellow-100 text-yellow-600' :
                  activity.type === 'mentorship' ? 'bg-purple-100 text-purple-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {activity.type === 'registration' && <Users className="h-4 w-4" />}
                  {activity.type === 'event' && <Calendar className="h-4 w-4" />}
                  {activity.type === 'donation' && <DollarSign className="h-4 w-4" />}
                  {activity.type === 'mentorship' && <Award className="h-4 w-4" />}
                  {activity.type === 'update' && <MessageSquare className="h-4 w-4" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">by {activity.user}</p>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
            <button onClick={() => navigate('/events')} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Manage
            </button>
          </div>
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors duration-200">
                <h3 className="font-medium text-gray-900">{event.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{event.date}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-400">{event.attendees} attendees</span>
                  <button onClick={() => handleViewEventDetails(event.title)} className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;