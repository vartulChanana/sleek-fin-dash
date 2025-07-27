import React, { createContext, useContext, useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Calendar, Bell, PiggyBank } from 'lucide-react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'income' | 'expense' | 'balance' | 'report' | 'budget' | 'goal';
  icon: React.ElementType;
  unread: boolean;
  timestamp: Date;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'unread'>) => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Monthly Budget Alert',
      message: 'Your expenses are approaching your monthly budget limit',
      time: '2 hours ago',
      type: 'expense',
      icon: TrendingDown,
      unread: true,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
    },
    {
      id: '2',
      title: 'Income Update',
      message: 'New income transaction has been recorded',
      time: '1 day ago',
      type: 'income',
      icon: TrendingUp,
      unread: true,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
    },
    {
      id: '3',
      title: 'Weekly Report Ready',
      message: 'Your weekly financial report is now available',
      time: '3 days ago',
      type: 'report',
      icon: Calendar,
      unread: true,
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
    },
    {
      id: '4',
      title: 'Savings Goal Progress',
      message: 'You are 75% close to reaching your savings goal',
      time: '1 week ago',
      type: 'goal',
      icon: PiggyBank,
      unread: false,
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 1 week ago
    }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, unread: false }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, unread: false }))
    );
  };

  const addNotification = (newNotification: Omit<Notification, 'id' | 'timestamp' | 'unread'>) => {
    const notification: Notification = {
      ...newNotification,
      id: Date.now().toString(),
      timestamp: new Date(),
      unread: true
    };
    
    setNotifications(prev => [notification, ...prev]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('notifications');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setNotifications(parsed.map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp)
        })));
      } catch (error) {
        console.error('Failed to load notifications:', error);
      }
    }
  }, []);

  // Save to localStorage when notifications change
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      markAsRead,
      markAllAsRead,
      addNotification,
      removeNotification,
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};