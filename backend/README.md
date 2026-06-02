# 後端 - 體感溫度追蹤系統

## 📦 安裝依賴

```bash
npm install
```

## 🔧 環境配置

1. 複製 `.env.example` 為 `.env`：

```bash
cp .env.example .env
```

2. 編輯 `.env` 文件，配置 MongoDB 連接和伺服器設定：

```
MONGODB_URI=mongodb://localhost:27017/thermal-comfort-tracker
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

## 🚀 開發模式

使用 `ts-node` 執行 TypeScript 代碼：

```bash
npm run dev
```

伺服器會在 `http://localhost:5000` 啟動

## 🏗️ 構建生產版本

```bash
npm run build
npm start
```

## 📊 API 端點

### 1. 獲取過去 N 小時的趨勢數據

```
GET /api/thermal/trends?location=library_floor_2&hours=24
```

**參數：**
- `location` (必填): 場域名稱，例如 `library_floor_2`
- `hours` (可選): 查詢小時數，預設為 24

### 2. 添加新的體感溫度數據

```
POST /api/thermal/data
Content-Type: application/json

{
  "location": "library_floor_2",
  "temperature": 23.5
}
```

### 3. 獲取所有場域列表

```
GET /api/thermal/locations
```

### 4. 獲取最新的溫度數據

```
GET /api/thermal/latest?location=library_floor_2
```

詳細 API 文檔見：[API_DOCUMENTATION.md](../docs/API_DOCUMENTATION.md)