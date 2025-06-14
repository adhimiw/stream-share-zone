
import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { aiService } from '@/services/aiService';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIChatModal: React.FC<AIChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollViewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (scrollViewport) {
        scrollViewport.scrollTop = scrollViewport.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  useEffect(() => {
    // Add an initial greeting from the AI when the chat opens for the first time
    if (isOpen && messages.length === 0) {
      setMessages([{ id: Date.now().toString(), sender: 'ai', text: "Hello! I'm RedditAI_Bot. How can I help you today?" }]);
    }
  }, [isOpen]);


  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue.trim(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Prepare history for Gemini API
    const historyForAPI = messages
      .filter(msg => msg.sender === 'user' || msg.sender === 'ai') // ensure only user/model messages
      .map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model' as 'user' | 'model',
        parts: [{ text: msg.text }],
      }));
      
    try {
      const aiResponseText = await aiService.generateChatResponse(userMessage.text, historyForAPI);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponseText,
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: "Sorry, I couldn't get a response. Please try again.",
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] flex flex-col h-[70vh] max-h-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Bot className="mr-2 h-5 w-5 text-purple-500" /> Chat with RedditAI_Bot
          </DialogTitle>
          <DialogDescription>
            Ask me anything or discuss trending topics!
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="flex-grow border rounded-md p-4 mb-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start max-w-[75%] p-3 rounded-lg ${
                  msg.sender === 'user' 
                    ? 'bg-purple-500 text-white rounded-br-none' 
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}>
                  {msg.sender === 'ai' && <Bot className="mr-2 h-5 w-5 flex-shrink-0 text-purple-600" />}
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  {msg.sender === 'user' && <User className="ml-2 h-5 w-5 flex-shrink-0 text-purple-200" />}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start max-w-[75%] p-3 rounded-lg bg-gray-100 text-gray-800 rounded-bl-none">
                  <Bot className="mr-2 h-5 w-5 flex-shrink-0 text-purple-600" />
                  <Loader2 className="h-5 w-5 animate-spin text-purple-600" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <DialogFooter className="sm:justify-start">
          <div className="flex w-full items-center space-x-2">
            <Input
              type="text"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
              disabled={isLoading}
              className="flex-grow"
            />
            <Button type="button" onClick={handleSendMessage} disabled={isLoading || inputValue.trim() === ''} className="bg-purple-500 hover:bg-purple-600">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AIChatModal;
