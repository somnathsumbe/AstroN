export interface MarketEvent {
  targetDegree: number;
  crossingDate: string;
  day: string;
  observationTime: string;
  observedDegree: number;
}

export interface MarketYear {
  year: number;
  events: MarketEvent[];
}
