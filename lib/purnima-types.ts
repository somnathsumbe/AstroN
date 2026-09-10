export interface PurnimaTiming {
  date: string;
  time: string;
}

export interface PurnimaEntry {
  name: string;
  date: string;
  begins: PurnimaTiming;
  ends: PurnimaTiming;
}

export interface PurnimaData {
  dataType: string;
  calendar: string;
  timezone: string;
  yearRange: string;
  years: Record<string, PurnimaEntry[]>;
}
