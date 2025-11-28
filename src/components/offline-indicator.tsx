import { Badge } from "./ui/badge";
import { WifiOff } from "lucide-react";

export function OfflineIndicator() {
  return (
    <Badge
      variant="outline"
      className="hidden items-center gap-2 border-amber-500/50 bg-amber-500/10 text-amber-600 sm:flex dark:text-amber-400"
    >
      <WifiOff className="h-4 w-4" />
      <span>Offline Mode ⚡</span>
    </Badge>
  );
}
