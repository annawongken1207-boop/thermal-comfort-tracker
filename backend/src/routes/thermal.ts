import { Router } from 'express';
import {
  getTrendData,
  addThermalData,
  getLocations,
  getLatestData
} from '../controllers/thermalController';

const router = Router();

// 獲取過去 N 小時的趨勢數據
router.get('/trends', getTrendData);

// 添加新的體感溫度數據
router.post('/data', addThermalData);

// 獲取所有場域列表
router.get('/locations', getLocations);

// 獲取最新的溫度數據
router.get('/latest', getLatestData);

export default router;