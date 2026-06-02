import mongoose, { Schema, Document } from 'mongoose';

export interface IThermalData extends Document {
  location: string;
  temperature: number;
  timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ThermalDataSchema: Schema = new Schema(
  {
    location: {
      type: String,
      required: true,
      index: true,
      description: '場域名稱 (例如: library_floor_2)'
    },
    temperature: {
      type: Number,
      required: true,
      min: -50,
      max: 100,
      description: '體感溫度 (°C)'
    },
    timestamp: {
      type: Date,
      required: true,
      index: true,
      default: Date.now
    }
  },
  {
    timestamps: true,
    collection: 'thermal_data'
  }
);

// 複合索引：用於快速查詢特定場域在時間範圍內的數據
ThermalDataSchema.index({ location: 1, timestamp: -1 });

// TTL 索引：自動刪除30天前的數據（可選）
ThermalDataSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 });

export default mongoose.model<IThermalData>('ThermalData', ThermalDataSchema);