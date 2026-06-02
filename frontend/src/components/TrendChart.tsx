import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { ThermalData } from '../types';
import { getTrendData } from '../api/thermalApi';
import './TrendChart.css';

interface TrendChartProps {
  location: string;
  hours?: number;
  title?: string;
}

export const TrendChart: React.FC<TrendChartProps> = ({
  location,
  hours = 24,
  title
}) => {
  const [data, setData] = useState<ThermalData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getTrendData(location, hours);
        
        // 格式化時間顯示
        const formattedData = response.data.map(item => ({
          ...item,
          time: new Date(item.time).toLocaleTimeString('zh-TW', {
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          })
        }));
        
        setData(formattedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : '無法獲取數據');
        console.error('Error fetching trend data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendData();
    
    // 每 5 分鐘重新整理一次數據
    const interval = setInterval(fetchTrendData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [location, hours]);

  if (loading && data.length === 0) {
    return <div className="trend-chart-loading">📊 加載中...</div>;
  }

  if (error) {
    return <div className="trend-chart-error">❌ 錯誤: {error}</div>;
  }

  if (data.length === 0) {
    return <div className="trend-chart-empty">📈 暫無數據</div>;
  }

  // 計算統計信息
  const temperatures = data.map(d => d.temperature);
  const avgTemp = (temperatures.reduce((a, b) => a + b, 0) / temperatures.length).toFixed(1);
  const maxTemp = Math.max(...temperatures).toFixed(1);
  const minTemp = Math.min(...temperatures).toFixed(1);

  return (
    <div className="trend-chart-container">
      <div className="trend-chart-header">
        <h2 className="trend-chart-title">
          {title || `📍 ${location} - 過去 ${hours} 小時體感溫度趨勢`}
        </h2>
        <div className="trend-chart-stats">
          <div className="stat-item">
            <span className="stat-label">平均溫度</span>
            <span className="stat-value">{avgTemp}°C</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">最高溫度</span>
            <span className="stat-value max">{maxTemp}°C</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">最低溫度</span>
            <span className="stat-value min">{minTemp}°C</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis
            label={{ value: '溫度 (°C)', angle: -90, position: 'insideLeft' }}
            domain={['dataMin - 1', 'dataMax + 1']}
          />
          <Tooltip
            formatter={(value) => [`${value.toFixed(1)}°C`, '溫度']}
            labelFormatter={(label) => `時間: ${label}`}
            contentStyle={{ backgroundColor: '#f5f5f5', border: '1px solid #ddd' }}
          />
          <Legend />
          
          {/* 參考線：顯示平均溫度 */}
          <ReferenceLine
            y={parseFloat(avgTemp)}
            stroke="#ff7300"
            strokeDasharray="5 5"
            label={{ value: `平均: ${avgTemp}°C`, position: 'right' }}
          />

          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ fill: '#8884d8', r: 4 }}
            activeDot={{ r: 6 }}
            name="體感溫度"
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="trend-chart-footer">
        <p className="trend-chart-info">
          📊 數據點: {data.length} | 最後更新: {new Date().toLocaleTimeString('zh-TW')}
        </p>
      </div>
    </div>
  );
};

export default TrendChart;