/**
 * City Coordinates Utility
 * Provides latitude and longitude for major Indian cities
 */

export interface CityCoordinates {
  latitude: number;
  longitude: number;
}

const CITY_COORDINATES: Record<string, CityCoordinates> = {
  mumbai: { latitude: 19.0760, longitude: 72.8777 },
  delhi: { latitude: 28.6139, longitude: 77.2090 },
  bangalore: { latitude: 12.9716, longitude: 77.5946 },
  kolkata: { latitude: 22.5726, longitude: 88.3639 },
  chennai: { latitude: 13.0827, longitude: 80.2707 },
  hyderabad: { latitude: 17.3850, longitude: 78.4867 },
  pune: { latitude: 18.5204, longitude: 73.8567 },
  ahmedabad: { latitude: 23.0225, longitude: 72.5714 },
  jaipur: { latitude: 26.9124, longitude: 75.7873 },
  surat: { latitude: 21.1702, longitude: 72.8311 },
  lucknow: { latitude: 26.8467, longitude: 80.9462 },
  kanpur: { latitude: 26.4499, longitude: 80.3319 },
  nagpur: { latitude: 21.1458, longitude: 79.0882 },
  indore: { latitude: 22.7196, longitude: 75.8577 },
  thane: { latitude: 19.2183, longitude: 72.9781 },
  bhopal: { latitude: 23.2599, longitude: 77.4126 },
  visakhapatnam: { latitude: 17.6868, longitude: 83.2185 },
  patna: { latitude: 25.5941, longitude: 85.1376 },
  vadodara: { latitude: 22.3072, longitude: 73.1812 },
  ghaziabad: { latitude: 28.6692, longitude: 77.4538 },
  coimbatore: { latitude: 11.0168, longitude: 76.9558 },
  agra: { latitude: 27.1767, longitude: 78.0081 },
  madurai: { latitude: 9.9252, longitude: 78.1198 },
  nashik: { latitude: 19.9975, longitude: 73.7898 },
  meerut: { latitude: 28.9845, longitude: 77.7064 },
  rajkot: { latitude: 22.3039, longitude: 70.8022 },
  varanasi: { latitude: 25.3176, longitude: 82.9739 },
  srinagar: { latitude: 34.0837, longitude: 74.7973 },
  amritsar: { latitude: 31.6340, longitude: 74.8723 },
  jodhpur: { latitude: 26.2389, longitude: 73.0243 },
};

/**
 * Get city coordinates by city name (slug)
 */
export function getCityCoordinates(citySlug: string): CityCoordinates | null {
  const normalizedCity = citySlug.toLowerCase().trim();
  return CITY_COORDINATES[normalizedCity] || null;
}

/**
 * Get city latitude
 */
export function getCityLatitude(citySlug: string): number | null {
  const coords = getCityCoordinates(citySlug);
  return coords?.latitude ?? null;
}

/**
 * Get city longitude
 */
export function getCityLongitude(citySlug: string): number | null {
  const coords = getCityCoordinates(citySlug);
  return coords?.longitude ?? null;
}
