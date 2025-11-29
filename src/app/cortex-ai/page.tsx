"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Sparkles, User, Bot, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

type Message = {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
};

const SUGGESTED_PROMPTS = [
  "Explain the concept of Opportunity Cost",
  "Summarize the key themes in Macbeth",
  "How do I calculate the derivative of x^2?",
  "What are the basic principles of Object-Oriented Programming?",
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
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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

  return (
    <div className="flex h-[calc(100vh-2rem)] flex-col gap-4">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            Cortex AI
          </h1>
          <p className="text-muted-foreground">Your 24/7 University Study Companion</p>
        </div>
        <Button variant="outline" onClick={() => setMessages([messages[0]])}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset Chat
        </Button>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden border-primary/20 shadow-lg">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3 max-w-[80%]",
                  message.role === "user" ? "ml-auto flex-row-reverse" : ""
                )}
              >
                <Avatar className={cn("h-8 w-8", message.role === "ai" ? "bg-primary/10" : "bg-secondary")}>
                  {message.role === "ai" ? (
                    <AvatarImage src="/bot-avatar.png" />
                  ) : (
                    <AvatarImage src="/user-avatar.png" />
                  )}
                  <AvatarFallback>{message.role === "ai" ? <Bot className="h-4 w-4 text-primary" /> : <User className="h-4 w-4" />}</AvatarFallback>
                </Avatar>
                <div
                  className={cn(
                    "rounded-lg p-3 text-sm",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3 max-w-[80%]">
                <Avatar className="h-8 w-8 bg-primary/10">
                  <AvatarFallback><Bot className="h-4 w-4 text-primary" /></AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg p-3 text-sm flex items-center gap-2">
                  <span className="animate-bounce">●</span>
                  <span className="animate-bounce delay-100">●</span>
                  <span className="animate-bounce delay-200">●</span>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        <div className="p-4 border-t bg-background/50 backdrop-blur-sm">
          {messages.length === 1 && (
            <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <Button
                  key={prompt}
                  variant="outline"
                  size="sm"
                  className="whitespace-nowrap rounded-full border-primary/20 hover:bg-primary/10 hover:text-primary transition-colors"
                  onClick={() => {
                    setInput(prompt);
                    // Optional: auto-send
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
            className="flex gap-2"
          >
            <Input
              placeholder="Ask Cortex anything about your courses..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={!input.trim() || isTyping}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
