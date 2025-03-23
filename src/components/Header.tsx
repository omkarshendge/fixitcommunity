
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Plus, 
  ClipboardList, 
  Users, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  const navItems = [
    { label: 'Home', icon: Home, path: '/' },
    { label: 'Report Issue', icon: Plus, path: '/report' },
    { label: 'My Reports', icon: ClipboardList, path: '/my-reports' },
    { label: 'Community', icon: Users, path: '/community' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
              FI
            </div>
            <span className="hidden sm:inline">FixInfra</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        {isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu} 
            className="md:hidden"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        )}

        {/* Desktop navigation */}
        {!isMobile && (
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                className={cn(
                  "group flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  location.pathname === item.path 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </Link>
            ))}
            <Button variant="ghost" size="sm" className="ml-2">
              <LogOut size={16} className="mr-1" />
              <span>Logout</span>
            </Button>
          </nav>
        )}
      </div>

      {/* Mobile menu */}
      {isMobile && isOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-background/95 backdrop-blur-sm animate-fade-in">
          <nav className="container flex flex-col gap-2 py-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors animate-slide-in",
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            ))}
            <Button variant="ghost" size="lg" className="mt-2 justify-start">
              <LogOut size={20} className="mr-3" />
              <span>Logout</span>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
