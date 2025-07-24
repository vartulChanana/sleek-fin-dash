import React, { useMemo } from 'react';
import { BarChart3, PieChart as PieChartIcon, TrendingUp, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useFinance } from '@/contexts/FinanceContext';
import { format, startOfMonth, endOfMonth, eachMonthOfInterval, subMonths } from 'date-fns';

const COLORS = {
  income: 'hsl(150, 100%, 45%)',
  expense: 'hsl(0, 85%, 60%)',
  primary: 'hsl(210, 100%, 55%)',
  secondary: 'hsl(220, 15%, 45%)',
  muted: 'hsl(220, 15%, 65%)',
};

export const Reports = () => {
  const { stats, filterByMonth, filterByCategory, setFilterByMonth, setFilterByCategory } = useFinance();

  // Category breakdown for pie chart
  const categoryData = useMemo(() => {
    const categoryTotals: Record<string, number> = {};
    
    stats.transactions.forEach(transaction => {
      const key = `${transaction.type}-${transaction.category}`;
      categoryTotals[key] = (categoryTotals[key] || 0) + transaction.amount;
    });

    return Object.entries(categoryTotals).map(([key, value]) => {
      const [type, category] = key.split('-');
      return {
        name: category,
        value,
        type,
        color: type === 'income' ? COLORS.income : COLORS.expense,
      };
    }).sort((a, b) => b.value - a.value);
  }, [stats.transactions]);

  // Monthly trends for line chart
  const monthlyTrends = useMemo(() => {
    const months = eachMonthOfInterval({
      start: subMonths(new Date(), 11),
      end: new Date(),
    });

    return months.map(month => {
      const monthStr = format(month, 'yyyy-MM');
      const monthTransactions = stats.transactions.filter(t => 
        t.date.startsWith(monthStr)
      );

      const income = monthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const expenses = monthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      return {
        month: format(month, 'MMM yyyy'),
        income,
        expenses,
        net: income - expenses,
      };
    });
  }, [stats.transactions]);

  // Income vs Expense comparison
  const comparisonData = [
    {
      name: 'Income',
      amount: stats.totalIncome,
      color: COLORS.income,
    },
    {
      name: 'Expenses',
      amount: stats.totalExpenses,
      color: COLORS.expense,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">Visualize your financial data</p>
        </div>
        
        {/* Filters */}
        <div className="flex space-x-3">
          <Select value={filterByMonth || "all"} onValueChange={(value) => setFilterByMonth(value === "all" ? "" : value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All months</SelectItem>
              {Array.from(new Set(stats.transactions.map(t => t.date.slice(0, 7)))).map(month => (
                <SelectItem key={month} value={month}>
                  {format(new Date(month + '-01'), 'MMMM yyyy')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-income" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-balance">
              ${stats.totalBalance.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Transaction</CardTitle>
            <BarChart3 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stats.transactions.length > 0 
                ? ((stats.totalIncome + stats.totalExpenses) / stats.transactions.length).toFixed(0)
                : '0'
              }
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.transactions.length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expense Ratio</CardTitle>
            <PieChartIcon className="h-4 w-4 text-expense" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-expense">
              {stats.totalIncome > 0 
                ? ((stats.totalExpenses / stats.totalIncome) * 100).toFixed(1) + '%'
                : '0%'
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Income vs Expenses */}
        <Card>
          <CardHeader>
            <CardTitle>Income vs Expenses</CardTitle>
            <CardDescription>Comparison of total income and expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Amount']} />
                <Bar dataKey="amount" fill={COLORS.primary} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
            <CardDescription>Spending by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Amount']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Trends</CardTitle>
          <CardDescription>Track your income and expenses over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, '']} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="income" 
                stroke={COLORS.income} 
                strokeWidth={3}
                name="Income"
              />
              <Line 
                type="monotone" 
                dataKey="expenses" 
                stroke={COLORS.expense} 
                strokeWidth={3}
                name="Expenses"
              />
              <Line 
                type="monotone" 
                dataKey="net" 
                stroke={COLORS.primary} 
                strokeWidth={3}
                name="Net Income"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};