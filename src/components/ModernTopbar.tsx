import React from 'react';
import { Bell, Settings, User, Search, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

export const ModernTopbar = () => {
  const { user } = useAuth();
  return (
    <header className="h-20 glass border-b border-border/30 shadow-lg">
      <div className="h-full flex items-center justify-between px-8">
        {/* Search Section */}
        <div className="flex-1 max-w-md">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 transition-colors group-focus-within:text-primary" />
            <Input
              placeholder="Search transactions, categories..."
              className="pl-12 h-12 glass border-border/50 focus:border-primary/50 rounded-2xl text-foreground placeholder:text-muted-foreground bg-background/50"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Badge variant="secondary" className="text-xs bg-muted/50">
                ⌘K
              </Badge>
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          {/* Quick Stats */}
          <div className="hidden md:flex items-center space-x-4 px-4 py-2 glass rounded-2xl">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Live Sync</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative h-12 w-12 rounded-2xl hover:bg-muted/30 group">
            <Bell className="w-5 h-5 transition-colors group-hover:text-primary" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-primary to-primary-glow rounded-full text-xs font-bold text-white flex items-center justify-center shadow-neon">
              3
            </span>
          </Button>
          
          {/* Settings */}
          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl hover:bg-muted/30 group">
            <Settings className="w-5 h-5 transition-all duration-300 group-hover:text-primary group-hover:rotate-90" />
          </Button>
          
          {/* Profile */}
          <div className="flex items-center space-x-3 pl-4 border-l border-border/30">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-foreground">
                {user?.user_metadata?.first_name && user?.user_metadata?.last_name
                  ? `${user.user_metadata.first_name} ${user.user_metadata.last_name}`
                  : user?.email?.split('@')[0] || 'User'
                }
              </p>
              <p className="text-xs text-muted-foreground">
                {user ? 'Premium Member' : 'Guest'}
              </p>
            </div>
            <div className="relative group cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-2xl flex items-center justify-center shadow-neon group-hover:shadow-glow transition-all duration-300">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};