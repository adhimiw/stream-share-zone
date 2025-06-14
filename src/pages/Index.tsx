import React, { useState } from 'react';
import Header from '../components/Header';
import PostCard from '../components/PostCard';
import Sidebar from '../components/Sidebar';

const Index = () => {
  const [sortBy, setSortBy] = useState<'hot' | 'new' | 'top' | 'rising'>('hot');

  const initialPosts = {
    hot: [
      {
        id: '1',
        title: 'Scientists discover new method to reverse aging in mice',
        content: 'Researchers at MIT have developed a groundbreaking technique that successfully reversed aging markers in laboratory mice. The study, published in Nature, shows promising results that could potentially be applied to human longevity research in the future.',
        author: 'sciencefan42',
        subreddit: 'science',
        score: 12847,
        comments: 892,
        timeAgo: '6h',
        imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=500&h=300&fit=crop'
      },
      {
        id: '2',
        title: 'My cat figured out how to open doors and now nothing is safe',
        content: 'I thought I was being clever by getting door handles instead of knobs. Turns out my cat is smarter than me. Send help.',
        author: 'catlover2023',
        subreddit: 'cats',
        score: 8965,
        comments: 456,
        timeAgo: '3h',
        imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&h=300&fit=crop'
      },
      {
        id: '3',
        title: 'The new Spider-Man movie is absolutely incredible',
        content: 'Just came back from the theater and wow. The action sequences, the storytelling, the character development - everything was perfect. Without spoiling anything, this might be the best superhero movie ever made.',
        author: 'moviebuff88',
        subreddit: 'movies',
        score: 15432,
        comments: 1203,
        timeAgo: '4h'
      }
    ],
    new: [
      {
        id: '6',
        title: 'Just started learning React, built my first component!',
        content: 'Super excited to share my first React component. It\'s just a simple button but it feels like a huge achievement!',
        author: 'newcoder123',
        subreddit: 'reactjs',
        score: 23,
        comments: 8,
        timeAgo: '12m'
      },
      {
        id: '7',
        title: 'Found this cool coffee shop in downtown',
        content: 'Amazing latte art and the vibes are perfect for working. Definitely going back tomorrow.',
        author: 'coffeeaddict',
        subreddit: 'coffee',
        score: 15,
        comments: 3,
        timeAgo: '25m'
      },
      {
        id: '8',
        title: 'Quick question about TypeScript generics',
        content: 'Can someone explain how to properly use generic constraints? The documentation is confusing me.',
        author: 'tslearner',
        subreddit: 'typescript',
        score: 7,
        comments: 12,
        timeAgo: '45m'
      }
    ],
    top: [
      {
        id: '9',
        title: 'Elon Musk announces Mars colony plans for 2030',
        content: 'SpaceX CEO reveals detailed timeline for establishing the first permanent human settlement on Mars.',
        author: 'spacenews',
        subreddit: 'space',
        score: 45678,
        comments: 2890,
        timeAgo: '2 days'
      },
      {
        id: '10',
        title: 'Cure for common cold discovered by researchers',
        content: 'Breakthrough medical research shows 99% effectiveness in clinical trials.',
        author: 'medicalnews',
        subreddit: 'medicine',
        score: 38945,
        comments: 1567,
        timeAgo: '1 day'
      },
      {
        id: '11',
        title: 'AI solves 50-year-old mathematical theorem',
        content: 'Machine learning algorithm provides proof for previously unsolved mathematical problem.',
        author: 'mathgeek',
        subreddit: 'mathematics',
        score: 32156,
        comments: 876,
        timeAgo: '3 days'
      }
    ],
    rising: [
      {
        id: '12',
        title: 'New cryptocurrency hits $100 in first hour',
        content: 'Unknown digital currency experiences unprecedented growth, investors scrambling.',
        author: 'cryptotrader',
        subreddit: 'cryptocurrency',
        score: 1234,
        comments: 345,
        timeAgo: '1h'
      },
      {
        id: '13',
        title: 'Local pizza place goes viral for unique toppings',
        content: 'This small town pizzeria is getting international attention for their creative combinations.',
        author: 'foodie2024',
        subreddit: 'food',
        score: 892,
        comments: 156,
        timeAgo: '2h'
      },
      {
        id: '14',
        title: 'Indie game developer releases surprise hit',
        content: 'Solo developer\'s passion project is taking Steam by storm with 50,000 downloads in 24 hours.',
        author: 'indiegamer',
        subreddit: 'gaming',
        score: 567,
        comments: 89,
        timeAgo: '3h'
      }
    ]
  };

  const [allPosts, setAllPosts] = useState(initialPosts);

  const handleAICreatePost = (newPost: any) => {
    setAllPosts(prev => ({
      ...prev,
      new: [newPost, ...prev.new],
      hot: [newPost, ...prev.hot]
    }));
  };

  const currentPosts = allPosts[sortBy];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          <Sidebar onCreatePost={handleAICreatePost} />
        </div>
      </div>
    </div>
  );
};

export default Index;
