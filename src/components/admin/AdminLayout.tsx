import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FolderOpen,
  Users,
  Inbox,
  Mail,
  Menu,
  X,
  Home,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Projects", href: "/admin/projects", icon: FolderOpen },
  { name: "Clients", href: "/admin/clients", icon: Users },
  { name: "Inbox", href: "/admin/inbox", icon: Inbox },
  { name: "Subscribers", href: "/admin/subscribers", icon: Mail },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-secondary flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-primary transform transition-transform duration-300 lg:translate-x-0 lg:static",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-sidebar-border">
            <Link to="/admin" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <Home className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="font-display text-lg font-bold text-primary-foreground">
                Admin Panel
              </span>
            </Link>
            <button
              className="lg:hidden text-primary-foreground"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg font-body font-medium transition-all duration-200",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-primary-foreground/70 hover:bg-navy-light hover:text-primary-foreground"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Bottom */}
          <div className="p-4 border-t border-sidebar-border">
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-lg font-body font-medium text-primary-foreground/70 hover:bg-navy-light hover:text-primary-foreground transition-all"
            >
              <LogOut className="w-5 h-5" />
              Back to Website
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-card shadow-sm h-16 flex items-center justify-between px-4 lg:px-8">
          <button
            className="lg:hidden text-foreground"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="font-body text-muted-foreground text-sm">
            Welcome back, Admin
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
              <span className="font-body font-semibold text-accent-foreground text-sm">A</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
