export const formatRupiah = (value: number | string): string => {
  const number = typeof value === 'string' ? parseFloat(value) : value;

  return `Rp. ${number.toLocaleString('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
};
