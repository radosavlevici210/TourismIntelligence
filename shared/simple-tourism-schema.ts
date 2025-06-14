import { z } from "zod";

export interface TourismData {
  activeVisitors: number;
  predictedDemand: number;
  droneToursActive: number;
  vrExperiencesRunning: number;
  satisfactionScore: number;
  revenue: number;
  bookingsToday: number;
  averageStay: number;
  weatherCondition: string;
  temperature: number;
  aiRecommendations: number;
  securityThreats: number;
  systemUptime: number;
  quantumSecurityLevel: string;
  totalUsers: number;
  conversionRate: number;
  avgResponseTime: number;
  dataProcessed: number;
  aiAccuracy: number;
  customerSatisfaction: number;
  energyEfficiency: number;
  carbonFootprint: number;
  languagesSupported: number;
  countriesServed: number;
  partnersConnected: number;
  apiCalls: number;
}

export interface Booking {
  id: number;
  userId: number;
  tourType: string;
  date: Date;
  participants: number;
  status: string;
  price: number;
  preferences?: any;
  createdAt: Date;
}

export interface DroneFleet {
  id: number;
  droneId: string;
  status: string;
  currentLocation?: any;
  batteryLevel: number;
  tourRoute?: string;
  maintenanceScheduled?: Date;
  isActive: boolean;
}

export interface VRSession {
  id: number;
  sessionId: string;
  experienceType: string;
  userId: number;
  duration: number;
  quality: string;
  status: string;
  rating?: number;
  startTime: Date;
}

export interface AIInsight {
  id: number;
  insightType: string;
  content: string;
  confidence: number;
  priority: string;
  isActive: boolean;
  generatedAt: Date;
}

export interface WeatherData {
  id: number;
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  forecast?: any;
  recordedAt: Date;
}

export interface ActivityFeedItem {
  id: number;
  type: string;
  message: string;
  time: string;
  color: string;
}

export const createBookingSchema = z.object({
  userId: z.number(),
  tourType: z.string(),
  date: z.string(),
  participants: z.number().min(1),
  price: z.number().min(0),
  preferences: z.any().optional(),
});

export const createVRSessionSchema = z.object({
  sessionId: z.string(),
  experienceType: z.string(),
  userId: z.number(),
  duration: z.number().min(1),
  quality: z.string().default("4K"),
});

export const createDroneSchema = z.object({
  droneId: z.string(),
  status: z.string().default("available"),
  batteryLevel: z.number().min(0).max(100),
  currentLocation: z.any().optional(),
  tourRoute: z.string().optional(),
});

export type CreateBooking = z.infer<typeof createBookingSchema>;
export type CreateVRSession = z.infer<typeof createVRSessionSchema>;
export type CreateDrone = z.infer<typeof createDroneSchema>;