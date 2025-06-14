
import React from 'react';
import Header from '../components/Header';
import PostCard from '../components/PostCard';
import Sidebar from '../components/Sidebar';

const Index = () => {
  const posts = [
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
    },
    {
      id: '4',
      title: 'I built a PC entirely from parts I found at garage sales',
      content: 'Total cost: $127. It runs Cyberpunk 2077 on medium settings. Sometimes the best builds come from the most unexpected places. Here\'s how I did it...',
      author: 'budgetbuilder',
      subreddit: 'pcmasterrace',
      score: 9876,
      comments: 534,
      timeAgo: '8h',
      imageUrl: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=500&h=300&fit=crop'
    },
    {
      id: '5',
      title: 'TIL that octopuses have three hearts and blue blood',
      content: 'Two hearts pump blood to the gills, while the third pumps blood to the rest of the body. Their blood is blue because it uses copper-based hemocyanin instead of iron-based hemoglobin to carry oxygen.',
      author: 'oceanfacts',
      subreddit: 'todayilearned',
      score: 7234,
      comments: 312,
      timeAgo: '5h'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              <button className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-full transition-colors">
                Rising
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

export default Index;
