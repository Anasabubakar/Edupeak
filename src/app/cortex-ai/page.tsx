
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

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
}

export default function CortexAiPage() {
  const router = useRouter();
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  // Load sessions from LocalStorage on mount
  React.useEffect(() => {
    const savedSessions = localStorage.getItem('cortex_sessions');
    if (savedSessions) {
      try {
        const parsed = JSON.parse(savedSessions);
        setSessions(parsed);
        if (parsed.length > 0) {
          setCurrentSessionId(parsed[0].id);
        } else {
          createNewSession();
        }
      } catch (e) {
        console.error('Failed to parse sessions', e);
        createNewSession();
      }
    } else {
      createNewSession();
    }
  }, []);

  // Save sessions to LocalStorage whenever they change
  React.useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem('cortex_sessions', JSON.stringify(sessions));
    }
  }, [sessions]);

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      createdAt: Date.now(),
    };
    setSessions((prev) => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
    if (isDesktop === false) setIsSidebarOpen(false);
  };

  const currentSession = sessions.find((s) => s.id === currentSessionId);
  const messages = currentSession?.messages || [];

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
    if (!inputValue.trim() || isLoading || !currentSessionId) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: inputValue,
    };

    // Optimistic update
    setSessions((prev) =>
      prev.map((session) => {
        if (session.id === currentSessionId) {
          // Update title if it's the first message and title is default
          const newTitle =
            session.messages.length === 0 && session.title === 'New Chat'
              ? userMessage.content.slice(0, 30) + (userMessage.content.length > 30 ? '...' : '')
              : session.title;

          return {
            ...session,
            title: newTitle,
            messages: [...session.messages, userMessage],
          };
        }
        return session;
      })
    );

    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage.content }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      const aiResponse = {
        id: Date.now() + 1,
        role: 'assistant',
        content: data.response,
        avatar: '/avatars/cortex.png',
      };

      setSessions((prev) =>
        prev.map((session) =>
          session.id === currentSessionId
            ? { ...session, messages: [...session.messages, aiResponse] }
            : session
        )
      );
    } catch (error) {
      console.error('Error sending message:', error);
      const errorResponse = {
        id: Date.now() + 1,
        role: 'assistant',
        content: "I'm having trouble connecting to my brain right now. Please check if the API key is configured correctly.",
        avatar: '/avatars/cortex.png',
      };
      setSessions((prev) =>
        prev.map((session) =>
          session.id === currentSessionId
            ? { ...session, messages: [...session.messages, errorResponse] }
            : session
        )
      );
    } finally {
      setIsLoading(false);
    }
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
            </div>
            <div className="flex-1 space-y-2 overflow-y-auto">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  onClick={() => {
                    setCurrentSessionId(session.id);
                    if (!isDesktop) setIsSidebarOpen(false);
                  }}
                  className={cn(
                    "p-3 rounded-lg cursor-pointer transition-colors",
                    currentSessionId === session.id ? "bg-primary/40 border border-primary/50" : "bg-black/20 hover:bg-black/30"
                  )}
                >
                  <h3 className="font-semibold truncate text-sm">{session.title}</h3>
                  <p className="text-xs text-white/60 truncate">
                    {session.messages.length > 0 ? session.messages[session.messages.length - 1].content : 'No messages yet'}
                  </p>
                </div>
              ))}
            </div>
            <Button
              onClick={createNewSession}
              className="mt-4 w-full bg-primary/80 hover:bg-primary/90 shadow-[0_0_2rem_-0.5rem_hsl(var(--primary))] transition-shadow duration-300"
            >
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
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Go Back</span>
            </Button>
            <h1 className="text-lg font-semibold">Cortex-AI Assistant</h1>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground opacity-50">
              <Bot className="h-16 w-16 mb-4" />
              <p className="text-lg">Start a conversation with Cortex-AI</p>
            </div>
          ) : (
            messages.map((message) => (
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
            )))}
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
