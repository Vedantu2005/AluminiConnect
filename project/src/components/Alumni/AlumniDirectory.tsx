import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Building, 
  GraduationCap, 
  Mail, 
  Linkedin, 
  Star 
} from 'lucide-react';

interface AlumniMember {
  id: string;
  name: string;
  email: string;
  image: string;
  batch: string;
  degree: string;
  company: string;
  position: string;
  location: string;
  skills: string[];
  linkedIn?: string;
  bio: string;
  rating: number;
  mentees?: number;
}

const AlumniDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedDegree, setSelectedDegree] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const mockAlumni: AlumniMember[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      image: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?w=150&h=150&fit=crop&crop=face',
      batch: '2018',
      degree: 'Computer Science',
      company: 'Microsoft',
      position: 'Senior Software Engineer',
      location: 'Seattle, WA',
      skills: ['JavaScript', 'React', 'Azure', 'Python'],
      linkedIn: 'linkedin.com/in/sarahjohnson',
      bio: 'Passionate about building scalable web applications and mentoring junior developers.',
      rating: 4.9,
      mentees: 12,
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?w=150&h=150&fit=crop&crop=face',
      batch: '2019',
      degree: 'Business Administration',
      company: 'Google',
      position: 'Product Manager',
      location: 'Mountain View, CA',
      skills: ['Product Strategy', 'Data Analysis', 'Leadership', 'Agile'],
      linkedIn: 'linkedin.com/in/michaelchen',
      bio: 'Product leader focused on user experience and data-driven decision making.',
      rating: 4.8,
      mentees: 8,
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@email.com',
      image: 'https://images.pexels.com/photos/3781529/pexels-photo-3781529.jpeg?w=150&h=150&fit=crop&crop=face',
      batch: '2020',
      degree: 'Marketing',
      company: 'Apple',
      position: 'Marketing Director',
      location: 'Cupertino, CA',
      skills: ['Digital Marketing', 'Brand Strategy', 'Content Creation', 'Analytics'],
      linkedIn: 'linkedin.com/in/emilyrodriguez',
      bio: 'Creative marketing professional with expertise in digital campaigns and brand development.',
      rating: 4.7,
      mentees: 15,
    },
    {
      id: '4',
      name: 'David Wilson',
      email: 'david.wilson@email.com',
      image: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?w=150&h=150&fit=crop&crop=face',
      batch: '2017',
      degree: 'Mechanical Engineering',
      company: 'Tesla',
      position: 'Senior Design Engineer',
      location: 'Austin, TX',
      skills: ['CAD Design', 'Project Management', 'Manufacturing', 'Innovation'],
      linkedIn: 'linkedin.com/in/davidwilson',
      bio: 'Mechanical engineer passionate about sustainable technology and electric vehicles.',
      rating: 4.6,
      mentees: 6,
    },
    {
      id: '5',
      name: 'Lisa Anderson',
      email: 'lisa.anderson@email.com',
      image: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?w=150&h=150&fit=crop&crop=face',
      batch: '2021',
      degree: 'Finance',
      company: 'Goldman Sachs',
      position: 'Investment Analyst',
      location: 'New York, NY',
      skills: ['Financial Analysis', 'Risk Management', 'Investment Strategy', 'Excel'],
      linkedIn: 'linkedin.com/in/lisaanderson',
      bio: 'Finance professional specializing in investment analysis and portfolio management.',
      rating: 4.5,
      mentees: 4,
    },
    {
      id: '6',
      name: 'Robert Kim',
      email: 'robert.kim@email.com',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=150&h=150&fit=crop&crop=face',
      batch: '2016',
      degree: 'Data Science',
      company: 'Netflix',
      position: 'Senior Data Scientist',
      location: 'Los Gatos, CA',
      skills: ['Machine Learning', 'Python', 'SQL', 'Statistics'],
      linkedIn: 'linkedin.com/in/robertkim',
      bio: 'Data scientist with expertise in machine learning and recommendation systems.',
      rating: 4.8,
      mentees: 10,
    },
  ];

  const batches = ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'];
  const degrees = ['Computer Science', 'Business Administration', 'Marketing', 'Mechanical Engineering', 'Finance', 'Data Science'];
  const locations = ['Seattle, WA', 'Mountain View, CA', 'Cupertino, CA', 'Austin, TX', 'New York, NY', 'Los Gatos, CA'];

  const filteredAlumni = mockAlumni.filter(alumnus => {
    const matchesSearch = alumnus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alumnus.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alumnus.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alumnus.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesBatch = !selectedBatch || alumnus.batch === selectedBatch;
    const matchesDegree = !selectedDegree || alumnus.degree === selectedDegree;
    const matchesLocation = !selectedLocation || alumnus.location === selectedLocation;
    
    return matchesSearch && matchesBatch && matchesDegree && matchesLocation;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Alumni Directory</h1>
          <p className="text-gray-600">Connect with {mockAlumni.length} alumni from your network</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, company, position, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year</label>
              <select
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Years</option>
                {batches.map(batch => (
                  <option key={batch} value={batch}>{batch}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
              <select
                value={selectedDegree}
                onChange={(e) => setSelectedDegree(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Degrees</option>
                {degrees.map(degree => (
                  <option key={degree} value={degree}>{degree}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredAlumni.length} of {mockAlumni.length} alumni
        </p>
      </div>

      {/* Alumni Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlumni.map((alumnus) => (
          <div
            key={alumnus.id}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={alumnus.image}
                alt={alumnus.name}
                className="h-16 w-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{alumnus.name}</h3>
                <p className="text-sm text-gray-600">{alumnus.position}</p>
                <div className="flex items-center mt-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">
                    {alumnus.rating} • {alumnus.mentees} mentees
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Building className="h-4 w-4 mr-2" />
                {alumnus.company}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <GraduationCap className="h-4 w-4 mr-2" />
                {alumnus.degree} • Class of {alumnus.batch}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                {alumnus.location}
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{alumnus.bio}</p>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {alumnus.skills.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
                >
                  {skill}
                </span>
              ))}
              {alumnus.skills.length > 3 && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-50 text-gray-700">
                  +{alumnus.skills.length - 3} more
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200">
                Connect
              </button>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <Mail className="h-4 w-4 text-gray-600" />
              </button>
              {alumnus.linkedIn && (
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <Linkedin className="h-4 w-4 text-gray-600" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredAlumni.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No alumni found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
        </div>
      )}
    </div>
  );
};

export default AlumniDirectory;