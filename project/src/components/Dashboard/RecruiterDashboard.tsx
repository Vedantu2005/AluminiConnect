import React from 'react';
import { 
  Briefcase, 
  Users, 
  Eye, 
  MessageSquare, 
  TrendingUp, 
  Calendar,
  Star,
  MapPin
} from 'lucide-react';

const RecruiterDashboard: React.FC = () => {
  const stats = [
    {
      title: 'Active Job Posts',
      value: '12',
      change: '+3 this month',
      icon: Briefcase,
      color: 'blue',
    },
    {
      title: 'Total Applications',
      value: '284',
      change: '+45 this week',
      icon: Users,
      color: 'green',
    },
    {
      title: 'Profile Views',
      value: '1,247',
      change: '+128 this month',
      icon: Eye,
      color: 'purple',
    },
    {
      title: 'Interviews Scheduled',
      value: '18',
      change: '+6 this week',
      icon: Calendar,
      color: 'orange',
    },
  ];

  const jobPosts = [
    {
      title: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      type: 'Full-time',
      applications: 45,
      views: 234,
      posted: '3 days ago',
      status: 'active',
    },
    {
      title: 'Product Manager',
      location: 'New York, NY',
      type: 'Full-time',
      applications: 67,
      views: 189,
      posted: '1 week ago',
      status: 'active',
    },
    {
      title: 'Marketing Intern',
      location: 'Chicago, IL',
      type: 'Internship',
      applications: 23,
      views: 156,
      posted: '2 weeks ago',
      status: 'draft',
    },
  ];

  const recentCandidates = [
    {
      name: 'Sarah Johnson',
      degree: 'Computer Science',
      batch: '2024',
      skills: ['JavaScript', 'React', 'Node.js'],
      image: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?w=150&h=150&fit=crop&crop=face',
      rating: 4.8,
      appliedFor: 'Senior Software Engineer',
    },
    {
      name: 'Michael Chen',
      degree: 'Business Administration',
      batch: '2023',
      skills: ['Product Strategy', 'Analytics', 'Leadership'],
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?w=150&h=150&fit=crop&crop=face',
      rating: 4.6,
      appliedFor: 'Product Manager',
    },
    {
      name: 'Emily Davis',
      degree: 'Marketing',
      batch: '2025',
      skills: ['Digital Marketing', 'Content Creation', 'SEO'],
      image: 'https://images.pexels.com/photos/3781529/pexels-photo-3781529.jpeg?w=150&h=150&fit=crop&crop=face',
      rating: 4.7,
      appliedFor: 'Marketing Intern',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Recruiter Dashboard</h1>
          <p className="text-gray-600">Manage your hiring pipeline effectively</p>
        </div>
        <div className="flex space-x-4">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            Export Data
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
            Post New Job
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
                <p className="text-sm text-green-600 mt-2">{stat.change}</p>
              </div>
              <div className={`p-3 rounded-lg ${
                stat.color === 'blue' ? 'bg-blue-50' :
                stat.color === 'green' ? 'bg-green-50' :
                stat.color === 'purple' ? 'bg-purple-50' :
                'bg-orange-50'
              }`}>
                <stat.icon className={`h-6 w-6 ${
                  stat.color === 'blue' ? 'text-blue-600' :
                  stat.color === 'green' ? 'text-green-600' :
                  stat.color === 'purple' ? 'text-purple-600' :
                  'text-orange-600'
                }`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Job Posts */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Job Posts</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Manage All
            </button>
          </div>
          <div className="space-y-4">
            {jobPosts.map((job, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{job.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    job.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-700'
                  }`}>
                    {job.status}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-3 text-sm text-gray-600">
                  <div className="flex space-x-4">
                    <span>{job.applications} applications</span>
                    <span>{job.views} views</span>
                  </div>
                  <span>{job.posted}</span>
                </div>
                <div className="flex space-x-2 mt-3">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200">
                    View Applications
                  </button>
                  <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors duration-200">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Candidates */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Candidates</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentCandidates.map((candidate, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors duration-200">
                <div className="flex items-start space-x-3">
                  <img
                    src={candidate.image}
                    alt={candidate.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{candidate.name}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{candidate.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{candidate.degree} • Class of {candidate.batch}</p>
                    <p className="text-xs text-blue-600 mt-1">Applied for: {candidate.appliedFor}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {candidate.skills.slice(0, 3).map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <button className="flex-1 bg-green-600 text-white py-1.5 px-3 rounded text-xs font-medium hover:bg-green-700 transition-colors duration-200">
                        Schedule Interview
                      </button>
                      <button className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded text-xs font-medium hover:bg-gray-50 transition-colors duration-200">
                        Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;