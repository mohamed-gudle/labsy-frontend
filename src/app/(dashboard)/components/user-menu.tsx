import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { CreditCard, LogOut, Settings, User } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { useAuth } from "@/context/auth-context";

export interface UserMenuProps {
  name?: string;
  email?: string;
  imageUrl?: string;
  onLogout?: () => void;
}

export function UserMenu({ onLogout }: UserMenuProps) {
  const { user } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900"
        >
          <Avatar >
            <AvatarImage src={user?.photoURL || ''} alt={user?.displayName || ''} className="h-10 w-10 border border-zinc-300 dark:border-zinc-700 rounded-full" />
          </Avatar>
          <div className="flex flex-col items-start min-w-0">
            <span className="font-medium text-base truncate">{user?.displayName}</span>
            <span className="text-xs text-zinc-500 truncate">{user?.email}</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem asChild>
          <a href="/dashboard/profile" className="flex items-center gap-2">
            <User className="h-4 w-4" /> Profile
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="/dashboard/settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" /> Settings
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="/dashboard/subscription" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" /> Subscription
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onLogout}
          className="text-red-600 focus:text-red-600"
        >
          <LogOut className="h-4 w-4" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
