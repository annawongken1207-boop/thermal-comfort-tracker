export interface ThermalData {
  time: string;
  temperature: number;
}

export interface TrendResponse {
  location: string;
  hours: number;
  count: number;
  data: ThermalData[];
}

export interface LatestDataResponse {
  location: string;
  temperature: number;
  timestamp: string;
}

export interface LocationsResponse {
  locations: string[];
  count: number;
}