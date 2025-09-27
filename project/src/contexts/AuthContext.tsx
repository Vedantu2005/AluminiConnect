import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'admin' | 'alumni' | 'student' | 'recruiter';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  profile?: {
    batch?: string;
    degree?: string;
    company?: string;
    position?: string;
    location?: string;
    phone?: string;
    linkedIn?: string;
    bio?: string;
    skills?: string[];
    achievements?: string[];
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Partial<User> & { password: string }) => Promise<boolean>;
  logout: () => void;
  updateProfile: (profileData: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    email: 'admin@university.edu',
    password: 'admin123',
    name: 'Sarah Johnson',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: '2',
    email: 'john.smith@email.com',
    password: 'alumni123',
    name: 'John Smith',
    role: 'alumni',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?w=150&h=150&fit=crop&crop=face',
    profile: {
      batch: '2018',
      degree: 'Computer Science',
      company: 'Tech Corp',
      position: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      phone: '+1-555-0123',
      linkedIn: 'linkedin.com/in/johnsmith',
      bio: 'Passionate software engineer with 6 years of experience in full-stack development.',
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS'],
      achievements: ['Employee of the Year 2022', 'Open Source Contributor']
    }
  },
  {
    id: '3',
    email: 'emily.davis@student.edu',
    password: 'student123',
    name: 'Emily Davis',
    role: 'student',
    avatar: 'https://images.pexels.com/photos/3781529/pexels-photo-3781529.jpeg?w=150&h=150&fit=crop&crop=face',
    profile: {
      batch: '2025',
      degree: 'Business Administration',
      location: 'New York, NY',
    }
  },
  {
    id: '4',
    email: 'recruiter@company.com',
    password: 'recruiter123',
    name: 'Michael Brown',
    role: 'recruiter',
    avatar: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?w=150&h=150&fit=crop&crop=face',
    profile: {
      company: 'Global Solutions Inc.',
      position: 'Senior Recruiter',
      location: 'Chicago, IL',
    }
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth data
    const storedUser = localStorage.getItem('alumni-connect-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('alumni-connect-user', JSON.stringify(userWithoutPassword));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (userData: Partial<User> & { password: string }): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      setIsLoading(false);
      return false;
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email!,
      name: userData.name!,
      role: userData.role!,
      avatar: userData.avatar,
      profile: userData.profile,
    };
    
    // Add to mock users (in real app, this would be an API call)
    mockUsers.push({ ...newUser, password: userData.password });
    
    setUser(newUser);
    localStorage.setItem('alumni-connect-user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('alumni-connect-user');
  };

  const updateProfile = (profileData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...profileData };
      setUser(updatedUser);
      localStorage.setItem('alumni-connect-user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateProfile,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};