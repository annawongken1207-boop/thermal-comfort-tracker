# 🚀 完整安裝指南

## 前置條件

- **Node.js** 16 或更高版本
- **npm** 或 **yarn**
- **MongoDB**（本地或雲端如 MongoDB Atlas）
- **Git**

## 步驟 1：克隆項目

```bash
git clone https://github.com/annawongken1207-boop/thermal-comfort-tracker.git
cd thermal-comfort-tracker
```

## 步驟 2：後端設置

### 2.1 進入後端目錄

```bash
cd backend
```

### 2.2 安裝依賴

```bash
npm install
```

### 2.3 配置環境變量

複製範本文件：

```bash
cp .env.example .env
```

編輯 `.env` 文件，配置 MongoDB 連接：

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/thermal-comfort-tracker

# 如果使用 MongoDB Atlas（雲端）：
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/thermal-comfort-tracker

# Server
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### 2.4 啟動後端服務

開發模式：

```bash
npm run dev
```

生產模式：

```bash
npm run build
npm start
```

✅ 後端應在 `http://localhost:5000` 運行

## 步驟 3：前端設置

### 3.1 打開新終端，進入前端目錄

```bash
cd frontend
```

### 3.2 安裝依賴

```bash
npm install
```

### 3.3 配置環境變量

複製範本文件：

```bash
cp .env.example .env
```

`.env` 文件內容：

```
REACT_APP_API_URL=http://localhost:5000/api/thermal
```

### 3.4 啟動前端開發服務器

```bash
npm start
```

✅ 前端應在 `http://localhost:3000` 打開

## 步驟 4：測試系統

### 4.1 添加測試數據

打開另一個終端，使用 curl 或 Postman 添加溫度數據：

```bash
# 添加圖書館 2 樓的溫度數據
curl -X POST http://localhost:5000/api/thermal/data \
  -H "Content-Type: application/json" \
  -d '{
    "location": "library_floor_2",
    "temperature": 22.5
  }'
```

### 4.2 驗證數據

在瀏覽器中訪問：

```
http://localhost:5000/api/thermal/locations
http://localhost:5000/api/thermal/trends?location=library_floor_2&hours=24
```

### 4.3 查看前端

訪問 `http://localhost:3000`，應該能看到：
- 場域選擇器（包含 `library_floor_2`）
- 趨勢圖表顯示溫度變化

## 常見問題排除

### 問題：MongoDB 連接失敗

**解決方案：**
- 確保 MongoDB 已啟動（本地）或網絡連接正常（雲端）
- 檢查連接字符串是否正確
- 確保防火牆允許連接

### 問題：CORS 錯誤

**解決方案：**
- 檢查後端 `.env` 中的 `CORS_ORIGIN` 設置
- 如果在本地開發，應該是 `http://localhost:3000`

### 問題：前端無法連接後端

**解決方案：**
- 確保後端服務正在運行
- 檢查前端 `.env` 中的 `REACT_APP_API_URL`
- 在瀏覽器控制台檢查網絡請求（F12 > Network）

### 問題：頁面加載後沒有數據

**解決方案：**
- 確保已通過 API 添加了溫度數據
- 檢查瀏覽器控制台是否有錯誤
- 驗證場域名稱是否正確

## 部署到生產環境

### 前端部署（例如：Vercel）

```bash
cd frontend
npm run build
# 將 build 文件夾部署到 Vercel、Netlify 或其他主機
```

### 後端部署（例如：Heroku）

```bash
# 安裝 Heroku CLI
brew install heroku

# 登錄
heroku login

# 創建應用
heroku create your-app-name

# 設置環境變量
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set CORS_ORIGIN=https://your-frontend-url

# 部署
git push heroku main
```

---

祝安裝順利！ 🎉