import React from 'react';
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

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  // --- MOCK DATA ---
  const stats = [
    {
      title: 'Total Alumni',
      value: '2,847',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: Users,
    },
    {
      title: 'Active This Month',
      value: '1,234',
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: TrendingUp,
    },
    {
      title: 'Total Donations',
      value: '$234,567',
      change: '+15.3%',
      changeType: 'positive' as const,
      icon: DollarSign,
    },
    {
      title: 'Upcoming Events',
      value: '18',
      change: '-2.1%',
      changeType: 'negative' as const,
      icon: Calendar,
    },
  ];

  const recentActivities = [
    { id: 'act1', action: 'New alumni registration', user: 'Sarah Johnson', time: '2 minutes ago', type: 'registration' as const },
    { id: 'act2', action: 'Event RSVP', user: 'Michael Chen', time: '15 minutes ago', type: 'event' as const },
    { id: 'act3', action: 'Donation received', user: 'Emily Davis', time: '1 hour ago', type: 'donation' as const },
    { id: 'act4', action: 'Profile updated', user: 'Robert Wilson', time: '2 hours ago', type: 'update' as const },
    { id: 'act5', action: 'Mentorship request', user: 'Lisa Anderson', time: '3 hours ago', type: 'mentorship' as const },
  ];

  const upcomingEvents = [
    { id: 'evt1', title: 'Annual Alumni Gala', date: 'Dec 15, 2025', attendees: 234 },
    { id: 'evt2', title: 'Tech Career Fair', date: 'Dec 20, 2025', attendees: 156 },
    { id: 'evt3', title: 'Alumni Networking Meet', date: 'Jan 5, 2026', attendees: 89 },
  ];

  // --- CLICK HANDLER FUNCTIONS ---

  const handleExportData = () => {
    // In a real app, this would trigger a data export process.
    console.log('Export Data button clicked!');
    alert('Exporting data...'); // Using alert for demonstration
  };

  const handleSendAnnouncement = () => {
    // This would typically open a modal or navigate to a new page.
    console.log('Send Announcement button clicked!');
    navigate('/communications/new');
  };

  const handleViewAllActivities = () => {
    console.log('View All Activities button clicked!');
    navigate('/activities');
  };
  
  const handleManageEvents = () => {
    console.log('Manage Events button clicked!');
    navigate('/events/manage');
  };

  const handleViewEventDetails = (eventId: string) => {
    console.log(`View Details clicked for event ID: ${eventId}`);
    navigate(`/events/${eventId}`);
  };


  // A helper function to map activity types to icons and styles
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'registration':
        return { Icon: Users, style: 'bg-green-100 text-green-600' };
      case 'event':
        return { Icon: Calendar, style: 'bg-blue-100 text-blue-600' };
      case 'donation':
        return { Icon: DollarSign, style: 'bg-yellow-100 text-yellow-600' };
      case 'mentorship':
        return { Icon: Award, style: 'bg-purple-100 text-purple-600' };
      case 'update':
        return { Icon: MessageSquare, style: 'bg-gray-100 text-gray-600' };
      default:
        return { Icon: MessageSquare, style: 'bg-gray-100 text-gray-600' };
    }
  };

  // --- JSX STRUCTURE ---
  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Overview of your alumni network</p>
          </div>
          <div className="flex space-x-2 sm:space-x-4">
            <button 
              onClick={handleExportData}
              className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors duration-200">
              Export Data
            </button>
            <button 
              onClick={handleSendAnnouncement}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200">
              Send Announcement
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200">
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
                    <span className={`text-sm font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
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
              <button 
                onClick={handleViewAllActivities}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-2">
              {recentActivities.map((activity) => {
                const { Icon, style } = getActivityIcon(activity.type);
                return (
                  <div key={activity.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                    <div className={`p-2 rounded-full ${style}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">by {activity.user}</p>
                    </div>
                    <span className="text-xs text-gray-400">{activity.time}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
              <button 
                onClick={handleManageEvents}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Manage
              </button>
            </div>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors duration-200">
                  <h3 className="font-medium text-gray-900">{event.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{event.date}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-400">{event.attendees} attendees</span>
                    <button 
                      onClick={() => handleViewEventDetails(event.id)}
                      className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
