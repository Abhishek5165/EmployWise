import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LoginCredentials } from '../types';
import { User, Lock } from 'lucide-react';

export const LoginForm: React.FC = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(credentials);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-purple-400 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl overflow-hidden relative">
        {/* Diagonal overlay */}
        <div 
          className="absolute top-0 right-0 w-1/2 h-full bg-purple-600 transform -skew-x-12 translate-x-32"
          style={{ zIndex: 0 }}
        ></div>
        <div className='flex items-center justify-center'>
        <h1 className='text-center text-3xl font-semibold mt-7'>Welcome back </h1>
        <img src="https://cdn-icons-png.freepik.com/256/10948/10948900.png?ga=GA1.1.755608703.1743149018&semt=ais_hybrid" 
        alt="EmployWise Logo" 
        className="h-8 md:h-10 object-contain mt-7 ml-5"/>
        </div>
        
        <div className="relative z-10 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-purple-600" />
              </div>
              <input
                type="email"
                required
                placeholder="User name / Email"
                className="w-full pl-10 pr-4 py-3 border-b border-gray-300 bg-transparent focus:outline-none focus:border-purple-600 text-gray-900"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-purple-600" />
              </div>
              <input
                type="password"
                required
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 border-b border-gray-300 bg-transparent focus:outline-none focus:border-purple-600 text-gray-900"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white text-purple-600 py-3 px-4 rounded-full border-2 border-purple-600 hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 transition-colors flex items-center justify-between group"
              >
                <span className="font-semibold">LOGIN NOW</span>
                <span className="transform group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </button>
            </div>
          </form>

          <div className="mt-12 text-center">
            <p className="text-sm text-gray-600 mb-4">log in via</p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-white bg-purple-600 p-2 rounded-full hover:bg-purple-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 6.016 4.432 10.984 10.206 11.852V15.18H7.237v-3.154h2.969V9.927c0-3.475 1.693-5 4.581-5 1.383 0 2.115.103 2.461.149v2.753h-1.97c-1.226 0-1.654 1.163-1.654 2.473v1.724h3.593l-.487 3.154h-3.106v8.697C19.481 23.083 24 18.075 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="#" className="text-white bg-purple-600 p-2 rounded-full hover:bg-purple-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"/>
                </svg>
              </a>
              <a href="#" className="text-white bg-purple-600 p-2 rounded-full hover:bg-purple-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.819-.255.819-.57 0-.28-.01-1.022-.015-2.005-3.338.724-4.042-1.61-4.042-1.61-.546-1.386-1.333-1.755-1.333-1.755-1.087-.744.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};