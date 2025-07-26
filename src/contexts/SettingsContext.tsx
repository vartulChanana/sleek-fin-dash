import React, { createContext, useContext, useEffect, useState } from 'react';

interface SettingsContextType {
  currency: string;
  setCurrency: (currency: string) => void;
  language: string;
  setLanguage: (language: string) => void;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  notifications: boolean;
  setNotifications: (notifications: boolean) => void;
  budgetAlerts: boolean;
  setBudgetAlerts: (budgetAlerts: boolean) => void;
  weeklyReports: boolean;
  setWeeklyReports: (weeklyReports: boolean) => void;
  largeTransactions: boolean;
  setLargeTransactions: (largeTransactions: boolean) => void;
  saveSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState('INR');
  const [language, setLanguageState] = useState('en');
  const [darkMode, setDarkModeState] = useState(false);
  const [notifications, setNotificationsState] = useState(true);
  const [budgetAlerts, setBudgetAlertsState] = useState(true);
  const [weeklyReports, setWeeklyReportsState] = useState(true);
  const [largeTransactions, setLargeTransactionsState] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('sleekFinDashSettings');
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        setCurrencyState(settings.currency || 'INR');
        setLanguageState(settings.language || 'en');
        setDarkModeState(settings.darkMode || false);
        setNotificationsState(settings.notifications !== false);
        setBudgetAlertsState(settings.budgetAlerts !== false);
        setWeeklyReportsState(settings.weeklyReports !== false);
        setLargeTransactionsState(settings.largeTransactions || false);
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    }
  }, []);

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const saveSettings = () => {
    const settings = {
      currency,
      language,
      darkMode,
      notifications,
      budgetAlerts,
      weeklyReports,
      largeTransactions,
    };
    localStorage.setItem('sleekFinDashSettings', JSON.stringify(settings));
  };

  const setCurrency = (newCurrency: string) => {
    setCurrencyState(newCurrency);
    saveSettings();
  };

  const setLanguage = (newLanguage: string) => {
    setLanguageState(newLanguage);
    saveSettings();
  };

  const setDarkMode = (newDarkMode: boolean) => {
    setDarkModeState(newDarkMode);
    saveSettings();
  };

  const setNotifications = (newNotifications: boolean) => {
    setNotificationsState(newNotifications);
    saveSettings();
  };

  const setBudgetAlerts = (newBudgetAlerts: boolean) => {
    setBudgetAlertsState(newBudgetAlerts);
    saveSettings();
  };

  const setWeeklyReports = (newWeeklyReports: boolean) => {
    setWeeklyReportsState(newWeeklyReports);
    saveSettings();
  };

  const setLargeTransactions = (newLargeTransactions: boolean) => {
    setLargeTransactionsState(newLargeTransactions);
    saveSettings();
  };

  return (
    <SettingsContext.Provider value={{
      currency,
      setCurrency,
      language,
      setLanguage,
      darkMode,
      setDarkMode,
      notifications,
      setNotifications,
      budgetAlerts,
      setBudgetAlerts,
      weeklyReports,
      setWeeklyReports,
      largeTransactions,
      setLargeTransactions,
      saveSettings,
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};