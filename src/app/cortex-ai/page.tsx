
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Plus,
  Send,
  Bot,
  User,
  ArrowLeft,
  PanelLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { chatHistory, chatMessages } from '@/lib/placeholder-data-chat';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';

interface Message {
  id: number;
  role: string;
  content: string;
  avatar?: string;
}

export default function CortexAiPage() {
  const router = useRouter();
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>(chatMessages);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isDesktop) {
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(false);
    }
  }, [isDesktop]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: messages.length + 1,
      role: 'user',
      content: inputValue,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI delay and response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        role: 'assistant',
        content: "I'm currently running in simulation mode. To get real AI responses, please connect me to an AI provider API. \n\nHowever, I can tell you that your input was: " + userMessage.content,
        avatar: '/avatars/cortex.png',
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex h-full bg-background overflow-hidden">
      {/* Chat History Sidebar */}
      <aside
        className={cn(
          'flex flex-col bg-[#1E193B] text-white p-4 transition-all duration-300 ease-in-out',
          isSidebarOpen ? 'w-80' : 'w-0 p-0'
        )}
      >
        {isSidebarOpen && (
          <div className='flex flex-col flex-1 overflow-hidden'>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Chat History</h2>
              <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex-1 space-y-2 overflow-y-auto">
              {chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  className="p-3 rounded-lg cursor-pointer bg-black/20"
                >
                  <h3 className="font-semibold truncate text-sm">{chat.title}</h3>
                  <p className="text-xs text-white/60 truncate">
                    {chat.preview}
                  </p>
                </div>
              ))}
            </div>
            <Button className="mt-4 w-full bg-primary/80 hover:bg-primary/90 shadow-[0_0_2rem_-0.5rem_hsl(var(--primary))] transition-shadow duration-300">
              <Plus className="mr-2" />
              New Chat
            </Button>
          </div>
        )}
      </aside>

      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
          <div className='flex items-center gap-2'>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Sidebar</span>
            </Button>
            <h1 className="text-lg font-semibold">Cortex-AI Assistant</h1>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex items-start gap-4',
                message.role === 'user' && 'justify-end'
              )}
            >
              {message.role === 'assistant' && (
                <Avatar className="h-9 w-9 border">
                  <AvatarImage src={`https://picsum.photos/seed/cortexai/100/100`} />
                  <AvatarFallback>
                    <Bot />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'max-w-2xl rounded-lg p-3',
                  message.role === 'assistant'
                    ? 'bg-[#1E193B] text-white'
                    : 'bg-card text-card-foreground'
                )}
              >
                <p className="font-bold text-sm mb-1">
                  {message.role === 'assistant' ? 'Cortex-AI' : 'You'}
                </p>
                <p className='text-sm whitespace-pre-wrap'>{message.content}</p>
              </div>
              {message.role === 'user' && (
                <Avatar className="h-9 w-9 border">
                  <AvatarImage src={`https://picsum.photos/seed/student/100/100`} />
                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-4">
              <Avatar className="h-9 w-9 border">
                <AvatarImage src={`https://picsum.photos/seed/cortexai/100/100`} />
                <AvatarFallback>
                  <Bot />
                </AvatarFallback>
              </Avatar>
              <div className="bg-[#1E193B] text-white max-w-2xl rounded-lg p-3">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t p-4 bg-background">
          <form onSubmit={handleSendMessage} className="relative">
            <Input
              placeholder="Ask Cortex anything..."
              className="pr-12 h-12 text-base bg-card"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9"
              disabled={!inputValue.trim() || isLoading}
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
