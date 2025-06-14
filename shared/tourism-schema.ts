import { pgTable, text, serial, integer, boolean, timestamp, real, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  tourType: text("tour_type").notNull(),
  date: timestamp("date").notNull(),
  participants: integer("participants").notNull(),
  status: text("status").notNull().default("confirmed"),
  price: real("price").notNull(),
  preferences: json("preferences"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const droneFleet = pgTable("drone_fleet", {
  id: serial("id").primaryKey(),
  droneId: text("drone_id").notNull().unique(),
  status: text("status").notNull().default("available"),
  currentLocation: json("current_location"),
  batteryLevel: integer("battery_level").notNull(),
  tourRoute: text("tour_route"),
  maintenanceScheduled: timestamp("maintenance_scheduled"),
  isActive: boolean("is_active").notNull().default(true),
});

export const vrSessions = pgTable("vr_sessions", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull().unique(),
  experienceType: text("experience_type").notNull(),
  userId: integer("user_id").notNull(),
  duration: integer("duration").notNull(),
  quality: text("quality").notNull().default("4K"),
  status: text("status").notNull().default("active"),
  rating: real("rating"),
  startTime: timestamp("start_time").defaultNow(),
});

export const aiInsights = pgTable("ai_insights", {
  id: serial("id").primaryKey(),
  insightType: text("insight_type").notNull(),
  content: text("content").notNull(),
  confidence: real("confidence").notNull(),
  priority: text("priority").notNull().default("medium"),
  isActive: boolean("is_active").notNull().default(true),
  generatedAt: timestamp("generated_at").defaultNow(),
});

export const weatherData = pgTable("weather_data", {
  id: serial("id").primaryKey(),
  location: text("location").notNull(),
  temperature: real("temperature").notNull(),
  condition: text("condition").notNull(),
  humidity: integer("humidity").notNull(),
  windSpeed: real("wind_speed").notNull(),
  forecast: json("forecast"),
  recordedAt: timestamp("recorded_at").defaultNow(),
});

export const systemMetrics = pgTable("system_metrics", {
  id: serial("id").primaryKey(),
  metricType: text("metric_type").notNull(),
  value: real("value").notNull(),
  unit: text("unit").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const insertBookingSchema = createInsertSchema(bookings).omit({ id: true, createdAt: true });
export const insertDroneSchema = createInsertSchema(droneFleet).omit({ id: true });
export const insertVRSessionSchema = createInsertSchema(vrSessions).omit({ id: true, startTime: true });
export const insertAIInsightSchema = createInsertSchema(aiInsights).omit({ id: true, generatedAt: true });
export const insertWeatherSchema = createInsertSchema(weatherData).omit({ id: true, recordedAt: true });
export const insertSystemMetricSchema = createInsertSchema(systemMetrics).omit({ id: true, timestamp: true });

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type InsertDrone = z.infer<typeof insertDroneSchema>;
export type InsertVRSession = z.infer<typeof insertVRSessionSchema>;
export type InsertAIInsight = z.infer<typeof insertAIInsightSchema>;
export type InsertWeather = z.infer<typeof insertWeatherSchema>;
export type InsertSystemMetric = z.infer<typeof insertSystemMetricSchema>;

export type Booking = typeof bookings.$inferSelect;
export type DroneFleet = typeof droneFleet.$inferSelect;
export type VRSession = typeof vrSessions.$inferSelect;
export type AIInsight = typeof aiInsights.$inferSelect;
export type WeatherData = typeof weatherData.$inferSelect;
export type SystemMetric = typeof systemMetrics.$inferSelect;