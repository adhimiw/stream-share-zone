
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import PostCard from '../components/PostCard';
import { Calendar, Award, MessageCircle } from 'lucide-react';

const User = () => {
  const { username } = useParams();

  // Mock user data and posts
  const userPosts = [
    {
      id: '1',
      title: 'My experience learning React in 2024',
      content: 'After 6 months of learning React, here are my thoughts and tips for beginners.',
      author: username || 'user123',
      subreddit: 'reactjs',
      score: 456,
      comments: 89,
      timeAgo: '2d'
    },
    {
      id: '2',
      title: 'Question about useEffect cleanup',
      content: 'Can someone explain when exactly the cleanup function runs?',
      author: username || 'user123',
      subreddit: 'reactjs',
      score: 123,
      comments: 34,
      timeAgo: '5d'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Profile Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-6">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {username?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">u/{username}</h1>
              <div className="flex items-center space-x-6 mt-3 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined 2 years ago</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Award className="h-4 w-4" />
                  <span>1,234 karma</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageCircle className="h-4 w-4" />
                  <span>156 posts</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Tab Navigation */}
            <div className="flex items-center space-x-6 mb-6 border-b border-gray-200">
              <button className="pb-3 border-b-2 border-orange-500 text-orange-500 font-medium">
                Posts
              </button>
              <button className="pb-3 text-gray-600 hover:text-gray-800">
                Comments
              </button>
              <button className="pb-3 text-gray-600 hover:text-gray-800">
                Saved
              </button>
            </div>

            {/* User Posts */}
            <div className="space-y-4">
              {userPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          {/* User Stats Sidebar */}
          <div className="w-80">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-4">User Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Post Karma</span>
                  <span className="font-medium">856</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Comment Karma</span>
                  <span className="font-medium">378</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Posts</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Comments</span>
                  <span className="font-medium">89</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
