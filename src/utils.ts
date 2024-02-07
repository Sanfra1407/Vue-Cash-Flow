export const formatCurrency = (format: string, amount: number): string => {
  return new Intl.NumberFormat(format, { minimumFractionDigits: 2 }).format(amount);
}