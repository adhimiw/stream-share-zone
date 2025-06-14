
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import PostCard from '../components/PostCard';
import Sidebar from '../components/Sidebar';

const Post = () => {
  const { id } = useParams();

  // Mock post data - in a real app this would come from an API
  const post = {
    id: id || '1',
    title: 'Scientists discover new method to reverse aging in mice',
    content: 'Researchers at MIT have developed a groundbreaking technique that successfully reversed aging markers in laboratory mice. The study, published in Nature, shows promising results that could potentially be applied to human longevity research in the future. This breakthrough involves manipulating cellular mechanisms that control the aging process, specifically targeting mitochondrial function and DNA repair mechanisms.',
    author: 'sciencefan42',
    subreddit: 'science',
    score: 12847,
    comments: 892,
    timeAgo: '6h',
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=500&h=300&fit=crop'
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <PostCard post={post} />
          </div>

          {/* Sidebar */}
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Post;
