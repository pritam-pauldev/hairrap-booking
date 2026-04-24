export const SORT_OPTIONS = [
  "Price Low to High",
  "Price High to Low",
  "Rating",
  "Most Popular",
];

export const PAGE_SIZE = 9;

export const defaultFilters = {
  keyword: "",
  category: "",
  maxPrice: 999,
  minRating: 0,
};

export function applyFilters(services, filters) {
  return services.filter((s) => {
    if (
      filters.keyword &&
      !s.name.toLowerCase().includes(filters.keyword.toLowerCase()) &&
      !s.salon.toLowerCase().includes(filters.keyword.toLowerCase())
    )
      return false;
    if (filters.category && s.category !== filters.category) return false;
    if (s.price > filters.maxPrice) return false;
    if (s.rating < filters.minRating) return false;
    return true;
  });
}

export function applySort(list, sort) {
  if (sort === "Price Low to High")
    return [...list].sort((a, b) => a.price - b.price);
  if (sort === "Price High to Low")
    return [...list].sort((a, b) => b.price - a.price);
  if (sort === "Rating") return [...list].sort((a, b) => b.rating - a.rating);
  return list;
}
