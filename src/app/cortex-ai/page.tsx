"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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
  Plus,
  MessageSquare,
  Trash2,
  Image as ImageIcon,
  X,
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { describeImage } from "@/lib/imageProcessor";

type Message = {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
  imageUrl?: string;
};

type ChatSession = {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: Date;
};

const SUGGESTED_PROMPTS = [
  "Explain the concept of Opportunity Cost",
  "Summarize the key themes in Macbeth",
  "How do I calculate the derivative of x^2?",
  "What are the basic principles of Object-Oriented Programming?",
];

const STORAGE_KEY = "cortexChatSessions";
const CURRENT_SESSION_KEY = "cortexCurrentSessionId";

export default function CortexAIPage() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize sessions
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSessions = localStorage.getItem(STORAGE_KEY);
      const storedCurrentId = localStorage.getItem(CURRENT_SESSION_KEY);

      if (storedSessions) {
        try {
          const parsed: ChatSession[] = JSON.parse(storedSessions);
          // Revive dates
          parsed.forEach(s => {
            s.updatedAt = new Date(s.updatedAt);
            s.messages.forEach(m => m.timestamp = new Date(m.timestamp));
          });
          setSessions(parsed);

          if (storedCurrentId && parsed.find(s => s.id === storedCurrentId)) {
            setCurrentSessionId(storedCurrentId);
          } else if (parsed.length > 0) {
            setCurrentSessionId(parsed[0].id);
          } else {
            createNewSession();
          }
        } catch (e) {
          console.error("Failed to parse sessions", e);
          createNewSession();
        }
      } else {
        createNewSession();
      }
    }
  }, []);

  // Persist sessions
  useEffect(() => {
    if (typeof window !== "undefined" && sessions.length > 0) {
      const toStore = sessions.map(s => ({
        ...s,
        updatedAt: s.updatedAt.toISOString(),
        messages: s.messages.map(m => ({ ...m, timestamp: m.timestamp.toISOString() }))
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
    }
  }, [sessions]);

  // Persist current session ID
  useEffect(() => {
    if (typeof window !== "undefined" && currentSessionId) {
      localStorage.setItem(CURRENT_SESSION_KEY, currentSessionId);
    }
  }, [currentSessionId]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [sessions, currentSessionId, isTyping, imagePreview]);

  const getCurrentSession = () => sessions.find(s => s.id === currentSessionId);

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [{
        id: "welcome",
        role: "ai",
        content: "Hello! I'm Cortex, your personal AI study assistant. How can I help you with your university coursework today?",
        timestamp: new Date()
      }],
      updatedAt: new Date()
    };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false); // Close sidebar on mobile when new chat starts
    }
  };

  const MOCK_USER_CONTEXT = {
    name: "Student",
    courses: [
      { name: "CS101: Intro to Computer Science", grade: "A-", progress: "Week 5" },
      { name: "ECON101: Microeconomics", grade: "B+", progress: "Week 4" },
      { name: "MATH101: Calculus I", grade: "B", progress: "Week 6" }
    ],
    recentTopics: ["Data Structures", "Supply and Demand", "Chain Rule"],
    weaknesses: ["Calculus Chain Rule", "Market Equilibrium"]
  };

  const generateAIResponse = useCallback((query: string, history: Message[]): string => {
    const lower = query.toLowerCase();
    const lastUserMessage = history.filter(m => m.role === "user").pop()?.content || "";
    const lastAiMessage = history.filter(m => m.role === "ai").pop()?.content || "";

    // 1. Handle Image Context
    // The content passed here might be "[Image Uploaded] <description>\n\n<user query>"
    if (query.includes("[Image Uploaded]")) {
      const [imgPart, textPart] = query.split("\n\n");
      const description = imgPart.replace("[Image Uploaded] ", "");
      const userQuery = textPart || "";

      if (userQuery.toLowerCase().includes("what is this") || userQuery.toLowerCase().includes("describe")) {
        return `Based on the image, ${description.charAt(0).toLowerCase() + description.slice(1)}`;
      }

      if (userQuery.toLowerCase().includes("explain") || userQuery.toLowerCase().includes("help")) {
        return `I see you've uploaded an image showing ${description.toLowerCase().replace("the image shows ", "")}. \n\nTo help you with this, could you specify which part you find most confusing?`;
      }

      return `I've analyzed the image. It appears to show ${description.toLowerCase().replace("the image shows ", "")}. How can I help you with it?`;
    }

    // 2. Handle User Progress & Context
    if (lower.includes("my progress") || lower.includes("how am i doing") || lower.includes("my grades")) {
      const grades = MOCK_USER_CONTEXT.courses.map(c => `${c.name}: ${c.grade}`).join(", ");
      return `You're currently enrolled in ${MOCK_USER_CONTEXT.courses.length} courses. Here's a quick look at your grades: ${grades}. Keep up the good work!`;
    }

    if (lower.includes("what should i study") || lower.includes("recommendation") || lower.includes("weakness")) {
      return `Based on your recent performance, I recommend reviewing: ${MOCK_USER_CONTEXT.weaknesses.join(" and ")}. specifically. Would you like me to generate a study plan for these topics?`;
    }

    // 3. Context Awareness (Previous Messages)
    if (lower.includes("explain that") || lower.includes("explain it") || lower.includes("what do you mean")) {
      return `Regarding "${lastAiMessage.slice(0, 50)}...": \n\nI can break this down further. What specific part is confusing?`;
    }

    if (lower.includes("simpler") || lower.includes("simplify")) {
      return `Here is a simpler explanation of what we were discussing:\n\n${lastAiMessage}`;
    }

    // 4. General Knowledge Fallbacks
    if (lower.includes("opportunity cost")) {
      return "Opportunity cost is the potential benefit you miss out on when choosing one alternative over another. In economics, it's a fundamental concept because resources are scarce.";
    }
    if (lower.includes("macbeth")) {
      return "Shakespeare's Macbeth explores themes of ambition, guilt, and the corrupting power of unchecked desire. Macbeth's ambition drives him to commit regicide.";
    }
    if (lower.includes("derivative")) {
      return "The derivative of x^2 is 2x. This is found using the power rule: d/dx(x^n) = nx^(n-1).";
    }
    if (lower.includes("oop") || lower.includes("object-oriented")) {
      return "The four pillars of OOP are: Encapsulation, Abstraction, Inheritance, and Polymorphism.";
    }

    return "That's an interesting question! As an AI study assistant, I can help you break down complex topics. Could you provide more specific details or context?";
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDeleteSession = () => {
    if (deleteId) {
      const newSessions = sessions.filter(s => s.id !== deleteId);
      setSessions(newSessions);

      if (currentSessionId === deleteId) {
        if (newSessions.length > 0) {
          setCurrentSessionId(newSessions[0].id);
        } else {
          createNewSession();
        }
      }
      setDeleteId(null);
    }
  };

  const handleSend = async () => {
    if ((!input.trim() && !uploadedImage) || !currentSessionId) return;

    let content = input;
    let imageUrl = undefined;

    if (uploadedImage) {
      setIsTyping(true);
      const description = await describeImage(uploadedImage);
      content = `[Image Uploaded] ${description}\n\n${input}`;
      imageUrl = imagePreview || undefined;
      removeImage();
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input || "Analyze this image",
      timestamp: new Date(),
      imageUrl: imageUrl
    };

    // Update session with user message
    setSessions(prev => prev.map(s => {
      if (s.id === currentSessionId) {
        return {
          ...s,
          messages: [...s.messages, userMessage],
          title: s.messages.length === 1 ? (input.slice(0, 30) || "Image Analysis") : s.title,
          updatedAt: new Date()
        };
      }
      return s;
    }));

    setInput("");
    setIsTyping(true);

    // Generate AI response
    setTimeout(() => {
      const currentSession = sessions.find(s => s.id === currentSessionId);
      const history = currentSession ? [...currentSession.messages, userMessage] : [userMessage];
      const aiContent = generateAIResponse(content, history);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: aiContent,
        timestamp: new Date(),
      };

      setSessions(prev => prev.map(s => {
        if (s.id === currentSessionId) {
          return {
            ...s,
            messages: [...s.messages, aiMessage],
            updatedAt: new Date()
          };
        }
        return s;
      }));
      setIsTyping(false);
    }, 1500);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <Button className="w-full justify-start gap-2" variant="secondary" onClick={createNewSession}>
          <Plus className="h-4 w-4" />
          New Chat
        </Button>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            History
          </div>
          {sessions.map((session) => (
            <div key={session.id} className="group relative w-full rounded-lg hover:bg-muted transition-colors">
              <button
                className={cn(
                  "w-full text-left p-3 pr-10 rounded-lg transition-colors",
                  currentSessionId === session.id ? "bg-primary/10 text-primary" : "hover:bg-muted"
                )}
                onClick={() => {
                  setCurrentSessionId(session.id);
                  if (window.innerWidth < 768) setIsSidebarOpen(false);
                }}
              >
                <div className="font-medium text-sm truncate flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 opacity-70" />
                  {session.title || "New Chat"}
                </div>
                <div className="text-xs text-muted-foreground truncate pl-6 mt-1 opacity-70">
                  {session.updatedAt.toLocaleDateString()}
                </div>
              </button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteId(session.id);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );

  const currentMessages = getCurrentSession()?.messages || [];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Chat?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this conversation.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteSession} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
                  <Menu className="h-5 w-5" />
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

          <Button variant="outline" size="sm" onClick={() => {
            setSessions(prev => prev.map(s => {
              if (s.id === currentSessionId) {
                return {
                  ...s,
                  messages: [s.messages[0]], // Keep only welcome message
                  updatedAt: new Date()
                };
              }
              return s;
            }));
          }}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset Chat
          </Button>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-hidden relative flex flex-col">
          <ScrollArea className="flex-1 p-4 md:p-8">
            <div className="max-w-3xl mx-auto space-y-6">
              {currentMessages.map((message) => (
                <div
                  key={message.id}
                  className={cn("flex gap-4", message.role === "user" ? "flex-row-reverse" : "")}
                >
                  <Avatar className={cn("h-8 w-8 mt-1", message.role === "ai" ? "bg-primary/10" : "bg-secondary")}>
                    {message.role === "ai" ? (
                      <AvatarImage src="/bot-avatar.png" />
                    ) : (
                      <AvatarImage src="/user-avatar.png" />
                    )}
                    <AvatarFallback>{message.role === "ai" ? <Bot className="h-4 w-4 text-primary" /> : <User className="h-4 w-4" />}</AvatarFallback>
                  </Avatar>
                  <div className={cn("flex flex-col gap-2 max-w-[80%]", message.role === "user" ? "items-end" : "items-start")}>
                    {message.imageUrl && (
                      <div className="rounded-xl overflow-hidden border border-white/10 shadow-sm max-w-sm">
                        <img src={message.imageUrl} alt="Uploaded content" className="w-full h-auto" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "rounded-2xl p-4 text-sm shadow-sm",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-none"
                          : "bg-card border rounded-tl-none"
                      )}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-4">
                  <Avatar className="h-8 w-8 mt-1 bg-primary/10">
                    <AvatarFallback>
                      <Bot className="h-4 w-4 text-primary" />
                    </AvatarFallback>
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
              {/* Image Preview */}
              {imagePreview && (
                <div className="mb-4 relative inline-block">
                  <div className="relative rounded-xl overflow-hidden border border-primary/20 shadow-lg w-32 h-32 group">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button variant="destructive" size="icon" className="h-8 w-8 rounded-full" onClick={removeImage}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {currentMessages.length === 1 && !imagePreview && (
                <div className="mb-4 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <Button
                      key={prompt}
                      variant="outline"
                      size="sm"
                      className="whitespace-nowrap rounded-full border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors"
                      onClick={() => setInput(prompt)}
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
                className="relative flex items-end gap-2"
              >
                <div className="relative flex-1">
                  <Input
                    placeholder="Ask Cortex anything..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="pr-12 h-12 rounded-full shadow-sm border-primary/20 focus-visible:ring-primary/20 pl-12"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute left-1 top-1 h-10 w-10 rounded-full text-muted-foreground hover:text-primary"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <ImageIcon className="h-5 w-5" />
                  </Button>
                </div>
                <Button
                  type="submit"
                  size="icon"
                  className="h-12 w-12 rounded-full shrink-0"
                  disabled={(!input.trim() && !uploadedImage) || isTyping}
                >
                  <Send className="h-5 w-5" />
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
