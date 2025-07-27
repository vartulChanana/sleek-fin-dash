interface CurrencyConfig {
  symbol: string;
  code: string;
  name: string;
}

export const CURRENCIES: Record<string, CurrencyConfig> = {
  INR: { symbol: '₹', code: 'INR', name: 'Indian Rupee' },
  USD: { symbol: '$', code: 'USD', name: 'US Dollar' },
  EUR: { symbol: '€', code: 'EUR', name: 'Euro' },
  GBP: { symbol: '£', code: 'GBP', name: 'British Pound' },
};

export const formatCurrency = (amount: number, currencyCode: string = 'INR'): string => {
  const currency = CURRENCIES[currencyCode] || CURRENCIES.INR;
  return `${currency.symbol}${amount.toLocaleString()}`;
};

export const getCurrencySymbol = (currencyCode: string = 'INR'): string => {
  return CURRENCIES[currencyCode]?.symbol || CURRENCIES.INR.symbol;
};