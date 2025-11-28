
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlayCircle, Volume2, Maximize, CheckCircle } from "lucide-react";
import { sampleCurriculum } from "@/lib/placeholder-data";


type LessonSummary = {
  transcript: string;
  takeaways: string[];
};

export default function LiveClassPage() {

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold font-headline">
        {sampleCurriculum.title}
      </h1>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative aspect-video bg-card flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" />
            <Button
              variant="ghost"
              size="icon"
              className="h-20 w-20 relative"
            >
              <PlayCircle className="h-full w-full text-white" />
            </Button>
            <div className="absolute bottom-4 left-4 right-4 text-white text-xs flex items-center gap-4">
               <span>0:37</span>
                <div className="relative flex-1 h-1 bg-white/30 rounded-full">
                    <div className="absolute h-full bg-primary rounded-full" style={{width: `${(37/143) * 100}%`}}></div>
                     <div className="absolute h-3 w-3 bg-white rounded-full -top-1" style={{left: `calc(${(37/143) * 100}% - 6px)`}}></div>
                </div>
               <span>2:23</span>
               <Volume2 className="h-4 w-4" />
               <Maximize className="h-4 w-4" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="notes">
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="notes">Lesson Notes</TabsTrigger>
        </TabsList>
        <TabsContent value="notes" className="mt-6">
          <div className="prose prose-invert max-w-none text-card-foreground/90">
            <p className="text-muted-foreground">{sampleCurriculum.description}</p>
            <div dangerouslySetInnerHTML={{ __html: sampleCurriculum.notesHtml }} />

            <Alert className="mt-8 bg-green-500/10 border-green-500/30 text-green-300">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <AlertDescription>
                    You have completed 3 of 5 key concepts in this section.
                </AlertDescription>
            </Alert>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
