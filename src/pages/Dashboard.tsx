import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Calendar, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useFinance } from '@/contexts/FinanceContext';
import { format } from 'date-fns';

export const Dashboard = () => {
  const { stats, deleteTransaction } = useFinance();

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    trend, 
    gradientFrom, 
    gradientTo,
    textColor 
  }: {
    title: string;
    value: number;
    icon: React.ElementType;
    trend?: 'up' | 'down';
    gradientFrom: string;
    gradientTo: string;
    textColor: string;
  }) => (
    <Card className="relative overflow-hidden border-border/50 shadow-md hover:shadow-lg transition-all duration-300">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientTo} opacity-5`}></div>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className={`p-2 rounded-lg bg-gradient-to-br ${gradientFrom} ${gradientTo} opacity-20`}>
          <Icon className={`h-4 w-4 ${textColor}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <div className={`text-2xl font-bold ${textColor}`}>
            ₹{value.toLocaleString()}
          </div>
          {trend && (
            <Badge variant={trend === 'up' ? 'default' : 'destructive'} className="text-xs">
              {trend === 'up' ? '↗' : '↘'}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your financial overview.</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Today</p>
          <p className="text-lg font-semibold text-foreground">
            {format(new Date(), 'EEEE, MMMM d, yyyy')}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <StatCard
          title="Total Balance"
          value={stats.totalBalance}
          icon={DollarSign}
          gradientFrom="from-balance"
          gradientTo="to-balance"
          textColor="text-balance"
          trend={stats.totalBalance > 0 ? 'up' : 'down'}
        />
        
        <StatCard
          title="Total Income"
          value={stats.totalIncome}
          icon={TrendingUp}
          gradientFrom="from-income"
          gradientTo="to-income"
          textColor="text-income"
          trend="up"
        />
        
        <StatCard
          title="Total Expenses"
          value={stats.totalExpenses}
          icon={TrendingDown}
          gradientFrom="from-expense"
          gradientTo="to-expense"
          textColor="text-expense"
          trend="down"
        />
      </div>

      {/* Recent Transactions */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Recent Transactions</span>
          </CardTitle>
          <CardDescription>
            Your latest financial activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          {stats.transactions.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No transactions yet</h3>
              <p className="text-muted-foreground mb-4">Start by adding your first transaction</p>
              <Button>Add Transaction</Button>
            </div>
          ) : (
            <div className="space-y-3">
              {stats.transactions.slice(0, 10).map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'income' 
                        ? 'bg-income/10 text-income border border-income/20' 
                        : 'bg-expense/10 text-expense border border-expense/20'
                    }`}>
                      {transaction.type === 'income' ? (
                        <TrendingUp className="w-5 h-5" />
                      ) : (
                        <TrendingDown className="w-5 h-5" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{transaction.title}</h4>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>{transaction.category}</span>
                        <span>•</span>
                        <span>{format(new Date(transaction.date), 'MMM d, yyyy')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`text-lg font-bold ${
                      transaction.type === 'income' ? 'text-income' : 'text-expense'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                    </span>
                    
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-destructive hover:text-destructive"
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