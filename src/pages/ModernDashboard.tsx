import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Calendar, Edit, Trash2, Zap, Target, PiggyBank, CreditCard, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useFinance } from '@/contexts/FinanceContext';
import { format } from 'date-fns';

export const ModernDashboard = () => {
  const { stats, deleteTransaction } = useFinance();

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    trend, 
    gradientFrom, 
    gradientTo,
    textColor,
    percentage
  }: {
    title: string;
    value: number;
    icon: React.ElementType;
    trend?: 'up' | 'down';
    gradientFrom: string;
    gradientTo: string;
    textColor: string;
    percentage?: string;
  }) => (
    <Card className="card-hover glass border-border/50 overflow-hidden group">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientTo} opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-300`}></div>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className={`p-3 rounded-2xl bg-gradient-to-br ${gradientFrom} ${gradientTo} shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline space-x-3">
          <div className={`text-3xl font-bold ${textColor}`}>
            ₹{value.toLocaleString()}
          </div>
          {trend && (
            <div className="flex items-center space-x-1">
              <Badge 
                variant={trend === 'up' ? 'default' : 'destructive'} 
                className={`text-xs px-2 py-1 ${trend === 'up' ? 'bg-income/20 text-income border-income/30' : 'bg-expense/20 text-expense border-expense/30'}`}
              >
                {trend === 'up' ? '↗' : '↘'} {percentage || 'Live'}
              </Badge>
            </div>
          )}
        </div>
        <div className="mt-2">
          <div className={`h-1 rounded-full bg-gradient-to-r ${gradientFrom} ${gradientTo} opacity-20`}></div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 rounded-3xl blur-3xl"></div>
        <div className="relative glass rounded-3xl p-8 border border-border/50">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <h1 className="text-4xl font-bold gradient-text">Financial Overview</h1>
                <div className="flex items-center space-x-2 px-3 py-1 glass rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-muted-foreground">Live</span>
                </div>
              </div>
              <p className="text-lg text-muted-foreground">
                Welcome back! Here's your complete financial snapshot.
              </p>
            </div>
            <div className="text-right space-y-1">
              <div className="flex items-center space-x-2 justify-end">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Today</p>
              </div>
              <p className="text-xl font-semibold text-foreground">
                {format(new Date(), 'EEEE, MMMM d')}
              </p>
              <p className="text-lg text-primary font-bold">
                {format(new Date(), 'yyyy')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Balance"
          value={stats.totalBalance}
          icon={DollarSign}
          gradientFrom="from-primary"
          gradientTo="to-primary-glow"
          textColor="text-balance"
          trend={stats.totalBalance > 0 ? 'up' : 'down'}
          percentage="12.5%"
        />
        
        <StatCard
          title="Monthly Income"
          value={stats.totalIncome}
          icon={TrendingUp}
          gradientFrom="from-income"
          gradientTo="to-emerald-400"
          textColor="text-income"
          trend="up"
          percentage="8.2%"
        />
        
        <StatCard
          title="Monthly Expenses"
          value={stats.totalExpenses}
          icon={TrendingDown}
          gradientFrom="from-expense"
          gradientTo="to-red-400"
          textColor="text-expense"
          trend="down"
          percentage="3.1%"
        />
        
        <StatCard
          title="Savings Rate"
          value={stats.totalIncome > 0 ? ((stats.totalBalance / stats.totalIncome) * 100) : 0}
          icon={PiggyBank}
          gradientFrom="from-purple-500"
          gradientTo="to-pink-500"
          textColor="text-purple-400"
          trend="up"
          percentage="5.7%"
        />
      </div>

      {/* Quick Action Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="glass border-border/50 hover-lift group">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Set Financial Goal</h3>
                <p className="text-sm text-muted-foreground">Create savings targets</p>
              </div>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Zap className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-border/50 hover-lift group">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Budget Planner</h3>
                <p className="text-sm text-muted-foreground">Manage spending limits</p>
              </div>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Zap className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-border/50 hover-lift group">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Investment Tracker</h3>
                <p className="text-sm text-muted-foreground">Monitor portfolio</p>
              </div>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Zap className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions with Modern Design */}
      <Card className="glass border-border/50 overflow-hidden">
        <CardHeader className="border-b border-border/30 bg-gradient-to-r from-background/50 to-background/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-primary to-primary-glow rounded-xl">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Recent Transactions</CardTitle>
                <CardDescription>Your latest financial activities</CardDescription>
              </div>
            </div>
            <Badge variant="secondary" className="glass px-3 py-1">
              {stats.transactions.length} Total
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {stats.transactions.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary-glow/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-3">No transactions yet</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Start your financial journey by adding your first transaction and unlock powerful insights.
              </p>
              <Button className="btn-modern px-8 py-3 rounded-2xl">
                <Plus className="w-5 h-5 mr-2" />
                Add Your First Transaction
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-border/30">
              {stats.transactions.slice(0, 8).map((transaction, index) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-6 hover:bg-muted/20 transition-all duration-200 group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`relative w-12 h-12 rounded-2xl flex items-center justify-center ${
                      transaction.type === 'income' 
                        ? 'bg-gradient-to-br from-income/20 to-emerald-400/20 border border-income/30' 
                        : 'bg-gradient-to-br from-expense/20 to-red-400/20 border border-expense/30'
                    }`}>
                      {transaction.type === 'income' ? (
                        <TrendingUp className="w-6 h-6 text-income" />
                      ) : (
                        <TrendingDown className="w-6 h-6 text-expense" />
                      )}
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground truncate">{transaction.title}</h4>
                      <div className="flex items-center space-x-3 text-sm text-muted-foreground mt-1">
                        <span className="px-2 py-1 bg-muted/50 rounded-lg">{transaction.category}</span>
                        <span>•</span>
                        <span>{format(new Date(transaction.date), 'MMM d, yyyy')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className={`text-xl font-bold ${
                      transaction.type === 'income' ? 'text-income' : 'text-expense'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                    </span>
                    
                    <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl hover:bg-primary/20">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 rounded-xl hover:bg-destructive/20 text-destructive"
                        onClick={() => deleteTransaction(transaction.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};