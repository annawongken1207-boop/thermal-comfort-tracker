# 體感溫度歷史趨勢分析系統 (Thermal Comfort Tracker)

## 📋 項目概述

一個用於追蹤和分析環境體感溫度變化的系統。通過折線圖展示過去24小時的體感溫度趨勢，幫助用戶了解環境變化規律（例如：圖書館某樓層下午2點後通常會變熱）。

## 🛠️ 技術棧

### 前端
- **React 18** + TypeScript
- **Recharts** - 用於繪製趨勢圖表
- **Axios** - HTTP 客戶端
- **CSS Modules** - 樣式

### 後端
- **Node.js** + Express
- **MongoDB** - 資料庫
- **Mongoose** - MongoDB ODM

## 📁 專案結構

```
thermal-comfort-tracker/
├── frontend/                    # React 前端應用
│   ├── src/
│   │   ├── components/
│   │   │   └── TrendChart.tsx   # 24小時趨勢圖表組件
│   │   ├── pages/
│   │   ├── api/                 # API 服務
│   │   ├── types/               # TypeScript 型別定義
│   │   └── App.tsx
│   ├── package.json
│   └── tsconfig.json
├── backend/                     # Node.js/Express 後端
│   ├── src/
│   │   ├── models/              # Mongoose 模型
│   │   │   └── ThermalData.ts
│   │   ├── routes/              # API 路由
│   │   │   └── thermal.ts
│   │   ├── controllers/         # 控制器
│   │   │   └── thermalController.ts
│   │   ├── middleware/
│   │   ├── db.ts                # 資料庫連接
│   │   └── server.ts            # 主伺服器檔
│   ├── .env.example
│   └── package.json
├── docs/                        # 文檔
├── .gitignore
└── README.md
```

## 🚀 快速開始

### 前置需求
- Node.js 16+
- MongoDB（本地或雲端）
- npm 或 yarn

### 安裝和執行

詳見各個資料夾的 README.md：
- [後端設置](./backend/README.md)
- [前端設置](./frontend/README.md)
- [完整安裝指南](./docs/SETUP.md)

## 📊 功能特性

- ✅ 實時採集體感溫度數據
- ✅ 24小時歷史趨勢折線圖
- ✅ 按場域（如圖書館樓層）分類顯示
- ✅ 數據統計（平均、最高、最低溫度）
- ✅ 數據持久化存儲
- ✅ RESTful API
- ✅ 響應式設計
- ✅ 自動數據更新

## 📝 API 文檔

詳見 [API 文檔](./docs/API_DOCUMENTATION.md)

### 主要端點

```bash
# 獲取過去24小時的趨勢數據
GET /api/thermal/trends?location=library_floor_2&hours=24

# 添加新的溫度數據
POST /api/thermal/data
{ "location": "library_floor_2", "temperature": 23.5 }

# 獲取所有場域列表
GET /api/thermal/locations

# 獲取最新溫度數據
GET /api/thermal/latest?location=library_floor_2
```

## 🎨 主要組件

### TrendChart
折線圖組件，用於視覺化體感溫度變化：
- 支持自定義時間範圍
- 顯示統計數據（平均、最高、最低）
- 自動刷新數據

### LocationSelector
場域選擇器，用於選擇要監測的位置

### App
主應用組件，整合所有功能

## 📚 文檔

- [完整安裝指南](./docs/SETUP.md)
- [API 文檔](./docs/API_DOCUMENTATION.md)
- [後端 README](./backend/README.md)
- [前端 README](./frontend/README.md)

## 🔧 開發

### 啟動開發環境

```bash
# 終端 1：啟動後端
cd backend
npm install
npm run dev

# 終端 2：啟動前端
cd frontend
npm install
npm start
```

後端運行在 `http://localhost:5000`
前端運行在 `http://localhost:3000`

## 🐛 故障排除

遇到問題？查看 [SETUP.md](./docs/SETUP.md) 中的常見問題部分

## 📊 示例數據

可以通過 API 添加測試數據：

```bash
curl -X POST http://localhost:5000/api/thermal/data \
  -H "Content-Type: application/json" \
  -d '{
    "location": "library_floor_2",
    "temperature": 22.5
  }'
```

## 🤝 貢獻

歡迎提交 Pull Request 和 Issue！

## 📄 License

MIT

---

**最後更新**：2026 年 6 月 2 日