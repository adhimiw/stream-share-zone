
import React from 'react';
import { TrendingUp, Users, Star, Calendar } from 'lucide-react';

const Sidebar = () => {
  const trendingCommunities = [
    { name: 'r/technology', members: '2.1M', icon: '💻' },
    { name: 'r/gaming', members: '1.8M', icon: '🎮' },
    { name: 'r/worldnews', members: '1.5M', icon: '🌍' },
    { name: 'r/science', members: '1.2M', icon: '🔬' },
    { name: 'r/movies', members: '900K', icon: '🎬' },
  ];

  const trendingPosts = [
    'Amazing breakthrough in quantum computing',
    'New species discovered in the Amazon',
    'SpaceX launches another successful mission',
    'Revolutionary AI model announced',
    'Climate change solution shows promise',
  ];

  return (
    <div className="w-80 space-y-6">
      {/* Trending Communities */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="h-5 w-5 text-orange-500" />
          <h3 className="font-semibold text-gray-900">Trending Communities</h3>
        </div>
        <div className="space-y-3">
          {trendingCommunities.map((community, index) => (
            <div key={community.name} className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg cursor-pointer">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                <span className="text-2xl">{community.icon}</span>
                <div>
                  <p className="font-medium text-gray-900">{community.name}</p>
                  <p className="text-sm text-gray-500">{community.members} members</p>
                </div>
              </div>
              <button className="px-3 py-1 text-sm bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors">
                Join
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Posts */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Star className="h-5 w-5 text-orange-500" />
          <h3 className="font-semibold text-gray-900">Trending Today</h3>
        </div>
        <div className="space-y-3">
          {trendingPosts.map((post, index) => (
            <div key={index} className="flex items-start space-x-3 hover:bg-gray-50 p-2 rounded-lg cursor-pointer">
              <span className="text-sm font-medium text-gray-500 mt-1">#{index + 1}</span>
              <p className="text-sm text-gray-700 line-clamp-2">{post}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reddit Premium Ad */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-4 text-white">
        <div className="flex items-center space-x-2 mb-2">
          <Star className="h-5 w-5" />
          <h3 className="font-semibold">Reddit Premium</h3>
        </div>
        <p className="text-sm mb-3 opacity-90">
          Experience Reddit without ads and unlock exclusive features.
        </p>
        <button className="w-full bg-white text-orange-500 font-medium py-2 rounded-lg hover:bg-gray-100 transition-colors">
          Try Premium
        </button>
      </div>

      {/* Community Stats */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Users className="h-5 w-5 text-orange-500" />
          <h3 className="font-semibold text-gray-900">Today's Stats</h3>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Active Users</span>
            <span className="font-medium">1.2M</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Posts Today</span>
            <span className="font-medium">45.3K</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Comments Today</span>
            <span className="font-medium">234.7K</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
