
import React, { useState } from 'react';
import { ArrowUp, ArrowDown, MessageCircle, Award } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  content: string;
  score: number;
  timeAgo: string;
  replies?: Comment[];
}

interface CommentsProps {
  postId: string;
}

const Comments: React.FC<CommentsProps> = ({ postId }) => {
  const [comments] = useState<Comment[]>([
    {
      id: '1',
      author: 'user123',
      content: 'This is a great post! Thanks for sharing.',
      score: 42,
      timeAgo: '2h',
      replies: [
        {
          id: '2',
          author: 'replier456',
          content: 'I completely agree with this perspective.',
          score: 15,
          timeAgo: '1h',
        }
      ]
    },
    {
      id: '3',
      author: 'commenter789',
      content: 'Has anyone else experienced something similar? I\'d love to hear more thoughts on this topic.',
      score: 28,
      timeAgo: '3h',
    }
  ]);

  const CommentItem: React.FC<{ comment: Comment; depth?: number }> = ({ comment, depth = 0 }) => {
    const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
    const [showReply, setShowReply] = useState(false);

    return (
      <div className={`${depth > 0 ? 'ml-8 border-l-2 border-gray-200 pl-4' : ''}`}>
        <div className="py-3">
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <span className="font-medium text-gray-900">{comment.author}</span>
            <span className="mx-2">•</span>
            <span>{comment.timeAgo}</span>
          </div>
          
          <p className="text-gray-800 mb-3">{comment.content}</p>
          
          <div className="flex items-center space-x-4 text-gray-500">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setUserVote(userVote === 'up' ? null : 'up')}
                className={`p-1 rounded transition-colors ${
                  userVote === 'up' ? 'text-orange-500' : 'hover:text-orange-500'
                }`}
              >
                <ArrowUp className="h-4 w-4" />
              </button>
              <span className="text-sm font-medium">{comment.score}</span>
              <button
                onClick={() => setUserVote(userVote === 'down' ? null : 'down')}
                className={`p-1 rounded transition-colors ${
                  userVote === 'down' ? 'text-blue-500' : 'hover:text-blue-500'
                }`}
              >
                <ArrowDown className="h-4 w-4" />
              </button>
            </div>
            
            <button
              onClick={() => setShowReply(!showReply)}
              className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">Reply</span>
            </button>
            
            <button className="flex items-center space-x-1 hover:text-gray-700 transition-colors">
              <Award className="h-4 w-4" />
              <span className="text-sm">Award</span>
            </button>
          </div>

          {showReply && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
              <textarea
                placeholder="What are your thoughts?"
                className="w-full p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                rows={3}
              />
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  onClick={() => setShowReply(false)}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button className="px-3 py-1 text-sm bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors">
                  Reply
                </button>
              </div>
            </div>
          )}
        </div>
        
        {comment.replies && comment.replies.map(reply => (
          <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
        ))}
      </div>
    );
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <textarea
          placeholder="What are your thoughts?"
          className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
          rows={4}
        />
        <div className="flex justify-end mt-2">
          <button className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors">
            Comment
          </button>
        </div>
      </div>
      
      <div className="space-y-1">
        {comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
