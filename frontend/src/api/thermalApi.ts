import axios from 'axios';
import { TrendResponse, LatestDataResponse, LocationsResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/thermal';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000
});

// 獲取過去 N 小時的趨勢數據
export const getTrendData = async (
  location: string,
  hours: number = 24
): Promise<TrendResponse> => {
  const response = await api.get<TrendResponse>('/trends', {
    params: { location, hours }
  });
  return response.data;
};

// 添加新的體感溫度數據
export const addThermalData = async (
  location: string,
  temperature: number
): Promise<{ message: string; data: any }> => {
  const response = await api.post('/data', {
    location,
    temperature
  });
  return response.data;
};

// 獲取所有場域列表
export const getLocations = async (): Promise<LocationsResponse> => {
  const response = await api.get<LocationsResponse>('/locations');
  return response.data;
};

// 獲取最新的溫度數據
export const getLatestData = async (location?: string): Promise<LatestDataResponse> => {
  const response = await api.get<LatestDataResponse>('/latest', {
    params: location ? { location } : {}
  });
  return response.data;
};

export default api;