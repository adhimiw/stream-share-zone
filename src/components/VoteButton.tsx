
import React, { useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface VoteButtonProps {
  initialScore: number;
  postId: string;
}

const VoteButton: React.FC<VoteButtonProps> = ({ initialScore, postId }) => {
  const [score, setScore] = useState(initialScore);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);

  const handleVote = (voteType: 'up' | 'down') => {
    if (userVote === voteType) {
      // Remove vote
      setUserVote(null);
      setScore(voteType === 'up' ? score - 1 : score + 1);
    } else if (userVote === null) {
      // Add vote
      setUserVote(voteType);
      setScore(voteType === 'up' ? score + 1 : score - 1);
    } else {
      // Switch vote
      setUserVote(voteType);
      setScore(voteType === 'up' ? score + 2 : score - 2);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-1">
      <button
        onClick={() => handleVote('up')}
        className={`p-1 rounded transition-colors ${
          userVote === 'up'
            ? 'text-orange-500 bg-orange-50'
            : 'text-gray-400 hover:text-orange-500 hover:bg-orange-50'
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
      
      <span className={`text-sm font-medium ${
        userVote === 'up' ? 'text-orange-500' : 
        userVote === 'down' ? 'text-blue-500' : 
        'text-gray-700'
      }`}>
        {score}
      </span>
      
      <button
        onClick={() => handleVote('down')}
        className={`p-1 rounded transition-colors ${
          userVote === 'down'
            ? 'text-blue-500 bg-blue-50'
            : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50'
        }`}
      >
        <ArrowDown className="h-5 w-5" />
      </button>
    </div>
  );
};

export default VoteButton;
