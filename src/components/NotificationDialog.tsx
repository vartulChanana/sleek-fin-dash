import React from 'react';
import { Bell, X, DollarSign, TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useFinance } from '@/contexts/FinanceContext';

export const NotificationDialog = () => {
  const { stats } = useFinance();
  
  const notifications = [
    {
      id: 1,
      title: 'Monthly Budget Alert',
      message: `Your total expenses this month: ₹${stats.totalExpenses.toLocaleString()}`,
      time: '2 hours ago',
      type: 'expense',
      icon: TrendingDown,
      unread: true
    },
    {
      id: 2,
      title: 'Income Update',
      message: `New income recorded: ₹${stats.totalIncome.toLocaleString()}`,
      time: '1 day ago',
      type: 'income',
      icon: TrendingUp,
      unread: true
    },
    {
      id: 3,
      title: 'Balance Summary',
      message: `Current balance: ₹${stats.totalBalance.toLocaleString()}`,
      time: '3 days ago',
      type: 'balance',
      icon: DollarSign,
      unread: false
    },
    {
      id: 4,
      title: 'Weekly Report Ready',
      message: 'Your weekly financial report is now available',
      time: '1 week ago',
      type: 'report',
      icon: Calendar,
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-12 w-12 rounded-2xl hover:bg-muted/30 group">
          <Bell className="w-5 h-5 transition-colors group-hover:text-primary" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-primary to-primary-glow rounded-full text-xs font-bold text-white flex items-center justify-center shadow-neon">
              {unreadCount}
            </span>
          )}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md z-[100]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span>Notifications</span>
            {unreadCount > 0 && (
              <Badge variant="secondary">{unreadCount} new</Badge>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {notifications.map((notification) => (
            <div 
              key={notification.id}
              className={`p-3 rounded-lg border transition-colors ${
                notification.unread 
                  ? 'bg-primary/5 border-primary/20' 
                  : 'bg-muted/30 border-border/50'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  notification.type === 'income' ? 'bg-income/20 text-income' :
                  notification.type === 'expense' ? 'bg-expense/20 text-expense' :
                  notification.type === 'balance' ? 'bg-primary/20 text-primary' :
                  'bg-muted/40 text-muted-foreground'
                }`}>
                  <notification.icon className="w-4 h-4" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium truncate">{notification.title}</h4>
                    {notification.unread && (
                      <div className="w-2 h-2 bg-primary rounded-full ml-2"></div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{notification.message}</p>
                  <span className="text-xs text-muted-foreground">{notification.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="pt-3 border-t">
          <Button variant="outline" size="sm" className="w-full">
            Mark all as read
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};