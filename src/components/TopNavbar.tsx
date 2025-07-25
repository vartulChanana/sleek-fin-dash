import React from 'react';
import { User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NotificationDialog } from './NotificationDialog';
import { SettingsDialog } from './SettingsDialog';

export const TopNavbar = () => {
  return (
    <header className="h-16 bg-card/80 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="h-full flex items-center justify-between px-6">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search transactions..."
              className="pl-10 bg-background/50 border-border/50 focus:border-primary/50"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <NotificationDialog />
          <SettingsDialog />
          
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center ml-2 cursor-pointer hover:scale-105 transition-transform">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
};