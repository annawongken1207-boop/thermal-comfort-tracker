# 📚 API 文檔

基礎 URL: `http://localhost:5000/api/thermal`

## 端點列表

### 1. 獲取過去 N 小時的趨勢數據

```
GET /api/thermal/trends
```

**查詢參數：**

| 參數 | 類型 | 必填 | 描述 |
|------|------|------|------|
| `location` | string | ✅ | 場域名稱（例如：library_floor_2） |
| `hours` | number | ❌ | 查詢小時數，預設 24 |

**範例請求：**

```bash
GET /api/thermal/trends?location=library_floor_2&hours=24
```

**成功響應（200）：**

```json
{
  "location": "library_floor_2",
  "hours": 24,
  "count": 48,
  "data": [
    {
      "time": "2026-06-02T00:00:00.000Z",
      "temperature": 22.5
    },
    {
      "time": "2026-06-02T01:00:00.000Z",
      "temperature": 22.3
    }
  ]
}
```

### 2. 添加新的體感溫度數據

```
POST /api/thermal/data
```

**請求體：**

```json
{
  "location": "library_floor_2",
  "temperature": 23.5
}
```

**參數說明：**

| 參數 | 類型 | 必填 | 描述 | 範圍 |
|------|------|------|------|------|
| `location` | string | ✅ | 場域名稱 | - |
| `temperature` | number | ✅ | 體感溫度 | -50 ~ 100 |

**成功響應（201）：**

```json
{
  "message": "數據已成功保存",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "location": "library_floor_2",
    "temperature": 23.5,
    "timestamp": "2026-06-02T12:30:00.000Z"
  }
}
```

### 3. 獲取所有場域列表

```
GET /api/thermal/locations
```

**成功響應（200）：**

```json
{
  "locations": [
    "classroom_a",
    "classroom_b",
    "library_floor_1",
    "library_floor_2"
  ],
  "count": 4
}
```

### 4. 獲取最新的溫度數據

```
GET /api/thermal/latest
```

**查詢參數：**

| 參數 | 類型 | 必填 | 描述 |
|------|------|------|------|
| `location` | string | ❌ | 如果指定，只獲取該場域的最新數據 |

**成功響應（200）：**

```json
{
  "location": "library_floor_2",
  "temperature": 24.2,
  "timestamp": "2026-06-02T12:30:00.000Z"
}
```

## 使用示例

### 使用 curl

```bash
# 添加溫度數據
curl -X POST http://localhost:5000/api/thermal/data \
  -H "Content-Type: application/json" \
  -d '{
    "location": "library_floor_2",
    "temperature": 23.5
  }'

# 獲取趨勢數據
curl "http://localhost:5000/api/thermal/trends?location=library_floor_2&hours=24"
```

### 使用 JavaScript/Fetch

```javascript
// 添加溫度數據
fetch('http://localhost:5000/api/thermal/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    location: 'library_floor_2',
    temperature: 23.5
  })
})
.then(response => response.json())
.then(data => console.log(data));
```

---

詳見各個 README.md 文件獲取更多信息。