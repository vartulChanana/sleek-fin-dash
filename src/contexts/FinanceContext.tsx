import React, { createContext, useContext, useEffect, useState } from 'react';
import { Transaction, FinanceStats } from '@/types/transaction';
import { useToast } from '@/hooks/use-toast';

interface FinanceContextType {
  stats: FinanceStats;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  filterByMonth?: string;
  filterByCategory?: string;
  setFilterByMonth: (month: string) => void;
  setFilterByCategory: (category: string) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};

const STORAGE_KEY = 'finance-transactions';

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filterByMonth, setFilterByMonth] = useState<string>('');
  const [filterByCategory, setFilterByCategory] = useState<string>('');
  const { toast } = useToast();

  // Load transactions from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setTransactions(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to load transactions:', error);
      }
    }
  }, []);

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
    toast({
      title: "Transaction Added",
      description: `${transaction.type === 'income' ? '+' : '-'}₹${transaction.amount.toLocaleString()} - ${transaction.title}`,
    });
  };

  const updateTransaction = (id: string, updatedData: Partial<Transaction>) => {
    setTransactions(prev =>
      prev.map(transaction =>
        transaction.id === id ? { ...transaction, ...updatedData } : transaction
      )
    );
    toast({
      title: "Transaction Updated",
      description: "Your transaction has been successfully updated.",
    });
  };

  const deleteTransaction = (id: string) => {
    const transaction = transactions.find(t => t.id === id);
    setTransactions(prev => prev.filter(t => t.id !== id));
    toast({
      title: "Transaction Deleted",
      description: transaction ? `Deleted: ${transaction.title}` : "Transaction removed",
      variant: "destructive",
    });
  };

  // Calculate filtered transactions
  const filteredTransactions = transactions.filter(transaction => {
    if (filterByMonth && !transaction.date.startsWith(filterByMonth)) return false;
    if (filterByCategory && transaction.category !== filterByCategory) return false;
    return true;
  });

  // Calculate stats
  const stats: FinanceStats = {
    transactions: filteredTransactions,
    totalIncome: filteredTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0),
    totalExpenses: filteredTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0),
    get totalBalance() {
      return this.totalIncome - this.totalExpenses;
    },
  };

  return (
    <FinanceContext.Provider
      value={{
        stats,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        filterByMonth,
        filterByCategory,
        setFilterByMonth,
        setFilterByCategory,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};