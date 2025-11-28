
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

export default function CertificatesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline flex items-center gap-3">
          <Award className="h-8 w-8 text-primary" />
          My Certificates
        </h1>
        <p className="text-muted-foreground mt-1">
          Congratulations on your achievements! Here are the certificates you've
          earned.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {certificates.map((cert) => {
          const image = PlaceHolderImages.find(
            (img) => img.id === cert.imageId
          );
          return (
            <Card key={cert.id} className="flex flex-col bg-card/70 border-primary/20 hover:border-primary/50 transition-all">
              <CardHeader className="p-0">
                {image && (
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      fill
                      className="object-cover rounded-t-lg"
                      data-ai-hint={image.imageHint}
                    />
                  </div>
                )}
              </CardHeader>
              <CardContent className="flex-1 pt-6">
                <CardTitle className="text-xl">{cert.title}</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  Completed on: {cert.date}
                </p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="default">
                  <Share2 className="mr-2" /> Share
                </Button>
                <Button variant="secondary">
                  <Printer className="mr-2" /> Print
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
