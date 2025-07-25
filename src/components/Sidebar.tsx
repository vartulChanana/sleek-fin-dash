import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Plus, BarChart3, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFinance } from '@/contexts/FinanceContext';

export const Sidebar = () => {
  const { stats } = useFinance();

  const navItems = [
    { to: '/', icon: Home, label: 'Dashboard' },
    { to: '/add-transaction', icon: Plus, label: 'Add Transaction' },
    { to: '/reports', icon: BarChart3, label: 'Reports' },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-card to-secondary border-r border-border shadow-lg">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center shadow-md">
            <DollarSign className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">FinanceFlow</h1>
            <p className="text-xs text-muted-foreground">Personal Finance</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-4 space-y-3">
        <div className="bg-gradient-to-r from-balance/10 to-balance/5 rounded-lg p-3 border border-balance/20">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Balance</span>
            <DollarSign className="w-4 h-4 text-balance" />
          </div>
          <p className="text-lg font-bold text-balance">
            ₹{stats.totalBalance.toLocaleString()}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gradient-to-r from-income/10 to-income/5 rounded-lg p-2 border border-income/20">
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-3 h-3 text-income" />
              <span className="text-xs text-muted-foreground">Income</span>
            </div>
            <p className="text-sm font-semibold text-income">
              ₹{stats.totalIncome.toLocaleString()}
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-expense/10 to-expense/5 rounded-lg p-2 border border-expense/20">
            <div className="flex items-center space-x-1">
              <TrendingDown className="w-3 h-3 text-expense" />
              <span className="text-xs text-muted-foreground">Expenses</span>
            </div>
            <p className="text-sm font-semibold text-expense">
              ₹{stats.totalExpenses.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200',
                'hover:bg-primary/10 hover:border-primary/20 border border-transparent',
                isActive
                  ? 'bg-gradient-to-r from-primary/15 to-primary/5 border-primary/30 text-primary font-medium shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};