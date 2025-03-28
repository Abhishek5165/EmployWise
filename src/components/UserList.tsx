import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, ApiResponse } from '../types';
import { useAuth } from '../context/AuthContext';
import { Edit2, Trash2, Search, LogOut, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import toast from 'react-hot-toast';

export const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const { logout } = useAuth();

  const fetchUsers = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await axios.get<ApiResponse<User[]>>(
        `https://reqres.in/api/users?page=${page}`
      );
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      toast.error('Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    try {
      await axios.put(`https://reqres.in/api/users/${editingUser.id}`, editingUser);
      setUsers(users.map(user => 
        user.id === editingUser.id ? editingUser : user
      ));
      setEditingUser(null);
      toast.success('User updated successfully');
    } catch (error) {
      toast.error('Failed to update user');
    }
  };

  const filteredUsers = users.filter(user =>
    `${user.first_name} ${user.last_name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">User Management</h1>
            <img 
              src="https://cdn-icons-png.freepik.com/256/16327/16327810.png?ga=GA1.1.755608703.1743149018&semt=ais_hybrid" 
              alt="EmployWise Logo" 
              className="h-8 md:h-10 object-contain"
            />
          </div>
          <button
            onClick={logout}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm md:text-base"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>

        <div className="mb-6 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search users..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="h-24 bg-[#4F1C51]"></div>
                <div className="relative px-4 pb-4">
                  <div className="relative -mt-12 mb-3 flex justify-center">
                    <img
                      src={user.avatar}
                      alt={`${user.first_name} ${user.last_name}`}
                      className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900">
                      {user.first_name} {user.last_name}
                    </h3>
                    <p className="text-gray-600 text-sm"><span className='font-semibold text-black'>Email -</span> {user.email}</p>
                  </div>

                  <div className="flex justify-center space-x-3 my-4">
                    <a href="#" className="text-blue-500 hover:text-blue-600">
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-blue-400 hover:text-blue-500">
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-pink-500 hover:text-pink-600">
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-red-500 hover:text-red-600">
                      <Youtube className="w-5 h-5" />
                    </a>
                  </div>

                  <div className="flex justify-center space-x-2 mt-4">
                    <button
                      onClick={() => handleEdit(user)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm flex items-center"
                    >
                      <Edit2 className="w-4 h-4 mr-1" />
                      Edit 
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm flex items-center"
                    >
                      Delete
                    </button>
                  </div>

                  <div className="flex justify-center space-x-8 mt-4 pt-4 border-t">
                    <div className="text-center">
                      <div className="font-bold text-gray-900">60.4k</div>
                      <div className="text-gray-600 text-sm">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-gray-900">20k</div>
                      <div className="text-gray-600 text-sm">Following</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-gray-900">12.4k</div>
                      <div className="text-gray-600 text-sm">Posts</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 md:px-4 py-2 rounded-lg transition-colors text-sm md:text-base ${
                currentPage === page
                  ? 'bg-[#3D3BF3] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit User</h2>
              <button
                onClick={() => setEditingUser(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  value={editingUser.first_name}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, first_name: e.target.value })
                  }
                  className="border-2 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  value={editingUser.last_name}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, last_name: e.target.value })
                  }
                  className="border-2 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, email: e.target.value })
                  }
                  className="border-2 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-[#6A42C2] hover:bg-purple-600 rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};