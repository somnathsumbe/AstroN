export interface PanchakEntry {
  year: number;
  month: string;
  start: string;
  end: string;
}

export interface PanchakViewRow extends PanchakEntry {
  index: number;
  startDateFormatted: string;
  startTimeFormatted: string;
  endDateFormatted: string;
  endTimeFormatted: string;
  startDay: string;
  endDay: string;
  marketStatus: 'TRADING DAY' | 'WEEKEND';
  testDate: string;
}
