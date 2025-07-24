import React, { useState } from 'react';
import { Plus, DollarSign, FileText, Calendar, Tag, Sparkles, ArrowLeft, Save } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useFinance } from '@/contexts/FinanceContext';
import { CATEGORIES } from '@/types/transaction';
import { useNavigate } from 'react-router-dom';

export const ModernAddTransaction = () => {
  const { addTransaction } = useFinance();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'expense' as 'income' | 'expense',
    category: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.amount || parseFloat(formData.amount) <= 0) newErrors.amount = 'Amount must be greater than 0';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.date) newErrors.date = 'Date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    addTransaction({
      title: formData.title.trim(),
      amount: parseFloat(formData.amount),
      type: formData.type,
      category: formData.category,
      date: formData.date,
      notes: formData.notes.trim(),
    });

    // Reset form
    setFormData({
      title: '',
      amount: '',
      type: 'expense',
      category: '',
      date: new Date().toISOString().split('T')[0],
      notes: '',
    });
    
    navigate('/');
  };

  return (
    <div className="space-y-8">
      {/* Modern Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 rounded-3xl blur-3xl"></div>
        <div className="relative glass rounded-3xl p-8 border border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate('/')}
                className="h-12 w-12 rounded-2xl hover:bg-muted/30"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <h1 className="text-4xl font-bold gradient-text">Add Transaction</h1>
                  <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                </div>
                <p className="text-lg text-muted-foreground">
                  Record your financial activity with ease
                </p>
              </div>
            </div>
            <div className="text-right">
              <Badge variant="secondary" className="glass px-4 py-2 text-sm">
                Quick Entry
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="glass border-border/50 overflow-hidden">
          <CardHeader className="border-b border-border/30 bg-gradient-to-r from-background/50 to-background/30">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-primary to-primary-glow rounded-2xl shadow-neon">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Transaction Details</CardTitle>
                <CardDescription>Fill in the information below</CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Transaction Type Toggle */}
              <div className="flex justify-center">
                <div className="flex bg-muted/30 rounded-2xl p-2 glass">
                  <Button
                    type="button"
                    variant={formData.type === 'income' ? 'default' : 'ghost'}
                    className={`px-8 py-3 rounded-xl transition-all duration-300 ${formData.type === 'income' 
                      ? 'bg-gradient-to-r from-income to-emerald-400 text-white shadow-lg' 
                      : 'text-muted-foreground hover:text-foreground'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, type: 'income', category: '' }))}
                  >
                    💰 Income
                  </Button>
                  <Button
                    type="button"
                    variant={formData.type === 'expense' ? 'default' : 'ghost'}
                    className={`px-8 py-3 rounded-xl transition-all duration-300 ${formData.type === 'expense' 
                      ? 'bg-gradient-to-r from-expense to-red-400 text-white shadow-lg' 
                      : 'text-muted-foreground hover:text-foreground'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, type: 'expense', category: '' }))}
                  >
                    💸 Expense
                  </Button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="space-y-3 md:col-span-2">
                  <Label htmlFor="title" className="flex items-center space-x-2 text-sm font-medium">
                    <FileText className="w-4 h-4 text-primary" />
                    <span>Transaction Title</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="Enter a descriptive title..."
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className={`h-12 glass border-border/50 focus:border-primary/50 rounded-xl ${errors.title ? 'border-destructive' : ''}`}
                  />
                  {errors.title && <p className="text-sm text-destructive flex items-center space-x-1">
                    <span>⚠️</span>
                    <span>{errors.title}</span>
                  </p>}
                </div>

                {/* Amount */}
                <div className="space-y-3">
                  <Label htmlFor="amount" className="flex items-center space-x-2 text-sm font-medium">
                    <DollarSign className="w-4 h-4 text-primary" />
                    <span>Amount</span>
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.amount}
                      onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                      className={`h-12 pl-12 glass border-border/50 focus:border-primary/50 rounded-xl ${errors.amount ? 'border-destructive' : ''}`}
                    />
                  </div>
                  {errors.amount && <p className="text-sm text-destructive flex items-center space-x-1">
                    <span>⚠️</span>
                    <span>{errors.amount}</span>
                  </p>}
                </div>

                {/* Date */}
                <div className="space-y-3">
                  <Label htmlFor="date" className="flex items-center space-x-2 text-sm font-medium">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>Date</span>
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className={`h-12 glass border-border/50 focus:border-primary/50 rounded-xl ${errors.date ? 'border-destructive' : ''}`}
                  />
                  {errors.date && <p className="text-sm text-destructive flex items-center space-x-1">
                    <span>⚠️</span>
                    <span>{errors.date}</span>
                  </p>}
                </div>

                {/* Category */}
                <div className="space-y-3 md:col-span-2">
                  <Label htmlFor="category" className="flex items-center space-x-2 text-sm font-medium">
                    <Tag className="w-4 h-4 text-primary" />
                    <span>Category</span>
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className={`h-12 glass border-border/50 focus:border-primary/50 rounded-xl ${errors.category ? 'border-destructive' : ''}`}>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="glass border-border/50">
                      {CATEGORIES[formData.type].map((category) => (
                        <SelectItem key={category} value={category} className="hover:bg-muted/50">
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-sm text-destructive flex items-center space-x-1">
                    <span>⚠️</span>
                    <span>{errors.category}</span>
                  </p>}
                </div>

                {/* Notes */}
                <div className="space-y-3 md:col-span-2">
                  <Label htmlFor="notes" className="text-sm font-medium">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any additional details or context..."
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    rows={4}
                    className="glass border-border/50 focus:border-primary/50 rounded-xl resize-none"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex space-x-4 pt-6 border-t border-border/30">
                <Button 
                  type="submit" 
                  className="flex-1 h-14 btn-modern rounded-2xl text-lg font-semibold"
                >
                  <Save className="w-5 h-5 mr-3" />
                  Save Transaction
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/')}
                  className="px-8 h-14 glass border-border/50 rounded-2xl hover:bg-muted/30"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};