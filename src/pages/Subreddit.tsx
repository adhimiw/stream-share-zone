
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import PostCard from '../components/PostCard';
import Sidebar from '../components/Sidebar';

const Subreddit = () => {
  const { name } = useParams();

  // Mock posts for the subreddit
  const posts = [
    {
      id: '1',
      title: 'Scientists discover new method to reverse aging in mice',
      content: 'Researchers at MIT have developed a groundbreaking technique that successfully reversed aging markers in laboratory mice.',
      author: 'sciencefan42',
      subreddit: name || 'science',
      score: 12847,
      comments: 892,
      timeAgo: '6h',
      imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=500&h=300&fit=crop'
    },
    {
      id: '2',
      title: 'New quantum computing breakthrough announced',
      content: 'IBM researchers have achieved a significant milestone in quantum error correction.',
      author: 'quantumguru',
      subreddit: name || 'science',
      score: 8456,
      comments: 234,
      timeAgo: '4h'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Subreddit Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">r/{name}</h1>
              <p className="text-gray-600 mt-1">Welcome to r/{name}</p>
              <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                <span>1.2M members</span>
                <span>•</span>
                <span>15.3K online</span>
              </div>
            </div>
            <button className="px-6 py-2 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-colors">
              Join
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Sort Options */}
            <div className="flex items-center space-x-4 mb-6">
              <button className="px-4 py-2 bg-orange-500 text-white rounded-full font-medium">
                Hot
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-full transition-colors">
                New
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-full transition-colors">
                Top
              </button>
            </div>

            {/* Posts */}
            <div className="space-y-4">
              {posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Subreddit;
