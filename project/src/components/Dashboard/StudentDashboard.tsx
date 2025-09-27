import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Briefcase, 
  Calendar, 
  Award, 
  BookOpen, 
  TrendingUp,
  MessageSquare,
  Star,
  Search // Import the Search icon
} from 'lucide-react';

// --- Mock Data (in a real app, this would come from an API) ---

const quickActionsData = [
  { title: 'Find Mentors', description: 'Connect with alumni in your field', icon: Users, color: 'blue', href: '/mentorship' },
  { title: 'Browse Opportunities', description: 'Find internships and jobs', icon: Briefcase, color: 'green', href: '/opportunities' },
  { title: 'Join Events', description: 'Attend networking events', icon: Calendar, color: 'purple', href: '/events' },
  { title: 'Complete Profile', description: 'Showcase your skills', icon: Award, color: 'orange', href: '/profile' },
];

const mentorRecommendationsData = [
  { id: 1, name: 'Sarah Johnson', company: 'Microsoft', role: 'Senior Software Engineer', expertise: ['JavaScript', 'React', 'Cloud Computing'], image: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?w=150&h=150&fit=crop&crop=face', rating: 4.9, mentees: 12 },
  { id: 2, name: 'Michael Chen', company: 'Google', role: 'Product Manager', expertise: ['Product Strategy', 'Data Analysis', 'Leadership'], image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?w=150&h=150&fit=crop&crop=face', rating: 4.8, mentees: 8 },
];

const jobRecommendationsData = [
  { id: 1, title: 'Software Development Intern', company: 'Tech Startup Inc.', location: 'San Francisco, CA', type: 'Internship', posted: '2 days ago', applicants: 23 },
  { id: 2, title: 'Marketing Associate', company: 'Creative Agency', location: 'New York, NY', type: 'Full-time', posted: '5 days ago', applicants: 45 },
  { id: 3, title: 'Data Analyst Intern', company: 'Financial Corp', location: 'Chicago, IL', type: 'Internship', posted: '1 week ago', applicants: 67 },
];

const upcomingEventsData = [
  { id: 1, title: 'Tech Career Fair', date: 'Dec 20, 2024', type: 'Career', attendees: 156 },
  { id: 2, title: 'Alumni Networking Meet', date: 'Jan 5, 2025', type: 'Networking', attendees: 89 },
  { id: 3, title: 'Industry Workshop', date: 'Jan 12, 2025', type: 'Workshop', attendees: 45 },
];


const StudentDashboard: React.FC = () => {
  // --- State Management ---
  // Original data sources
  const [mentors, setMentors] = useState<typeof mentorRecommendationsData>([]);
  const [jobs, setJobs] = useState<typeof jobRecommendationsData>([]);
  const [events, setEvents] = useState<typeof upcomingEventsData>([]);
  
  // State for filtered data to be displayed
  const [filteredMentors, setFilteredMentors] = useState<typeof mentorRecommendationsData>([]);
  const [filteredJobs, setFilteredJobs] = useState<typeof jobRecommendationsData>([]);
  const [filteredEvents, setFilteredEvents] = useState<typeof upcomingEventsData>([]);

  // State for loading and search query
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Hook for navigation
  const navigate = useNavigate();

  // --- Data Fetching Simulation ---
  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);
      setTimeout(() => {
        setMentors(mentorRecommendationsData);
        setJobs(jobRecommendationsData);
        setEvents(upcomingEventsData);
        
        // Initially, the filtered data is the same as the full data set
        setFilteredMentors(mentorRecommendationsData);
        setFilteredJobs(jobRecommendationsData);
        setFilteredEvents(upcomingEventsData);

        setIsLoading(false);
      }, 1000);
    };
    fetchData();
  }, []);

  // --- Filtering Logic ---
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();

    // Filter Mentors
    const newFilteredMentors = mentors.filter(mentor => 
      mentor.name.toLowerCase().includes(lowercasedQuery) ||
      mentor.company.toLowerCase().includes(lowercasedQuery) ||
      mentor.role.toLowerCase().includes(lowercasedQuery) ||
      mentor.expertise.some(skill => skill.toLowerCase().includes(lowercasedQuery))
    );
    setFilteredMentors(newFilteredMentors);

    // Filter Jobs
    const newFilteredJobs = jobs.filter(job =>
      job.title.toLowerCase().includes(lowercasedQuery) ||
      job.company.toLowerCase().includes(lowercasedQuery) ||
      job.location.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredJobs(newFilteredJobs);
    
    // Filter Events
    const newFilteredEvents = events.filter(event =>
      event.title.toLowerCase().includes(lowercasedQuery) ||
      event.type.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredEvents(newFilteredEvents);

  }, [searchQuery, mentors, jobs, events]); // Rerun when search query or data changes

  // --- Action Handlers ---
  const handleNavigation = (path: string) => navigate(path);
  const handleRequestMentorship = (mentorName: string) => alert(`Mentorship request sent to ${mentorName}!`);
  const handleApplyToJob = (jobTitle: string) => alert(`Successfully applied to ${jobTitle}!`);
  const handleRegisterForEvent = (eventTitle: string) => alert(`You are now registered for ${eventTitle}!`);

  // --- Render Logic ---
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
          <h1 className="text-2xl font-bold text-gray-900">Welcome, Emily!</h1>
          <p className="text-gray-600">Your journey to success starts here</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-500">Profile Completion</p>
            <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
              <div className="bg-blue-600 h-2 rounded-full w-3/4"></div>
            </div>
          </div>
          <button 
            onClick={() => handleNavigation('/profile')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Complete Profile
          </button>
        </div>
      </div>

      {/* --- Search Bar --- */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search for mentors, jobs, events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-blue-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActionsData.map((action, index) => (
          <div
            key={index}
            onClick={() => handleNavigation(action.href)}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer group"
          >
            <div className={`p-3 rounded-lg mb-4 w-fit ${
              action.color === 'blue' ? 'bg-blue-50 group-hover:bg-blue-100' :
              action.color === 'green' ? 'bg-green-50 group-hover:bg-green-100' :
              action.color === 'purple' ? 'bg-purple-50 group-hover:bg-purple-100' :
              'bg-orange-50 group-hover:bg-orange-100'
            } transition-colors duration-200`}>
              <action.icon className={`h-6 w-6 ${
                action.color === 'blue' ? 'text-blue-600' :
                action.color === 'green' ? 'text-green-600' :
                action.color === 'purple' ? 'text-purple-600' :
                'text-orange-600'
              }`} />
            </div>
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
              {action.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{action.description}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* --- Mentor Recommendations (now using filteredMentors) --- */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recommended Mentors</h2>
            <button onClick={() => handleNavigation('/mentorship')} className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {filteredMentors.length > 0 ? (
              filteredMentors.map((mentor) => (
                <div key={mentor.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors duration-200">
                  <div className="flex items-start space-x-3">
                    <img src={mentor.image} alt={mentor.name} className="h-12 w-12 rounded-full object-cover" />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{mentor.name}</h3>
                      <p className="text-sm text-gray-600">{mentor.role} at {mentor.company}</p>
                      <div className="flex items-center mt-1"><Star className="h-4 w-4 text-yellow-400 fill-current" /><span className="text-sm text-gray-600 ml-1">{mentor.rating} • {mentor.mentees} mentees</span></div>
                      <div className="flex flex-wrap gap-1 mt-2">{mentor.expertise.slice(0, 3).map((skill, skillIndex) => (<span key={skillIndex} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">{skill}</span>))}</div>
                      <button onClick={() => handleRequestMentorship(mentor.name)} className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200">Request Mentorship</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm text-center py-4">No mentors found matching your search.</p>
            )}
          </div>
        </div>

        {/* --- Job Recommendations (now using filteredJobs) --- */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Job Opportunities</h2>
            <button onClick={() => handleNavigation('/opportunities')} className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div key={job.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors duration-200">
                  <h3 className="font-medium text-gray-900">{job.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{job.company} • {job.location}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2"><span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${job.type === 'Internship' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>{job.type}</span><span className="text-xs text-gray-500">{job.posted}</span></div>
                    <span className="text-xs text-gray-500">{job.applicants} applicants</span>
                  </div>
                  <button onClick={() => handleApplyToJob(job.title)} className="w-full mt-3 border border-blue-600 text-blue-600 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors duration-200">Apply Now</button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm text-center py-4">No jobs found matching your search.</p>
            )}
          </div>
        </div>
      </div>

      {/* --- Upcoming Events (now using filteredEvents) --- */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
          <button onClick={() => handleNavigation('/events')} className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All Events</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div key={event.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors duration-200">
                <h3 className="font-medium text-gray-900">{event.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{event.date}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${event.type === 'Career' ? 'bg-green-50 text-green-700' : event.type === 'Networking' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'}`}>{event.type}</span>
                  <span className="text-xs text-gray-500">{event.attendees} attending</span>
                </div>
                <button onClick={() => handleRegisterForEvent(event.title)} className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200">Register</button>
              </div>
            ))
          ) : (
             <p className="text-gray-500 text-sm text-center py-4 col-span-3">No events found matching your search.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;