
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle } from 'lucide-react';
import AIChatModal from './AIChatModal';

const AIChatButton: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 p-0 shadow-lg bg-purple-600 hover:bg-purple-700 text-white"
        aria-label="Open AI Chat"
      >
        <MessageCircle size={24} />
      </Button>
      <AIChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default AIChatButton;
