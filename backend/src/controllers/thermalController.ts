import { Request, Response } from 'express';
import ThermalData, { IThermalData } from '../models/ThermalData';

// 獲取過去 N 小時的趨勢數據
export const getTrendData = async (req: Request, res: Response): Promise<void> => {
  try {
    const { location, hours = 24 } = req.query;

    if (!location) {
      res.status(400).json({ error: '場域名稱 (location) 為必填參數' });
      return;
    }

    const hoursNum = parseInt(hours as string, 10) || 24;
    const startTime = new Date(Date.now() - hoursNum * 60 * 60 * 1000);

    const data: IThermalData[] = await ThermalData.find({
      location: location as string,
      timestamp: { $gte: startTime }
    }).sort({ timestamp: 1 });

    res.json({
      location,
      hours: hoursNum,
      count: data.length,
      data: data.map(item => ({
        time: item.timestamp,
        temperature: item.temperature
      }))
    });
  } catch (error) {
    console.error('Error fetching trend data:', error);
    res.status(500).json({ error: '無法獲取趨勢數據' });
  }
};

// 添加新的體感溫度數據
export const addThermalData = async (req: Request, res: Response): Promise<void> => {
  try {
    const { location, temperature } = req.body;

    if (!location || temperature === undefined) {
      res.status(400).json({ error: '缺少必填參數: location 和 temperature' });
      return;
    }

    if (typeof temperature !== 'number' || temperature < -50 || temperature > 100) {
      res.status(400).json({ error: '溫度值必須在 -50 到 100 之間' });
      return;
    }

    const newData = new ThermalData({
      location,
      temperature,
      timestamp: new Date()
    });

    const saved = await newData.save();

    res.status(201).json({
      message: '數據已成功保存',
      data: {
        id: saved._id,
        location: saved.location,
        temperature: saved.temperature,
        timestamp: saved.timestamp
      }
    });
  } catch (error) {
    console.error('Error adding thermal data:', error);
    res.status(500).json({ error: '無法保存數據' });
  }
};

// 獲取所有場域列表
export const getLocations = async (req: Request, res: Response): Promise<void> => {
  try {
    const locations = await ThermalData.distinct('location');
    res.json({
      locations: locations.sort(),
      count: locations.length
    });
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ error: '無法獲取場域列表' });
  }
};

// 獲取最新的溫度數據
export const getLatestData = async (req: Request, res: Response): Promise<void> => {
  try {
    const { location } = req.query;

    let query = {};
    if (location) {
      query = { location: location as string };
    }

    const latestData = await ThermalData.findOne(query).sort({ timestamp: -1 });

    if (!latestData) {
      res.status(404).json({ error: '未找到數據' });
      return;
    }

    res.json({
      location: latestData.location,
      temperature: latestData.temperature,
      timestamp: latestData.timestamp
    });
  } catch (error) {
    console.error('Error fetching latest data:', error);
    res.status(500).json({ error: '無法獲取最新數據' });
  }
};