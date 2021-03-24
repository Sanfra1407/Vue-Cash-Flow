/**
 * @function formatCurrency()
 * 
 * @param {String} format 
 * @param {float} amount 
 * 
 * @returns {String}
 */

export const formatCurrency = (format, amount) => {
  return new Intl.NumberFormat(format, { minimumFractionDigits: 2 }).format(amount);
}