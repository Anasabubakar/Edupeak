import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Edit, Upload } from "lucide-react";

export default function ContentPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold font-headline flex items-center gap-3">
            <Edit className="h-8 w-8 text-primary"/>
            Custom Content Tool
        </h1>
        <p className="text-muted-foreground mt-1">
          Curate and contribute to the learning ecosystem.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submit a Local Example</CardTitle>
          <CardDescription>
            Help enrich the curriculum by providing examples from your local
            context. Your submission will be peer-reviewed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Example Title</Label>
              <Input
                id="title"
                placeholder="e.g., Calculating Profit at a Suya Stand"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject Area</Label>
              <Input id="subject" placeholder="e.g., Financial Literacy" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="example">Detailed Example</Label>
              <Textarea
                id="example"
                placeholder="Explain the concept using a local scenario. For example, if Bisi buys yams..."
                className="min-h-[150px]"
              />
            </div>
            <Button className="w-full sm:w-auto">
              <Upload className="mr-2 h-4 w-4" />
              Submit for Peer Review
            </Button>
          </form>
        </CardContent>
      </Card>
      
       <Card>
        <CardHeader>
          <CardTitle>Review AI-Localized Drafts</CardTitle>
          <CardDescription>
            Approve or suggest edits for AI-generated content to ensure quality and cultural authenticity.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="text-center text-muted-foreground py-8">
                <p>No drafts are currently available for your review.</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
