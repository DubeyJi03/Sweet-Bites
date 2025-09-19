import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { HiOutlineUser, HiOutlinePhone, HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';

const AccountDetails = () => {
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      // Validate password fields if changing password
      if (showPasswordChange) {
        if (!formData.currentPassword) {
          setError('Current password is required');
          setLoading(false);
          return;
        }
        if (formData.newPassword !== formData.confirmPassword) {
          setError('New passwords do not match');
          setLoading(false);
          return;
        }
        if (formData.newPassword.length < 6) {
          setError('New password must be at least 6 characters long');
          setLoading(false);
          return;
        }
      }

      const token = localStorage.getItem('userToken');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      const updateData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      };

      if (showPasswordChange && formData.newPassword) {
        updateData.password = formData.newPassword;
      }

      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/profile`,
        updateData,
        config
      );

      // Update local storage with new user info
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      
      setMessage('Profile updated successfully!');
      setShowPasswordChange(false);
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update profile');
    }

    setLoading(false);
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        setLoading(true);
        const token = localStorage.getItem('userToken');
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };

        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/profile`,
          config
        );

        // Clear local storage and redirect to home
        localStorage.removeItem('userInfo');
        localStorage.removeItem('userToken');
        window.location.href = '/';
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to delete account');
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-amber-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Account Details</h2>
      
      {message && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700">{message}</p>
        </div>
      )}
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <HiOutlineUser className="inline w-4 h-4 mr-1" />
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <HiOutlineMail className="inline w-4 h-4 mr-1" />
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
        </div>

        {/* Phone Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <HiOutlinePhone className="inline w-4 h-4 mr-1" />
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Enter your phone number"
          />
        </div>

        {/* Password Change Section */}
        <div className="border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800">
              <HiOutlineLockClosed className="inline w-5 h-5 mr-1" />
              Change Password
            </h3>
            <button
              type="button"
              onClick={() => setShowPasswordChange(!showPasswordChange)}
              className="text-amber-600 hover:text-amber-700 text-sm font-medium"
            >
              {showPasswordChange ? 'Cancel' : 'Change Password'}
            </button>
          </div>

          {showPasswordChange && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required={showPasswordChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required={showPasswordChange}
                  minLength="6"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required={showPasswordChange}
                  minLength="6"
                />
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
          <button
            type="submit"
            disabled={loading}
            className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>

          <button
            type="button"
            onClick={handleDeleteAccount}
            disabled={loading}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            Delete Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountDetails;
