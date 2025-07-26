import React, { useState } from 'react';
import { Plus, Target, AlertCircle, Edit, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { CATEGORIES } from '@/types/transaction';

interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  period: 'monthly' | 'weekly';
}

interface BudgetPlannerDialogProps {
  children: React.ReactNode;
}

export const BudgetPlannerDialog: React.FC<BudgetPlannerDialogProps> = ({ children }) => {
  const [budgets, setBudgets] = useState<Budget[]>([
    { id: '1', category: 'Food & Dining', limit: 15000, spent: 8500, period: 'monthly' },
    { id: '2', category: 'Transportation', limit: 5000, spent: 3200, period: 'monthly' },
  ]);
  const [isAddingBudget, setIsAddingBudget] = useState(false);
  const [newBudget, setNewBudget] = useState({
    category: '',
    limit: '',
    period: 'monthly' as 'monthly' | 'weekly'
  });
  const { toast } = useToast();

  const handleAddBudget = () => {
    if (!newBudget.category || !newBudget.limit) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const budget: Budget = {
      id: crypto.randomUUID(),
      category: newBudget.category,
      limit: Number(newBudget.limit),
      spent: 0,
      period: newBudget.period
    };

    setBudgets(prev => [...prev, budget]);
    setNewBudget({ category: '', limit: '', period: 'monthly' });
    setIsAddingBudget(false);
    
    toast({
      title: "Budget Added",
      description: `Budget for ${newBudget.category} has been created`
    });
  };

  const deleteBudget = (id: string) => {
    setBudgets(prev => prev.filter(b => b.id !== id));
    toast({
      title: "Budget Deleted",
      description: "Budget has been removed",
      variant: "destructive"
    });
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-destructive';
    if (percentage >= 75) return 'bg-yellow-500';
    return 'bg-primary';
  };

  const getStatusBadge = (spent: number, limit: number) => {
    const percentage = (spent / limit) * 100;
    if (percentage >= 100) return <Badge variant="destructive">Over Budget</Badge>;
    if (percentage >= 90) return <Badge className="bg-yellow-500">Near Limit</Badge>;
    return <Badge variant="secondary">On Track</Badge>;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>Budget Planner</span>
          </DialogTitle>
          <DialogDescription>
            Set spending limits for different categories and track your progress
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Add Budget Form */}
          {isAddingBudget && (
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Add New Budget</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={newBudget.category} onValueChange={(value) => setNewBudget(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.expense.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="limit">Budget Limit (₹)</Label>
                    <Input
                      id="limit"
                      type="number"
                      placeholder="Enter amount"
                      value={newBudget.limit}
                      onChange={(e) => setNewBudget(prev => ({ ...prev, limit: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="period">Period</Label>
                  <Select value={newBudget.period} onValueChange={(value: 'monthly' | 'weekly') => setNewBudget(prev => ({ ...prev, period: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleAddBudget}>Add Budget</Button>
                  <Button variant="outline" onClick={() => setIsAddingBudget(false)}>Cancel</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Budgets List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Your Budgets</h3>
              <Button onClick={() => setIsAddingBudget(true)} className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Budget</span>
              </Button>
            </div>

            {budgets.length === 0 ? (
              <Card className="text-center py-8">
                <CardContent>
                  <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No budgets created</h3>
                  <p className="text-muted-foreground mb-4">Start by creating your first budget to track spending</p>
                  <Button onClick={() => setIsAddingBudget(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Budget
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {budgets.map((budget) => {
                  const percentage = (budget.spent / budget.limit) * 100;
                  const remaining = budget.limit - budget.spent;
                  
                  return (
                    <Card key={budget.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="flex flex-col">
                              <h4 className="font-semibold">{budget.category}</h4>
                              <p className="text-sm text-muted-foreground capitalize">{budget.period}</p>
                            </div>
                            {getStatusBadge(budget.spent, budget.limit)}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-destructive hover:bg-destructive/20"
                              onClick={() => deleteBudget(budget.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span>Spent: ₹{budget.spent.toLocaleString()}</span>
                            <span>Limit: ₹{budget.limit.toLocaleString()}</span>
                          </div>
                          
                          <Progress value={Math.min(percentage, 100)} className="h-3" />
                          
                          <div className="flex justify-between items-center text-sm">
                            <span className={percentage > 100 ? 'text-destructive font-semibold' : 'text-muted-foreground'}>
                              {percentage > 100 ? `Over by ₹${Math.abs(remaining).toLocaleString()}` : `₹${remaining.toLocaleString()} remaining`}
                            </span>
                            <span className="font-medium">
                              {percentage.toFixed(1)}% used
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};