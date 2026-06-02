import React, { useState } from 'react';
import TrendChart from './components/TrendChart';
import LocationSelector from './components/LocationSelector';
import './App.css';

function App() {
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [hours, setHours] = useState<number>(24);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">🌡️ 體感溫度歷史趨勢分析系統</h1>
          <p className="app-subtitle">實時監測環境體感溫度變化</p>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          {/* 場域選擇器 */}
          <LocationSelector
            onLocationChange={setSelectedLocation}
            selectedLocation={selectedLocation}
          />

          {/* 時間範圍選擇 */}
          <div className="controls">
            <label htmlFor="hours-select" className="control-label">
              ⏱️ 查詢時間範圍：
            </label>
            <select
              id="hours-select"
              value={hours}
              onChange={(e) => setHours(parseInt(e.target.value, 10))}
              className="control-select"
            >
              <option value={6}>過去 6 小時</option>
              <option value={12}>過去 12 小時</option>
              <option value={24}>過去 24 小時</option>
              <option value={48}>過去 48 小時</option>
              <option value={72}>過去 72 小時</option>
            </select>
          </div>

          {/* 趨勢圖表 */}
          {selectedLocation && (
            <TrendChart
              location={selectedLocation}
              hours={hours}
            />
          )}

          {!selectedLocation && (
            <div className="placeholder">
              <p>👆 請選擇一個場域來查看體感溫度趨勢</p>
            </div>
          )}

          {/* 信息面板 */}
          <div className="info-panel">
            <h3>📚 使用說明</h3>
            <ul>
              <li>
                <strong>選擇場域：</strong> 從下拉菜單中選擇要監測的位置（例如：圖書館某樓層）
              </li>
              <li>
                <strong>調整時間範圍：</strong> 選擇要查看的歷史時間段（6小時至72小時）
              </li>
              <li>
                <strong>分析趨勢：</strong> 圖表會顯示所選時間段內的體感溫度變化，包括最高、最低和平均溫度
              </li>
              <li>
                <strong>實用建議：</strong> 利用歷史趨勢數據提前計劃，例如在圖書館通常變熱的時間段內採取降溫措施
              </li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>© 2026 體感溫度追蹤系統 | 版本 1.0.0</p>
      </footer>
    </div>
  );
}

export default App;