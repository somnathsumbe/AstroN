export interface ShukraEvent {
  date: string;
  day: string;
  event: string;
  rashi: string;
  time: string;
  vakri: boolean;
}

export interface ShukraData {
  planet: string;
  gochar: Record<string, ShukraEvent[]>;
}
