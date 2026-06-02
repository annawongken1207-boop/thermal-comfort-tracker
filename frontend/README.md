# 前端 - 體感溫度追蹤系統

## 📦 安裝依賴

```bash
npm install
```

## 🔧 環境配置

1. 複製 `.env.example` 為 `.env`：

```bash
cp .env.example .env
```

2. 編輯 `.env` 文件，配置後端 API URL：

```
REACT_APP_API_URL=http://localhost:5000/api/thermal
```

## 🚀 開發模式

啟動開發伺服器：

```bash
npm start
```

應用會自動在 `http://localhost:3000` 打開

## 🏗️ 構建生產版本

```bash
npm run build
```

生成的優化版本會在 `build` 資料夾中

## 🧪 測試

執行測試：

```bash
npm test
```

## 📊 主要功能

### 1. **LocationSelector 組件**
- 從後端獲取所有可用的場域列表
- 允許用戶選擇要監測的位置
- 自動載入第一個場域

### 2. **TrendChart 組件**
- 使用 Recharts 繪製 24 小時體感溫度趨勢折線圖
- 顯示以下統計信息：
  - 平均溫度
  - 最高溫度
  - 最低溫度
- 參考線顯示平均溫度水平
- 每 5 分鐘自動更新一次數據

### 3. **App 組件**
- 主儀表板，整合所有子組件
- 支持調整查詢時間範圍（6、12、24、48、72 小時）
- 響應式設計，支援桌面和行動設備

## 🎨 設計特點

- **現代化 UI**：使用漸變顏色和陰影效果
- **響應式設計**：完美適配各種屏幕尺寸
- **交互性**：圖表支持懸停放大顯示，平滑動畫

## 📚 技術棧

- **React 18** - UI 框架
- **TypeScript** - 類型安全
- **Recharts** - 圖表庫
- **Axios** - HTTP 客戶端

## 🔗 API 集成

前端通過 `src/api/thermalApi.ts` 與後端通信：

- `getTrendData()` - 獲取趨勢數據
- `getLocations()` - 獲取場域列表
- `getLatestData()` - 獲取最新溫度
- `addThermalData()` - 上傳新數據

## 📝 項目結構

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   └── thermalApi.ts          # API 服務
│   ├── components/
│   │   ├── TrendChart.tsx         # 趨勢圖表
│   │   ├── TrendChart.css
│   │   ├── LocationSelector.tsx   # 場域選擇器
│   │   └── LocationSelector.css
│   ├── types/
│   │   └── index.ts               # 型別定義
│   ├── App.tsx                    # 主應用組件
│   ├── App.css
│   ├── index.tsx
│   └── index.css
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

## 🚀 快速開始

1. 確保後端服務運行在 `http://localhost:5000`
2. 安裝依賴：`npm install`
3. 啟動開發伺服器：`npm start`
4. 在瀏覽器中打開 `http://localhost:3000`

## 💡 使用示例

```typescript
import TrendChart from './components/TrendChart';

// 在任何頁面中使用趨勢圖表
<TrendChart 
  location="library_floor_2" 
  hours={24}
  title="圖書館二樓溫度趨勢"
/>
```

## 📄 License

MIT