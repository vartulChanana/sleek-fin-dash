import React from 'react';
import { ModernSidebar } from './ModernSidebar';
import { ModernTopbar } from './ModernTopbar';

interface ModernLayoutProps {
  children: React.ReactNode;
}

export const ModernLayout: React.FC<ModernLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Animated background */}
      <div className="fixed inset-0 bg-animated opacity-50 pointer-events-none"></div>
      
      {/* Floating orbs for visual appeal */}
      <div className="fixed top-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
      <div className="fixed bottom-20 right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>
      
      <ModernSidebar />
      
      <div className="ml-72 min-h-screen">
        <ModernTopbar />
        
        <main className="p-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};