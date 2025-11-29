
"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { certificates } from "@/lib/placeholder-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Share2, Printer, Award } from "lucide-react";

import { useToast } from "@/hooks/use-toast";

export default function CertificatesPage() {
  const { toast } = useToast();

  const handleAction = (action: string, title: string) => {
    toast({
      title: `${action} Successful`,
      description: `You have successfully ${action.toLowerCase()}ed ${title}.`,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline flex items-center gap-3">
          <Award className="h-8 w-8 text-primary" />
          My Certificates
        </h1>
        <p className="text-muted-foreground mt-1 text-lg">
          Official academic transcripts and certifications.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {certificates.map((cert) => {
          const image = PlaceHolderImages.find(
            (img) => img.id === cert.imageId
          );
          return (
            <Card key={cert.id} className="flex flex-col bg-card border-border hover:border-primary/50 transition-all shadow-sm hover:shadow-md group">
              <CardHeader className="p-0">
                {image && (
                  <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      data-ai-hint={image.imageHint}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  </div>
                )}
              </CardHeader>
              <CardContent className="flex-1 pt-6">
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{cert.title}</CardTitle>
                <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                  Issued on: {cert.date}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between gap-2 border-t pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => handleAction("Share", cert.title)}
                >
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="w-full"
                  onClick={() => handleAction("Download", cert.title)}
                >
                  <Printer className="mr-2 h-4 w-4" /> Download
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
