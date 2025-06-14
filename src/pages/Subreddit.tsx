
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import PostCard from '../components/PostCard';
import Sidebar from '../components/Sidebar';

const Subreddit = () => {
  const { name } = useParams();
  const [sortBy, setSortBy] = useState<'hot' | 'new' | 'top' | 'rising'>('hot');

  const allPosts = {
    hot: [
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
    ],
    new: [
      {
        id: '15',
        title: 'Fresh research on climate change mitigation',
        content: 'New study shows promising results for carbon capture technology.',
        author: 'climateresearcher',
        subreddit: name || 'science',
        score: 45,
        comments: 12,
        timeAgo: '30m'
      },
      {
        id: '16',
        title: 'Question about peer review process',
        content: 'Can someone explain how the scientific peer review system works?',
        author: 'gradstudent',
        subreddit: name || 'science',
        score: 23,
        comments: 18,
        timeAgo: '1h'
      }
    ],
    top: [
      {
        id: '17',
        title: 'Nobel Prize winner announces retirement',
        content: 'Legendary physicist retires after 50 years of groundbreaking research.',
        author: 'sciencereporter',
        subreddit: name || 'science',
        score: 25678,
        comments: 1234,
        timeAgo: '1 week'
      },
      {
        id: '18',
        title: 'Breakthrough in fusion energy achieved',
        content: 'Scientists achieve net energy gain in nuclear fusion experiment.',
        author: 'fusionexpert',
        subreddit: name || 'science',
        score: 34567,
        comments: 2345,
        timeAgo: '3 days'
      }
    ],
    rising: [
      {
        id: '19',
        title: 'New species discovered in deep ocean',
        content: 'Marine biologists find previously unknown creatures in ocean depths.',
        author: 'oceanexplorer',
        subreddit: name || 'science',
        score: 456,
        comments: 67,
        timeAgo: '2h'
      },
      {
        id: '20',
        title: 'AI model predicts protein structures with 99% accuracy',
        content: 'Machine learning breakthrough could revolutionize drug discovery.',
        author: 'airesearcher',
        subreddit: name || 'science',
        score: 789,
        comments: 123,
        timeAgo: '1h'
      }
    ]
  };

  const currentPosts = allPosts[sortBy];

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
              <button 
                onClick={() => setSortBy('hot')}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  sortBy === 'hot' 
                    ? 'bg-orange-500 text-white' 
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
                }`}
              >
                Hot
              </button>
              <button 
                onClick={() => setSortBy('new')}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  sortBy === 'new' 
                    ? 'bg-orange-500 text-white' 
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
                }`}
              >
                New
              </button>
              <button 
                onClick={() => setSortBy('top')}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  sortBy === 'top' 
                    ? 'bg-orange-500 text-white' 
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
                }`}
              >
                Top
              </button>
              <button 
                onClick={() => setSortBy('rising')}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  sortBy === 'rising' 
                    ? 'bg-orange-500 text-white' 
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
                }`}
              >
                Rising
              </button>
            </div>

            {/* Posts */}
            <div className="space-y-4">
              {currentPosts.map(post => (
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
