
import { Button } from "@/components/ui/button";
import { EdupeakLogo } from "@/components/icons";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LiveClassLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
    </div>
  );
}
