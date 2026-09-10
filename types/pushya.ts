export interface PushyaEvent {
  year: number;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}

export interface PushyaYear {
  year: number;
  nakshatra: string;
  verificationStatus: string;
  secondarySource: string;
  events: PushyaEvent[];
}

export interface PushyaDataset {
  dataset: string;
  period: string;
  location: {
    city: string;
    state: string;
    country: string;
    timezone: string;
    timezoneOffset: string;
  };
  primarySource: string;
  crossCheckMethod: string;
  duplicateRemoved: boolean;
  totalEvents: number;
  years: PushyaYear[];
}
