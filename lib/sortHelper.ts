export function sortByDateDesc<T>(
  arr: T[] | undefined,
  dateField: keyof T
): T[] {
  if (!arr) return [];
  return [...arr].sort((a, b) => {
    const dateA = a[dateField] ? String(a[dateField]) : '';
    const dateB = b[dateField] ? String(b[dateField]) : '';
    // String comparison works well for ISO dates (YYYY-MM-DD) and years (YYYY)
    return dateB.localeCompare(dateA);
  });
}
