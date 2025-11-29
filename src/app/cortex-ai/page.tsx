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
  X
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
  date: Date;
  preview: string;
};

const SUGGESTED_PROMPTS = [
  "Explain the concept of Opportunity Cost",
  "Summarize the key themes in Macbeth",
  "How do I calculate the derivative of x^2?",
  "What are the basic principles of Object-Oriented Programming?",
];

const STORAGE_KEY = "cortexChatHistory";

export default function CortexAIPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const lastAIResponse = useRef<string>("");

  // Load persisted messages on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed: Message[] = JSON.parse(stored);
          parsed.forEach((m) => (m.timestamp = new Date(m.timestamp)));
          setMessages(parsed);
          const lastAI = parsed.filter((m) => m.role === "ai").pop();
          if (lastAI) lastAIResponse.current = lastAI.content;
        } catch {
          // ignore parse errors
        }
      } else {
        const welcome: Message = {
          id: "1",
          role: "ai",
          content:
            "Hello! I'm Cortex, your personal AI study assistant. How can I help you with your university coursework today?",
          timestamp: new Date(),
        };
        setMessages([welcome]);
        lastAIResponse.current = welcome.content;
      }
    }
  }, []);

  // Persist messages whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      const toStore = messages.map((m) => ({ ...m, timestamp: m.timestamp.toISOString() }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
    }
  }, [messages]);

  // Auto‑scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, imagePreview]);

  const generateAIResponse = useCallback((query: string): string => {
    const lower = query.toLowerCase();

    if (lower.includes("image") && lower.includes("analysis")) {
      return "Based on the image you uploaded, I can see the details you're asking about. It appears to be related to your study material. Is there a specific part you'd like me to focus on?";
    }

    if (lower.includes("simpler") && lastAIResponse.current) {
      return `Simplified: ${lastAIResponse.current}`;
    }
    if (lower.includes("opportunity cost")) {
      return "Opportunity cost is the potential benefit you miss out on when choosing one alternative over another. In economics, it's a fundamental concept because resources are scarce. For example, if you spend time studying Economics, the opportunity cost is the time you could have spent studying Computer Science or sleeping.";
    }
    if (lower.includes("macbeth")) {
      return "Shakespeare's Macbeth explores themes of ambition, guilt, and the corrupting power of unchecked desire. Macbeth's ambition drives him to commit regicide, but his guilt manifests in hallucinations and paranoia. The play also examines fate vs. free will.";
    }
    if (lower.includes("derivative")) {
      return "The derivative of x^2 is 2x. This is found using the power rule: d/dx(x^n) = nx^(n-1). So for x^2, n=2, giving 2x.";
    }
    if (lower.includes("oop") || lower.includes("object-oriented")) {
      return "The four pillars of OOP are: 1. Encapsulation (bundling data and methods), 2. Abstraction (hiding complex details), 3. Inheritance (creating new classes from existing ones), and 4. Polymorphism (objects taking on multiple forms).";
    }
    return "That's an interesting question! As an AI study assistant, I can help you break down complex topics. Could you provide more specific details or context from your course material so I can give you the best explanation?";
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

  const handleDeleteHistory = () => {
    if (deleteId) {
      // In this simple implementation, we are just clearing the chat if the ID matches the current session
      // Real implementation would manage multiple sessions. 
      // For now, we'll reset the chat if the user deletes the "current" session (which is all we have)
      setMessages([{
        id: Date.now().toString(),
        role: "ai",
        content: "Chat history cleared. How can I help you?",
        timestamp: new Date(),
      }]);
      setDeleteId(null);
    }
  };

  const handleSend = async () => {
    if (!input.trim() && !uploadedImage) return;

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
      content: input || "Analyze this image", // Fallback if only image sent
      timestamp: new Date(),
      imageUrl: imageUrl
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiContent = generateAIResponse(content);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: aiContent,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      lastAIResponse.current = aiContent;
      setIsTyping(false);
    }, 1500);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <Button className="w-full justify-start gap-2" variant="secondary" onClick={() => setMessages([{
          id: Date.now().toString(),
          role: "ai",
          content: "Hello! I'm Cortex, your personal AI study assistant. How can I help you with your university coursework today?",
          timestamp: new Date(),
        }])}>
          <Plus className="h-4 w-4" />
          New Chat
        </Button>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Recent
          </div>
          {/* We are simulating "Recent" sessions from the current message history for demo purposes */}
          {messages.length > 1 && (
            <div className="group relative w-full rounded-lg hover:bg-muted transition-colors">
              <button
                className="w-full text-left p-3 pr-10"
              >
                <div className="font-medium text-sm truncate flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                  Current Session
                </div>
                <div className="text-xs text-muted-foreground truncate pl-6 mt-1">
                  {messages[messages.length - 1].content.slice(0, 25)}...
                </div>
              </button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                onClick={() => setDeleteId("current")}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Chat History?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your chat history from this device.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteHistory} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
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

              {messages.length === 1 && !imagePreview && (
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
