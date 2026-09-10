export type AstroEventType =
  | 'PURNIMA'
  | 'AMAVASYA'
  | 'DEGREE'
  | 'BHADRA'
  | 'PANCHAK'
  | 'MANGAL_GOCHAR'
  | 'EQUINOX'
  | 'CUSTOM';

export type AstroEventPriority = 'HIGH' | 'MEDIUM' | 'LOW';
export type AstroEventStatus = 'TODAY' | 'UPCOMING' | 'EXPIRED';

export interface AstroEvent {
  id: string;
  type: AstroEventType;
  title: string;
  shortTitle: string;
  eventDate: string;
  displayDate: string;
  description?: string;
  degree?: number;
  actualDegree?: number;
  marketStatus?: string;
  sourcePage: string;
  route: string;
  icon: string;
  priority?: AstroEventPriority;
  status?: AstroEventStatus;
}
