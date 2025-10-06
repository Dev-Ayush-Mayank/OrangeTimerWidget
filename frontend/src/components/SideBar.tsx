import {
  Home,
  Settings,
  LogOut,
  User,
  GalleryHorizontalEnd,
  SquareGantt
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "../lib/supabaseClient";
import { Link, useNavigate, useLocation } from "react-router-dom"; // <-- Imported useLocation
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

interface SidebarProps {
  className?: string;
}

const menuItems = [
  {
    icon: Home,
    label: "Dashboard",
    to: "/dashboard",
  },
  {
    icon: GalleryHorizontalEnd,
    label: "Create New Timer",
    to: "/new-widget",
  },
  {
    icon: SquareGantt,
    label: "Manage Widgets",
    to: "/manage-widgets",
  },
  {
    icon: Settings,
    label: "Settings",
    to: "/settings",
  },
];

export const Sidebar = ({ className }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation(); // <-- Get current location
  const [user, setUser] = useState<any>(null);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/"); // redirect to home
  };

  useEffect(() => {
    // get current user
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  return (
    <aside className={cn("flex h-screen flex-col", className)}>
      {/* Logo */}
      <Logo />

      {/* Navigation */}
      <nav className='flex-1 space-y-2 px-3 py-4 mt-4'>
        {menuItems.map((item) => {
          // Check if the current route matches the menu item's 'to' path
          const isActive = location.pathname === item.to;

          // Define classes for base state and active state
          const baseClasses =
            "rounded-full w-full justify-start gap-3 text-muted-foreground hover:bg-accent hover:text-accent-foreground";
          const activeClasses =
            "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground font-semibold"; // <-- Highlight styling

          return (
            <Button
              key={item.label}
              variant='ghost'
              // Conditionally apply active classes using cn
              className={cn(baseClasses, isActive && activeClasses)}
              asChild
            >
              <Link to={item.to}>
                <item.icon className='h-5 w-5' />
                <span className='text-sm font-medium'>{item.label}</span>
              </Link>
            </Button>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className='border-t border-border p-4'>
        <Button
          variant='ghost'
          className='w-full justify-start gap-3 hover:bg-accent'
          asChild
        >
          <a href='#' className='flex items-center'>
            <Avatar className='h-8 w-8'>
              {user?.user_metadata?.avatar_url ? (
                <AvatarImage src={user?.user_metadata?.avatar_url} />
              ) : (
                <AvatarFallback className='bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs'>
                  <User />
                </AvatarFallback>
              )}
            </Avatar>
            <span className='text-sm font-medium'>
              {user?.user_metadata?.full_name || user?.email}
            </span>
          </a>
        </Button>
        <Button
          variant='ghost'
          className='w-full justify-start gap-3 hover:bg-accent bg-red-100 text-red-600 mt-3 hover:text-red-700 hover:bg-red-200 cursor-pointer'
          asChild
          onClick={handleLogout}
        >
          <div className='flex items-center'>
            <LogOut className='h-5 w-5' />
            <span className='text-sm font-medium'>Logout</span>
          </div>
        </Button>
        <div className="mt-4 text-center text-xs text-muted-foreground mb-6">
          &copy; {new Date().getFullYear()} OrangeTimer. All rights reserved.
        </div>
      </div>
    </aside>
  );
};