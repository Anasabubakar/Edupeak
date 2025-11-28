import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { tpdModules } from "@/lib/placeholder-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CheckCircle, Library } from "lucide-react";

export default function TrainingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline flex items-center gap-3">
          <Library className="h-8 w-8 text-primary"/>
          Teacher Professional Development (TPD) Hub
        </h1>
        <p className="text-muted-foreground mt-1">
          Upgrade your skills at your own pace, anytime, anywhere.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tpdModules.map((module) => {
          const image = PlaceHolderImages.find((img) => img.id === module.imageId);
          return (
            <Card key={module.id} className="flex flex-col">
              <CardHeader className="p-0">
                {image && (
                  <div className="relative aspect-video">
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      fill
                      className="object-cover rounded-t-lg"
                      data-ai-hint={image.imageHint}
                    />
                  </div>
                )}
                 <div className="p-6 pb-2">
                    <CardTitle>{module.title}</CardTitle>
                 </div>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex items-center gap-4">
                  <Progress value={module.progress} className="h-2" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {module.progress}%
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                {module.certificate ? (
                    <Badge variant="default" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="mr-2 h-4 w-4"/>
                        Certified
                    </Badge>
                ) : <div />}
                <Button variant={module.progress > 0 ? "secondary" : "default"}>
                  {module.progress > 0 ? "Continue" : "Start Module"}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
