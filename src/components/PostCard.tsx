
import React, { useState } from 'react';
import { MessageCircle, Share, Award, Bookmark } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import VoteButton from './VoteButton';
import Comments from './Comments';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  subreddit: string;
  score: number;
  comments: number;
  timeAgo: string;
  imageUrl?: string;
}

interface PostCardProps {
  post: Post;
  onAuthRequired?: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onAuthRequired }) => {
  const [showComments, setShowComments] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleCommentsToggle = () => {
    if (!isAuthenticated) {
      onAuthRequired?.();
      return;
    }
    setShowComments(!showComments);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex">
        {/* Vote Section */}
        <div className="flex-shrink-0 p-4 bg-gray-50 rounded-l-lg">
          <VoteButton 
            initialScore={post.score} 
            postId={post.id} 
            onAuthRequired={onAuthRequired}
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 p-4">
          {/* Post Header */}
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <span className="font-medium text-gray-900">r/{post.subreddit}</span>
            <span className="mx-1">•</span>
            <span>Posted by u/{post.author}</span>
            <span className="mx-1">•</span>
            <span>{post.timeAgo}</span>
          </div>

          {/* Post Title */}
          <h2 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
            {post.title}
          </h2>

          {/* Post Content */}
          {post.content && (
            <p className="text-gray-700 mb-3 line-clamp-3">{post.content}</p>
          )}

          {/* Post Image */}
          {post.imageUrl && (
            <div className="mb-3">
              <img
                src={post.imageUrl}
                alt="Post content"
                className="max-w-full h-auto rounded-lg"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 text-gray-500">
            <button
              onClick={handleCommentsToggle}
              className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">{post.comments} Comments</span>
            </button>
            
            <button className="flex items-center space-x-1 hover:text-gray-700 transition-colors">
              <Share className="h-4 w-4" />
              <span className="text-sm">Share</span>
            </button>
            
            <button 
              onClick={() => !isAuthenticated && onAuthRequired?.()}
              className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
            >
              <Award className="h-4 w-4" />
              <span className="text-sm">Award</span>
            </button>
            
            <button 
              onClick={() => !isAuthenticated && onAuthRequired?.()}
              className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
            >
              <Bookmark className="h-4 w-4" />
              <span className="text-sm">Save</span>
            </button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-gray-200">
          <Comments postId={post.id} />
        </div>
      )}
    </div>
  );
};

export default PostCard;
