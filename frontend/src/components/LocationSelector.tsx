import React, { useState, useEffect } from 'react';
import { getLocations } from '../api/thermalApi';
import './LocationSelector.css';

interface LocationSelectorProps {
  onLocationChange: (location: string) => void;
  selectedLocation: string;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  onLocationChange,
  selectedLocation
}) => {
  const [locations, setLocations] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        const response = await getLocations();
        setLocations(response.locations);
        
        // 如果沒有選擇位置且有可用位置，選擇第一個
        if (!selectedLocation && response.locations.length > 0) {
          onLocationChange(response.locations[0]);
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  return (
    <div className="location-selector">
      <label htmlFor="location-select" className="location-label">
        📍 選擇場域：
      </label>
      <select
        id="location-select"
        value={selectedLocation}
        onChange={(e) => onLocationChange(e.target.value)}
        disabled={loading || locations.length === 0}
        className="location-select"
      >
        <option value="">
          {loading ? '加載中...' : locations.length === 0 ? '暫無場域' : '選擇場域'}
        </option>
        {locations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocationSelector;