import React, { useState } from 'react';
import { MessageCircle, Share, Award, Bookmark, FileText, Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import VoteButton from './VoteButton';
import Comments from './Comments';
import { aiService } from '@/services/aiService';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

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
  const [isSummarizing, setIsSummarizing] = useState(false);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const handleCommentsToggle = () => {
    if (!isAuthenticated) {
      onAuthRequired?.();
      return;
    }
    setShowComments(!showComments);
  };

  const handleSummarize = async () => {
    if (isSummarizing) return;
    setIsSummarizing(true);
    try {
      const summary = await aiService.generateSummary(post.title, post.content);
      toast({
        title: `Summary of "${post.title}"`,
        description: summary,
        duration: 9000,
      });
    } catch (error) {
      console.error("Error summarizing post:", error);
      toast({
        title: "Error",
        description: "Could not generate summary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex">
        <div className="flex-shrink-0 p-4 bg-gray-50 rounded-l-lg">
          <VoteButton 
            initialScore={post.score} 
            postId={post.id} 
            onAuthRequired={onAuthRequired}
          />
        </div>

        <div className="flex-1 p-4">
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <span className="font-medium text-gray-900">r/{post.subreddit}</span>
            <span className="mx-1">•</span>
            <span>Posted by u/{post.author}</span>
            <span className="mx-1">•</span>
            <span>{post.timeAgo}</span>
          </div>

          <h2 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
            {post.title}
          </h2>

          {post.content && (
            <p className="text-gray-700 mb-3 line-clamp-3">{post.content}</p>
          )}

          {post.imageUrl && (
            <div className="mb-3">
              <img
                src={post.imageUrl}
                alt="Post content"
                className="max-w-full h-auto rounded-lg"
              />
            </div>
          )}

          <div className="flex items-center space-x-4 text-gray-500">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCommentsToggle}
              className="flex items-center space-x-1 hover:text-gray-700 transition-colors px-2 py-1"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">{post.comments} Comments</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="flex items-center space-x-1 hover:text-gray-700 transition-colors px-2 py-1">
              <Share className="h-4 w-4" />
              <span className="text-sm">Share</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => !isAuthenticated && onAuthRequired?.()}
              className="flex items-center space-x-1 hover:text-gray-700 transition-colors px-2 py-1"
            >
              <Award className="h-4 w-4" />
              <span className="text-sm">Award</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => !isAuthenticated && onAuthRequired?.()}
              className="flex items-center space-x-1 hover:text-gray-700 transition-colors px-2 py-1"
            >
              <Bookmark className="h-4 w-4" />
              <span className="text-sm">Save</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleSummarize}
              disabled={isSummarizing}
              className="flex items-center space-x-1 hover:text-gray-700 transition-colors px-2 py-1"
              aria-label="Summarize post"
            >
              {isSummarizing ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
              <span className="text-sm">Summarize</span>
            </Button>
          </div>
        </div>
      </div>

      {showComments && (
        <div className="border-t border-gray-200">
          <Comments postId={post.id} />
        </div>
      )}
    </div>
  );
};

export default PostCard;
