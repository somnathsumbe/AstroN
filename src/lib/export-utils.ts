import type { MarketRecord } from '@/src/types/weekly-market-tracking';

export function exportMarketCsv(records: MarketRecord[]): void {
  const headers = ['Target Degree', 'Crossing Date', 'Day', 'Observation Time', 'Observed Degree'];
  const rows = records.map((record) => [
    record.targetDegree,
    record.dateLabel,
    record.day,
    record.observationTime,
    record.observedDegree.toFixed(6),
  ]);
  const csv = [headers, ...rows]
    .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(','))
    .join('\n');
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'jupiter-venus-tracking.csv';
  link.click();
  URL.revokeObjectURL(url);
}
