"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Send,
  Sparkles,
  User,
  Bot,
  RefreshCw,
  ArrowLeft,
  PanelLeft,
  History,
  Plus,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

type Message = {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
};

type ChatSession = {
  id: string;
  title: string;
  date: Date;
  preview: string;
};

const SUGGESTED_PROMPTS = [
  "Explain the concept of Opportunity Cost",
  "Summarize the key themes in Macbeth",
  "How do I calculate the derivative of x^2?",
  "What are the basic principles of Object-Oriented Programming?",
];

const MOCK_HISTORY: ChatSession[] = [
  { id: "1", title: "Calculus Revision", date: new Date(Date.now() - 86400000), preview: "What is the chain rule?" },
  { id: "2", title: "Hamlet Analysis", date: new Date(Date.now() - 172800000), preview: "Themes of madness in Hamlet" },
  { id: "3", title: "Economics Basics", date: new Date(Date.now() - 259200000), preview: "Supply and demand curves" },
];

export default function CortexAIPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      content: "Hello! I'm Cortex, your personal AI study assistant. How can I help you with your university coursework today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: generateAIResponse(userMessage.content),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes("opportunity cost")) {
      return "Opportunity cost is the potential benefit that you miss out on when choosing one alternative over another. In economics, it's a fundamental concept because resources are scarce. For example, if you spend time studying for Economics, the opportunity cost is the time you could have spent studying for Computer Science or sleeping.";
    }
    if (lowerQuery.includes("macbeth")) {
      return "Shakespeare's Macbeth explores themes of ambition, guilt, and the corrupting power of unchecked desire. Macbeth's ambition drives him to commit regicide, but his guilt manifests in hallucinations and paranoia. The play also examines fate vs. free will.";
    }
    if (lowerQuery.includes("derivative")) {
      return "The derivative of x^2 is 2x. This is found using the power rule: d/dx(x^n) = nx^(n-1). So for x^2, n=2, giving 2x^(2-1) = 2x.";
    }
    if (lowerQuery.includes("oop") || lowerQuery.includes("object-oriented")) {
      return "The four pillars of OOP are: 1. Encapsulation (bundling data and methods), 2. Abstraction (hiding complex details), 3. Inheritance (creating new classes from existing ones), and 4. Polymorphism (objects taking on multiple forms).";
    }
    return "That's an interesting question! As an AI study assistant, I can help you break down complex topics. Could you provide more specific details or context from your course material so I can give you the best explanation?";
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <Button className="w-full justify-start gap-2" variant="secondary">
          <Plus className="h-4 w-4" />
          New Chat
        </Button>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Recent</div>
          {MOCK_HISTORY.map((session) => (
            <button
              key={session.id}
              className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors group"
            >
              <div className="font-medium text-sm truncate flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                {session.title}
              </div>
              <div className="text-xs text-muted-foreground truncate pl-6 mt-1">
                {session.preview}
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <div
        className={cn(
          "border-r bg-card hidden md:flex flex-col transition-all duration-300 ease-in-out",
          isSidebarOpen ? "w-80" : "w-0 border-none overflow-hidden"
        )}
      >
        <div className="p-4 border-b flex items-center gap-2 font-headline font-bold text-xl text-primary">
          <Sparkles className="h-6 w-6" />
          Cortex AI
        </div>
        <SidebarContent />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 border-b flex items-center justify-between px-4 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <PanelLeft className="h-5 w-5" />
            </Button>

            {/* Mobile Sidebar Trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <PanelLeft className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-80">
                <div className="p-4 border-b flex items-center gap-2 font-headline font-bold text-xl text-primary">
                  <Sparkles className="h-6 w-6" />
                  Cortex AI
                </div>
                <SidebarContent />
              </SheetContent>
            </Sheet>

            <Button variant="ghost" size="sm" asChild className="gap-2">
              <Link href="/student">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>

          <Button variant="outline" size="sm" onClick={() => setMessages([messages[0]])}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset Chat
          </Button>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-hidden relative flex flex-col">
          <ScrollArea className="flex-1 p-4 md:p-8">
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-4",
                    message.role === "user" ? "flex-row-reverse" : ""
                  )}
                >
                  <Avatar className={cn("h-8 w-8 mt-1", message.role === "ai" ? "bg-primary/10" : "bg-secondary")}>
                    {message.role === "ai" ? (
                      <AvatarImage src="/bot-avatar.png" />
                    ) : (
                      <AvatarImage src="/user-avatar.png" />
                    )}
                    <AvatarFallback>{message.role === "ai" ? <Bot className="h-4 w-4 text-primary" /> : <User className="h-4 w-4" />}</AvatarFallback>
                  </Avatar>
                  <div
                    className={cn(
                      "rounded-2xl p-4 text-sm max-w-[80%] shadow-sm",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-none"
                        : "bg-card border rounded-tl-none"
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-4">
                  <Avatar className="h-8 w-8 mt-1 bg-primary/10">
                    <AvatarFallback><Bot className="h-4 w-4 text-primary" /></AvatarFallback>
                  </Avatar>
                  <div className="bg-card border rounded-2xl rounded-tl-none p-4 text-sm flex items-center gap-2 shadow-sm">
                    <span className="animate-bounce">●</span>
                    <span className="animate-bounce delay-100">●</span>
                    <span className="animate-bounce delay-200">●</span>
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 border-t bg-background/80 backdrop-blur-md">
            <div className="max-w-3xl mx-auto">
              {messages.length === 1 && (
                <div className="mb-4 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <Button
                      key={prompt}
                      variant="outline"
                      size="sm"
                      className="whitespace-nowrap rounded-full border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors"
                      onClick={() => {
                        setInput(prompt);
                      }}
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>
              )}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="relative"
              >
                <Input
                  placeholder="Ask Cortex anything about your courses..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="pr-12 h-12 rounded-full shadow-sm border-primary/20 focus-visible:ring-primary/20"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-1 top-1 h-10 w-10 rounded-full"
                  disabled={!input.trim() || isTyping}
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </form>
              <div className="text-center mt-2">
                <p className="text-[10px] text-muted-foreground">
                  Cortex AI can make mistakes. Consider checking important information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
