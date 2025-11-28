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
  Trash2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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

  const deleteSession = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (sessions.length === 1) {
      // If deleting the last session, create a new one
      createNewSession();
      setSessions([]);
      localStorage.removeItem('cortex_sessions');
      return;
    }

    const newSessions = sessions.filter((s) => s.id !== sessionId);
    setSessions(newSessions);

    // If deleting the current session, switch to the first remaining one
    if (currentSessionId === sessionId) {
      setCurrentSessionId(newSessions[0].id);
    }
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
    <div className="flex h-full bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
      {/* Chat History Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 320 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="flex flex-col backdrop-blur-xl bg-[#1E193B]/95 border-r border-white/10 text-white overflow-hidden"
      >
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='flex flex-col flex-1 overflow-hidden p-4'
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">Chat History</h2>
              </div>
              <div className="flex-1 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                {sessions.map((session, index) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={cn(
                      "p-3 rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.02] group relative",
                      currentSessionId === session.id
                        ? "bg-primary/30 border border-primary/50 shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]"
                        : "bg-white/5 hover:bg-white/10 backdrop-blur-sm"
                    )}
                  >
                    <div onClick={() => {
                      setCurrentSessionId(session.id);
                      if (!isDesktop) setIsSidebarOpen(false);
                    }}>
                      <h3 className="font-semibold truncate text-sm pr-8">{session.title}</h3>
                      <p className="text-xs text-white/60 truncate">
                        {session.messages.length > 0 ? session.messages[session.messages.length - 1].content : 'No messages yet'}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => deleteSession(session.id, e)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20 hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </div>
              <Button
                onClick={createNewSession}
                className="mt-4 w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-[0_0_2rem_-0.5rem_hsl(var(--primary))] hover:shadow-[0_0_3rem_-0.5rem_hsl(var(--primary))] transition-all duration-300 border border-primary/30"
              >
                <Plus className="mr-2" />
                New Chat
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.aside>

      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border/50 backdrop-blur-xl bg-background/80 px-4 md:px-6">
          <div className='flex items-center gap-2'>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-primary/10 transition-colors"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Sidebar</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-primary/10 transition-colors"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Go Back</span>
            </Button>
            <h1 className="text-lg font-semibold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">Cortex-AI Assistant</h1>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center h-full text-center text-muted-foreground"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
                <Bot className="h-20 w-20 mb-4 relative text-primary" />
              </div>
              <p className="text-lg font-medium">Start a conversation with Cortex-AI</p>
              <p className="text-sm text-muted-foreground/60 mt-2">Ask me anything about your studies!</p>
            </motion.div>
          ) : (
            <AnimatePresence initial={false}>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className={cn(
                    'flex items-start gap-4',
                    message.role === 'user' && 'justify-end'
                  )}
                >
                  {message.role === 'assistant' && (
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
                      <Avatar className="h-9 w-9 border-2 border-primary/30 relative shadow-lg">
                        <AvatarImage src={`https://picsum.photos/seed/cortexai/100/100`} />
                        <AvatarFallback className="bg-primary/20">
                          <Bot className="text-primary" />
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  )}
                  <div
                    className={cn(
                      'max-w-2xl rounded-2xl p-4 backdrop-blur-sm transition-all duration-200 hover:shadow-lg',
                      message.role === 'assistant'
                        ? 'bg-gradient-to-br from-[#1E193B] to-[#2A2050] text-white border border-primary/20 shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)]'
                        : 'bg-gradient-to-br from-card to-card/80 text-card-foreground border border-border/50'
                    )}
                  >
                    <p className="font-bold text-sm mb-2 opacity-80">
                      {message.role === 'assistant' ? 'Cortex-AI' : 'You'}
                    </p>
                    <div className={cn(
                      'prose prose-sm max-w-none',
                      message.role === 'assistant' ? 'prose-invert' : ''
                    )}>
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                  {message.role === 'user' && (
                    <Avatar className="h-9 w-9 border-2 border-primary/30 shadow-lg">
                      <AvatarImage src={`https://picsum.photos/seed/student/100/100`} />
                      <AvatarFallback className="bg-primary/20">
                        <User className="text-primary" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          )}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-4"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full animate-pulse" />
                <Avatar className="h-9 w-9 border-2 border-primary/30 relative">
                  <AvatarImage src={`https://picsum.photos/seed/cortexai/100/100`} />
                  <AvatarFallback className="bg-primary/20">
                    <Bot className="text-primary" />
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="bg-gradient-to-br from-[#1E193B] to-[#2A2050] text-white max-w-2xl rounded-2xl p-4 border border-primary/20 shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)]">
                <div className="flex space-x-2">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                    className="w-2 h-2 bg-primary rounded-full"
                  />
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                    className="w-2 h-2 bg-primary rounded-full"
                  />
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                    className="w-2 h-2 bg-primary rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-border/50 p-4 backdrop-blur-xl bg-background/80">
          <form onSubmit={handleSendMessage} className="relative max-w-4xl mx-auto">
            <Input
              placeholder="Ask Cortex anything..."
              className={cn(
                "pr-12 h-14 text-base rounded-2xl border-2 transition-all duration-200",
                "bg-card/50 backdrop-blur-sm",
                "focus:border-primary focus:shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)]",
                "placeholder:text-muted-foreground/50"
              )}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-xl",
                "bg-gradient-to-r from-primary to-primary/80",
                "hover:from-primary/90 hover:to-primary/70",
                "shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]",
                "hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.4)]",
                "transition-all duration-200",
                "disabled:opacity-50 disabled:shadow-none"
              )}
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
