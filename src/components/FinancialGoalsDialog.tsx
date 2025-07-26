import React, { useState } from 'react';
import { Plus, Target, Calendar, Trash2, Edit, Trophy } from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface FinancialGoal {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: 'emergency' | 'vacation' | 'house' | 'car' | 'education' | 'other';
}

interface FinancialGoalsDialogProps {
  children: React.ReactNode;
}

const goalCategories = [
  { value: 'emergency', label: 'Emergency Fund', icon: '🛡️' },
  { value: 'vacation', label: 'Vacation', icon: '✈️' },
  { value: 'house', label: 'House/Property', icon: '🏠' },
  { value: 'car', label: 'Car/Vehicle', icon: '🚗' },
  { value: 'education', label: 'Education', icon: '🎓' },
  { value: 'other', label: 'Other', icon: '🎯' },
];

export const FinancialGoalsDialog: React.FC<FinancialGoalsDialogProps> = ({ children }) => {
  const [goals, setGoals] = useState<FinancialGoal[]>([
    {
      id: '1',
      title: 'Emergency Fund',
      description: 'Build 6 months of expenses for emergencies',
      targetAmount: 300000,
      currentAmount: 125000,
      targetDate: '2024-12-31',
      category: 'emergency'
    },
    {
      id: '2',
      title: 'Vacation to Europe',
      description: 'Save for a 2-week European vacation',
      targetAmount: 200000,
      currentAmount: 85000,
      targetDate: '2024-08-15',
      category: 'vacation'
    }
  ]);
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    targetAmount: '',
    targetDate: '',
    category: 'other' as FinancialGoal['category']
  });
  const { toast } = useToast();

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.targetAmount || !newGoal.targetDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const goal: FinancialGoal = {
      id: crypto.randomUUID(),
      title: newGoal.title,
      description: newGoal.description,
      targetAmount: Number(newGoal.targetAmount),
      currentAmount: 0,
      targetDate: newGoal.targetDate,
      category: newGoal.category
    };

    setGoals(prev => [...prev, goal]);
    setNewGoal({ title: '', description: '', targetAmount: '', targetDate: '', category: 'other' });
    setIsAddingGoal(false);
    
    toast({
      title: "Goal Created",
      description: `Your goal "${newGoal.title}" has been added`
    });
  };

  const deleteGoal = (id: string) => {
    const goal = goals.find(g => g.id === id);
    setGoals(prev => prev.filter(g => g.id !== id));
    toast({
      title: "Goal Deleted",
      description: goal ? `Deleted: ${goal.title}` : "Goal removed",
      variant: "destructive"
    });
  };

  const addToGoal = (id: string, amount: number) => {
    setGoals(prev => prev.map(goal => 
      goal.id === id 
        ? { ...goal, currentAmount: Math.min(goal.currentAmount + amount, goal.targetAmount) }
        : goal
    ));
    
    toast({
      title: "Progress Updated",
      description: `Added ₹${amount.toLocaleString()} to your goal`
    });
  };

  const getCategoryInfo = (category: string) => {
    return goalCategories.find(cat => cat.value === category) || goalCategories[5];
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 75) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  const getDaysRemaining = (targetDate: string) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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
            <span>Financial Goals</span>
          </DialogTitle>
          <DialogDescription>
            Set and track your savings goals to achieve your financial dreams
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Add Goal Form */}
          {isAddingGoal && (
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Create New Goal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Goal Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Emergency Fund"
                      value={newGoal.title}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select 
                      className="w-full p-2 border rounded-md"
                      value={newGoal.category}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, category: e.target.value as FinancialGoal['category'] }))}
                    >
                      {goalCategories.map(cat => (
                        <option key={cat.value} value={cat.value}>
                          {cat.icon} {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your goal..."
                    value={newGoal.description}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="targetAmount">Target Amount (₹) *</Label>
                    <Input
                      id="targetAmount"
                      type="number"
                      placeholder="Enter target amount"
                      value={newGoal.targetAmount}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, targetAmount: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="targetDate">Target Date *</Label>
                    <Input
                      id="targetDate"
                      type="date"
                      value={newGoal.targetDate}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, targetDate: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button onClick={handleAddGoal}>Create Goal</Button>
                  <Button variant="outline" onClick={() => setIsAddingGoal(false)}>Cancel</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Goals List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Your Goals</h3>
              <Button onClick={() => setIsAddingGoal(true)} className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Goal</span>
              </Button>
            </div>

            {goals.length === 0 ? (
              <Card className="text-center py-8">
                <CardContent>
                  <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No goals set</h3>
                  <p className="text-muted-foreground mb-4">Set your first financial goal to start tracking your progress</p>
                  <Button onClick={() => setIsAddingGoal(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Goal
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {goals.map((goal) => {
                  const percentage = (goal.currentAmount / goal.targetAmount) * 100;
                  const remaining = goal.targetAmount - goal.currentAmount;
                  const daysRemaining = getDaysRemaining(goal.targetDate);
                  const categoryInfo = getCategoryInfo(goal.category);
                  
                  return (
                    <Card key={goal.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl">{categoryInfo.icon}</div>
                            <div>
                              <h4 className="font-semibold text-lg">{goal.title}</h4>
                              <p className="text-sm text-muted-foreground">{goal.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {percentage >= 100 && (
                              <Badge className="bg-green-500">
                                <Trophy className="w-3 h-3 mr-1" />
                                Completed
                              </Badge>
                            )}
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-destructive hover:bg-destructive/20"
                              onClick={() => deleteGoal(goal.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex justify-between items-center text-sm">
                            <span>Progress: ₹{goal.currentAmount.toLocaleString()} / ₹{goal.targetAmount.toLocaleString()}</span>
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4" />
                              <span className={daysRemaining < 0 ? 'text-destructive' : 'text-muted-foreground'}>
                                {daysRemaining < 0 ? `${Math.abs(daysRemaining)} days overdue` : `${daysRemaining} days left`}
                              </span>
                            </div>
                          </div>
                          
                          <Progress value={Math.min(percentage, 100)} className="h-3" />
                          
                          <div className="flex justify-between items-center">
                            <div className="text-sm">
                              <span className="font-medium">{percentage.toFixed(1)}% completed</span>
                              {percentage < 100 && (
                                <span className="text-muted-foreground ml-2">
                                  ₹{remaining.toLocaleString()} remaining
                                </span>
                              )}
                            </div>
                            
                            {percentage < 100 && (
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => addToGoal(goal.id, 1000)}
                                >
                                  +₹1,000
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => addToGoal(goal.id, 5000)}
                                >
                                  +₹5,000
                                </Button>
                              </div>
                            )}
                          </div>
                          
                          <div className="text-xs text-muted-foreground">
                            Target Date: {format(new Date(goal.targetDate), 'MMM d, yyyy')}
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