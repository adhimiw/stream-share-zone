
import React, { useState } from 'react';
import { Bot, MessageCircle, PenTool } from 'lucide-react';
import { aiService } from '../services/aiService';
import { useAuth } from '../hooks/useAuth';

interface AIBotProps {
  onCreatePost?: (post: any) => void;
  onAddComment?: (postId: string, comment: any) => void;
  postId?: string;
  postTitle?: string;
  postContent?: string;
}

const AIBot: React.FC<AIBotProps> = ({ 
  onCreatePost, 
  onAddComment, 
  postId, 
  postTitle, 
  postContent 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleGenerateComment = async () => {
    if (!postId || !postTitle || !postContent) return;
    
    setIsGenerating(true);
    try {
      const response = await aiService.generateComment(postTitle, postContent);
      const newComment = {
        id: Date.now().toString(),
        author: response.author,
        content: response.content,
        score: Math.floor(Math.random() * 20) + 1,
        timeAgo: 'just now',
        isAI: true
      };
      onAddComment?.(postId, newComment);
    } catch (error) {
      console.error('Failed to generate comment:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGeneratePost = async () => {
    setIsGenerating(true);
    try {
      const postData = await aiService.generatePost();
      const newPost = {
        id: Date.now().toString(),
        title: postData.title,
        content: postData.content,
        author: 'RedditAI_Bot',
        subreddit: postData.subreddit,
        score: Math.floor(Math.random() * 100) + 50,
        comments: 0,
        timeAgo: 'just now',
        isAI: true
      };
      onCreatePost?.(newPost);
    } catch (error) {
      console.error('Failed to generate post:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-4 text-white">
      <div className="flex items-center space-x-2 mb-3">
        <Bot className="h-5 w-5" />
        <h3 className="font-semibold">Reddit AI Assistant</h3>
      </div>
      
      <p className="text-sm mb-4 opacity-90">
        I can help engage with posts and create interesting content!
      </p>
      
      <div className="space-y-2">
        {postId && (
          <button
            onClick={handleGenerateComment}
            disabled={isGenerating}
            className="w-full flex items-center justify-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors px-3 py-2 rounded-lg text-sm disabled:opacity-50"
          >
            <MessageCircle className="h-4 w-4" />
            <span>{isGenerating ? 'Generating...' : 'Comment on this post'}</span>
          </button>
        )}
        
        <button
          onClick={handleGeneratePost}
          disabled={isGenerating}
          className="w-full flex items-center justify-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors px-3 py-2 rounded-lg text-sm disabled:opacity-50"
        >
          <PenTool className="h-4 w-4" />
          <span>{isGenerating ? 'Creating...' : 'Create AI post'}</span>
        </button>
      </div>
    </div>
  );
};

export default AIBot;
