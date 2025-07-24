import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Plus, BarChart3, DollarSign, TrendingUp, TrendingDown, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFinance } from '@/contexts/FinanceContext';

export const ModernSidebar = () => {
  const { stats } = useFinance();

  const navItems = [
    { to: '/', icon: Home, label: 'Dashboard', gradient: 'from-blue-500 to-purple-600' },
    { to: '/add-transaction', icon: Plus, label: 'Add Transaction', gradient: 'from-green-500 to-emerald-600' },
    { to: '/reports', icon: BarChart3, label: 'Analytics', gradient: 'from-orange-500 to-red-600' },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-72 glass border-r border-border/50 shadow-2xl z-50">
      {/* Brand Header */}
      <div className="p-6 border-b border-border/30">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-2xl flex items-center justify-center shadow-neon">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1">
              <Sparkles className="w-4 h-4 text-primary-glow animate-pulse" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold gradient-text">FinanceFlow</h1>
            <p className="text-sm text-muted-foreground">Modern Finance</p>
          </div>
        </div>
      </div>

      {/* Balance Overview */}
      <div className="p-6 space-y-4">
        <div className="glass rounded-2xl p-4 hover-lift">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Total Balance</span>
            <div className="w-2 h-2 bg-primary rounded-full pulse-glow"></div>
          </div>
          <p className="text-2xl font-bold text-balance mb-1">
            ${stats.totalBalance.toLocaleString()}
          </p>
          <div className="flex items-center space-x-1 text-xs">
            <span className={`px-2 py-1 rounded-full ${
              stats.totalBalance > 0 
                ? 'bg-income/20 text-income' 
                : 'bg-expense/20 text-expense'
            }`}>
              {stats.totalBalance > 0 ? '↗' : '↘'} 
              {stats.totalBalance > 0 ? 'Profitable' : 'Loss'}
            </span>
          </div>
        </div>
        
        {/* Income/Expense Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="glass rounded-xl p-3 hover-lift group">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-8 h-8 bg-income/20 rounded-lg flex items-center justify-center group-hover:bg-income/30 transition-colors">
                <TrendingUp className="w-4 h-4 text-income" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Income</p>
            <p className="text-lg font-bold text-income">
              ${stats.totalIncome.toLocaleString()}
            </p>
          </div>
          
          <div className="glass rounded-xl p-3 hover-lift group">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-8 h-8 bg-expense/20 rounded-lg flex items-center justify-center group-hover:bg-expense/30 transition-colors">
                <TrendingDown className="w-4 h-4 text-expense" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Expenses</p>
            <p className="text-lg font-bold text-expense">
              ${stats.totalExpenses.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-4 space-y-2">
        {navItems.map((item, index) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'group flex items-center space-x-4 px-4 py-4 rounded-2xl transition-all duration-300 relative overflow-hidden',
                isActive
                  ? 'bg-gradient-to-r from-primary/20 to-primary-glow/10 border border-primary/30 shadow-glow text-primary-foreground'
                  : 'hover:bg-muted/30 text-muted-foreground hover:text-foreground'
              )
            }
          >
            <div className={cn(
              'w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300',
              'bg-gradient-to-br',
              item.gradient,
              'shadow-lg group-hover:shadow-xl group-hover:scale-110'
            )}>
              <item.icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <span className="font-semibold text-sm">{item.label}</span>
              <div className="w-0 h-0.5 bg-gradient-to-r from-primary to-primary-glow transition-all duration-300 group-hover:w-full"></div>
            </div>
            {index === 0 && stats.transactions.length > 0 && (
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-xs text-muted-foreground mb-2">Total Transactions</p>
          <p className="text-2xl font-bold gradient-text">{stats.transactions.length}</p>
        </div>
      </div>
    </div>
  );
};