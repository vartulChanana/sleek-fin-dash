import React, { useState } from 'react';
import { Plus, TrendingUp, TrendingDown, DollarSign, Trash2, Edit, BarChart3 } from 'lucide-react';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Investment {
  id: string;
  name: string;
  type: 'stocks' | 'mutual_funds' | 'bonds' | 'crypto' | 'real_estate' | 'fd' | 'other';
  buyPrice: number;
  currentPrice: number;
  quantity: number;
  purchaseDate: string;
}

interface InvestmentTrackerDialogProps {
  children: React.ReactNode;
}

const investmentTypes = [
  { value: 'stocks', label: 'Stocks', icon: '📈' },
  { value: 'mutual_funds', label: 'Mutual Funds', icon: '📊' },
  { value: 'bonds', label: 'Bonds', icon: '🏦' },
  { value: 'crypto', label: 'Cryptocurrency', icon: '₿' },
  { value: 'real_estate', label: 'Real Estate', icon: '🏠' },
  { value: 'fd', label: 'Fixed Deposit', icon: '💰' },
  { value: 'other', label: 'Other', icon: '💼' },
];

export const InvestmentTrackerDialog: React.FC<InvestmentTrackerDialogProps> = ({ children }) => {
  const [investments, setInvestments] = useState<Investment[]>([
    {
      id: '1',
      name: 'Reliance Industries',
      type: 'stocks',
      buyPrice: 2450,
      currentPrice: 2680,
      quantity: 10,
      purchaseDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'SBI Bluechip Fund',
      type: 'mutual_funds',
      buyPrice: 85,
      currentPrice: 92,
      quantity: 100,
      purchaseDate: '2024-02-01'
    },
    {
      id: '3',
      name: 'Bitcoin',
      type: 'crypto',
      buyPrice: 4500000,
      currentPrice: 4200000,
      quantity: 0.1,
      purchaseDate: '2024-01-20'
    }
  ]);
  const [isAddingInvestment, setIsAddingInvestment] = useState(false);
  const [newInvestment, setNewInvestment] = useState({
    name: '',
    type: 'stocks' as Investment['type'],
    buyPrice: '',
    currentPrice: '',
    quantity: '',
    purchaseDate: ''
  });
  const { toast } = useToast();

  const handleAddInvestment = () => {
    if (!newInvestment.name || !newInvestment.buyPrice || !newInvestment.currentPrice || !newInvestment.quantity) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const investment: Investment = {
      id: crypto.randomUUID(),
      name: newInvestment.name,
      type: newInvestment.type,
      buyPrice: Number(newInvestment.buyPrice),
      currentPrice: Number(newInvestment.currentPrice),
      quantity: Number(newInvestment.quantity),
      purchaseDate: newInvestment.purchaseDate || new Date().toISOString().split('T')[0]
    };

    setInvestments(prev => [...prev, investment]);
    setNewInvestment({ name: '', type: 'stocks', buyPrice: '', currentPrice: '', quantity: '', purchaseDate: '' });
    setIsAddingInvestment(false);
    
    toast({
      title: "Investment Added",
      description: `${newInvestment.name} has been added to your portfolio`
    });
  };

  const deleteInvestment = (id: string) => {
    const investment = investments.find(inv => inv.id === id);
    setInvestments(prev => prev.filter(inv => inv.id !== id));
    toast({
      title: "Investment Removed",
      description: investment ? `Removed: ${investment.name}` : "Investment removed",
      variant: "destructive"
    });
  };

  const updateCurrentPrice = (id: string, newPrice: number) => {
    setInvestments(prev => prev.map(inv => 
      inv.id === id ? { ...inv, currentPrice: newPrice } : inv
    ));
    toast({
      title: "Price Updated",
      description: "Current price has been updated"
    });
  };

  const calculatePL = (investment: Investment) => {
    const totalBought = investment.buyPrice * investment.quantity;
    const currentValue = investment.currentPrice * investment.quantity;
    return {
      amount: currentValue - totalBought,
      percentage: ((currentValue - totalBought) / totalBought) * 100
    };
  };

  const getTotalPortfolioValue = () => {
    return investments.reduce((total, inv) => total + (inv.currentPrice * inv.quantity), 0);
  };

  const getTotalInvestment = () => {
    return investments.reduce((total, inv) => total + (inv.buyPrice * inv.quantity), 0);
  };

  const getTotalPL = () => {
    const current = getTotalPortfolioValue();
    const invested = getTotalInvestment();
    return {
      amount: current - invested,
      percentage: invested > 0 ? ((current - invested) / invested) * 100 : 0
    };
  };

  const getTypeInfo = (type: string) => {
    return investmentTypes.find(t => t.value === type) || investmentTypes[6];
  };

  const totalPL = getTotalPL();

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5" />
            <span>Investment Tracker</span>
          </DialogTitle>
          <DialogDescription>
            Track your investment portfolio and monitor returns
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Portfolio Summary */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Invested</p>
                    <p className="text-lg font-semibold">₹{getTotalInvestment().toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Current Value</p>
                    <p className="text-lg font-semibold">₹{getTotalPortfolioValue().toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  {totalPL.amount >= 0 ? (
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-500" />
                  )}
                  <div>
                    <p className="text-sm text-muted-foreground">Total P&L</p>
                    <p className={`text-lg font-semibold ${totalPL.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {totalPL.amount >= 0 ? '+' : ''}₹{totalPL.amount.toLocaleString()}
                      <span className="text-sm ml-1">
                        ({totalPL.percentage >= 0 ? '+' : ''}{totalPL.percentage.toFixed(2)}%)
                      </span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Add Investment Form */}
          {isAddingInvestment && (
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Add New Investment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Investment Name *</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Apple Inc., SBI Mutual Fund"
                      value={newInvestment.name}
                      onChange={(e) => setNewInvestment(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Investment Type</Label>
                    <select 
                      className="w-full p-2 border rounded-md"
                      value={newInvestment.type}
                      onChange={(e) => setNewInvestment(prev => ({ ...prev, type: e.target.value as Investment['type'] }))}
                    >
                      {investmentTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.icon} {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="buyPrice">Buy Price (₹) *</Label>
                    <Input
                      id="buyPrice"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={newInvestment.buyPrice}
                      onChange={(e) => setNewInvestment(prev => ({ ...prev, buyPrice: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentPrice">Current Price (₹) *</Label>
                    <Input
                      id="currentPrice"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={newInvestment.currentPrice}
                      onChange={(e) => setNewInvestment(prev => ({ ...prev, currentPrice: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity *</Label>
                    <Input
                      id="quantity"
                      type="number"
                      step="0.001"
                      placeholder="0"
                      value={newInvestment.quantity}
                      onChange={(e) => setNewInvestment(prev => ({ ...prev, quantity: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="purchaseDate">Purchase Date</Label>
                  <Input
                    id="purchaseDate"
                    type="date"
                    value={newInvestment.purchaseDate}
                    onChange={(e) => setNewInvestment(prev => ({ ...prev, purchaseDate: e.target.value }))}
                  />
                </div>
                
                <div className="flex space-x-2">
                  <Button onClick={handleAddInvestment}>Add Investment</Button>
                  <Button variant="outline" onClick={() => setIsAddingInvestment(false)}>Cancel</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Investments List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Your Investments</h3>
              <Button onClick={() => setIsAddingInvestment(true)} className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Investment</span>
              </Button>
            </div>

            {investments.length === 0 ? (
              <Card className="text-center py-8">
                <CardContent>
                  <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No investments tracked</h3>
                  <p className="text-muted-foreground mb-4">Start tracking your investment portfolio</p>
                  <Button onClick={() => setIsAddingInvestment(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Investment
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {investments.map((investment) => {
                  const pl = calculatePL(investment);
                  const typeInfo = getTypeInfo(investment.type);
                  const totalValue = investment.currentPrice * investment.quantity;
                  
                  return (
                    <Card key={investment.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="text-xl">{typeInfo.icon}</div>
                            <div>
                              <h4 className="font-semibold">{investment.name}</h4>
                              <p className="text-sm text-muted-foreground">{typeInfo.label}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-6">
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">Quantity</p>
                              <p className="font-medium">{investment.quantity}</p>
                            </div>
                            
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">Buy Price</p>
                              <p className="font-medium">₹{investment.buyPrice.toLocaleString()}</p>
                            </div>
                            
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">Current Price</p>
                              <div className="flex items-center space-x-2">
                                <Input
                                  type="number"
                                  value={investment.currentPrice}
                                  onChange={(e) => updateCurrentPrice(investment.id, Number(e.target.value))}
                                  className="w-20 h-8 text-xs"
                                />
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">Current Value</p>
                              <p className="font-medium">₹{totalValue.toLocaleString()}</p>
                            </div>
                            
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">P&L</p>
                              <div className="flex flex-col items-end">
                                <p className={`font-semibold ${pl.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {pl.amount >= 0 ? '+' : ''}₹{pl.amount.toLocaleString()}
                                </p>
                                <Badge 
                                  variant={pl.amount >= 0 ? 'default' : 'destructive'}
                                  className="text-xs"
                                >
                                  {pl.percentage >= 0 ? '+' : ''}{pl.percentage.toFixed(2)}%
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-destructive hover:bg-destructive/20"
                                onClick={() => deleteInvestment(investment.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
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