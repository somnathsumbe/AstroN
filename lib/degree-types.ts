export interface GannZillaEntry {
  year: number;
  date: string;
  softwareTime: string;
  indianTime: string;
}

export interface DegreeCalculatorData {
  tithi: string;
  location: string;
  entries: GannZillaEntry[];
}

export interface DegreeResult {
  id: string;
  targetDegree: number;
  days: number;
  calendarDate: Date;
  day: string;
  marketStatus: 'TRADING DAY' | 'WEEKEND';
  testDate: string;
  actualDegree: number;
}
