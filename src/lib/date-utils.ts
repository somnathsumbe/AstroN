const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export function formatLongDate(value: string): string {
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day || !MONTHS[month - 1]) return value;
  return `${String(day).padStart(2, '0')}-${MONTHS[month - 1]}-${year}`;
}

export function monthName(value: string): string {
  const month = Number(value.split('-')[1]);
  return MONTHS[month - 1] || '';
}

export function dateKey(value: string): number {
  const [year, month, day] = value.split('-').map(Number);
  return Date.UTC(year, month - 1, day);
}

export function isWeekend(day: string): boolean {
  return day === 'Saturday' || day === 'Sunday';
}
