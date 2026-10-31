export const filterPackagesByCategory = (packages, categoryId) => {
  if (!categoryId || categoryId === 'all') return packages;
  return packages.filter((pkg) => pkg.category?.toLowerCase() === categoryId.toLowerCase());
};

export const searchPackagesByQuery = (packages, query) => {
  if (!query || !query.trim()) return packages;
  const q = query.toLowerCase().trim();
  return packages.filter(
    (pkg) =>
      pkg.title?.toLowerCase().includes(q) ||
      pkg.destination?.toLowerCase().includes(q) ||
      pkg.location?.toLowerCase().includes(q) ||
      pkg.tags?.some((t) => t.toLowerCase().includes(q))
  );
};

export const calculatePackageTotal = ({
  basePrice,
  adults = 2,
  children = 0,
  childPricePercent = 0.5,
  couponDiscount = 0,
  taxRate = 0.12,
}) => {
  const adultSubtotal = basePrice * (adults / 2);
  const childSubtotal = basePrice * children * childPricePercent;
  const subtotal = Math.max(0, adultSubtotal + childSubtotal);
  const discount = Math.min(subtotal, couponDiscount);
  const taxableAmount = subtotal - discount;
  const taxes = Math.round(taxableAmount * taxRate);
  const total = taxableAmount + taxes;

  return {
    subtotal: Math.round(subtotal),
    discount: Math.round(discount),
    taxes: Math.round(taxes),
    total: Math.round(total),
  };
};
