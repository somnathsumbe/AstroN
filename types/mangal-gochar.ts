export interface MangalEvent {
  date: string;
  day: string;
  planet: string;
  event: string;
  rashi: string;
  time: string;
  vakri: boolean;
}

export interface MangalYear {
  year: number;
  events: MangalEvent[];
}
