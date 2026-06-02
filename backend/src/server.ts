import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db';
import thermalRoutes from './routes/thermal';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: '🌡️ 體感溫度歷史趨勢分析系統 API',
    version: '1.0.0',
    endpoints: {
      'GET /api/thermal/trends': '獲取過去 N 小時的趨勢數據',
      'POST /api/thermal/data': '添加新的體感溫度數據',
      'GET /api/thermal/locations': '獲取所有場域列表',
      'GET /api/thermal/latest': '獲取最新的溫度數據'
    }
  });
});

app.use('/api/thermal', thermalRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: '路由未找到' });
});

// Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: '伺服器內部錯誤' });
});

// Start Server
const startServer = async (): Promise<void> => {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`\n🚀 伺服器運行於 http://localhost:${PORT}`);
      console.log(`📊 API 文檔: http://localhost:${PORT}\n`);
    });
  } catch (error) {
    console.error('無法啟動伺服器:', error);
    process.exit(1);
  }
};

startServer();

export default app;