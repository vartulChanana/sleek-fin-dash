import React from 'react';
import { Bell, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useNotifications } from '@/contexts/NotificationContext';
import { useSettings } from '@/contexts/SettingsContext';
import { formatCurrency } from '@/lib/currency';

export const NotificationDialog = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const { currency } = useSettings();

  const handleNotificationClick = (id: string) => {
    markAsRead(id);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-12 w-12 rounded-2xl hover:bg-muted/30 group">
          <Bell className="w-5 h-5 transition-colors group-hover:text-primary" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-primary to-primary-glow rounded-full text-xs font-bold text-white flex items-center justify-center shadow-neon animate-pulse">
              {unreadCount}
            </span>
          )}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md z-[100]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Notifications</span>
              {unreadCount > 0 && (
                <Badge variant="secondary" className="bg-primary/20 text-primary">
                  {unreadCount} new
                </Badge>
              )}
            </div>
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={markAllAsRead}
                className="text-xs h-8 px-2"
              >
                Mark all read
              </Button>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">No notifications yet</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div 
                key={notification.id}
                onClick={() => handleNotificationClick(notification.id)}
                className={`p-3 rounded-lg border transition-all cursor-pointer hover:shadow-md ${
                  notification.unread 
                    ? 'bg-primary/5 border-primary/20 hover:bg-primary/10' 
                    : 'bg-muted/30 border-border/50 hover:bg-muted/50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                    notification.type === 'income' ? 'bg-income/20 text-income' :
                    notification.type === 'expense' ? 'bg-expense/20 text-expense' :
                    notification.type === 'balance' ? 'bg-primary/20 text-primary' :
                    notification.type === 'goal' ? 'bg-purple-500/20 text-purple-500' :
                    notification.type === 'budget' ? 'bg-orange-500/20 text-orange-500' :
                    'bg-muted/40 text-muted-foreground'
                  }`}>
                    <notification.icon className="w-4 h-4" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`text-sm font-medium truncate ${
                        notification.unread ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {notification.title}
                      </h4>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-primary rounded-full ml-2 animate-pulse"></div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {notification.message}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {notification.time}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {notifications.length > 0 && (
          <div className="pt-3 border-t flex justify-between items-center">
            <p className="text-xs text-muted-foreground">
              {notifications.length} total notifications
            </p>
            {unreadCount > 0 && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={markAllAsRead}
                className="h-8"
              >
                Clear all
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};