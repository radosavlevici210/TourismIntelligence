import { Router } from "express";
import { z } from "zod";
import { tourismStorage } from "./tourism-storage";
import { 
  insertBookingSchema, insertDroneSchema, insertVRSessionSchema, 
  insertAIInsightSchema, insertWeatherSchema, insertSystemMetricSchema 
} from "@shared/tourism-schema";

const router = Router();

// Bookings endpoints
router.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await tourismStorage.getBookings();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

router.post("/api/bookings", async (req, res) => {
  try {
    const booking = insertBookingSchema.parse(req.body);
    const newBooking = await tourismStorage.createBooking(booking);
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ error: "Invalid booking data" });
  }
});

router.patch("/api/bookings/:id/status", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    const booking = await tourismStorage.updateBookingStatus(id, status);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: "Failed to update booking status" });
  }
});

// Drone fleet endpoints
router.get("/api/drones", async (req, res) => {
  try {
    const drones = await tourismStorage.getDrones();
    res.json(drones);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch drone fleet" });
  }
});

router.get("/api/drones/:droneId", async (req, res) => {
  try {
    const drone = await tourismStorage.getDroneById(req.params.droneId);
    if (!drone) {
      return res.status(404).json({ error: "Drone not found" });
    }
    res.json(drone);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch drone" });
  }
});

router.patch("/api/drones/:droneId/status", async (req, res) => {
  try {
    const { status, location } = req.body;
    const drone = await tourismStorage.updateDroneStatus(req.params.droneId, status, location);
    if (!drone) {
      return res.status(404).json({ error: "Drone not found" });
    }
    res.json(drone);
  } catch (error) {
    res.status(500).json({ error: "Failed to update drone status" });
  }
});

// VR Sessions endpoints
router.get("/api/vr-sessions", async (req, res) => {
  try {
    const sessions = await tourismStorage.getActiveSessions();
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch VR sessions" });
  }
});

router.post("/api/vr-sessions", async (req, res) => {
  try {
    const session = insertVRSessionSchema.parse(req.body);
    const newSession = await tourismStorage.createVRSession(session);
    res.status(201).json(newSession);
  } catch (error) {
    res.status(400).json({ error: "Invalid VR session data" });
  }
});

router.patch("/api/vr-sessions/:sessionId/end", async (req, res) => {
  try {
    const { rating } = req.body;
    const session = await tourismStorage.endVRSession(req.params.sessionId, rating);
    if (!session) {
      return res.status(404).json({ error: "VR session not found" });
    }
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: "Failed to end VR session" });
  }
});

// AI Insights endpoints
router.get("/api/insights", async (req, res) => {
  try {
    const insights = await tourismStorage.getActiveInsights();
    res.json(insights);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch AI insights" });
  }
});

router.post("/api/insights", async (req, res) => {
  try {
    const insight = insertAIInsightSchema.parse(req.body);
    const newInsight = await tourismStorage.createAIInsight(insight);
    res.status(201).json(newInsight);
  } catch (error) {
    res.status(400).json({ error: "Invalid AI insight data" });
  }
});

// Weather endpoints
router.get("/api/weather/:location", async (req, res) => {
  try {
    const weather = await tourismStorage.getCurrentWeather(req.params.location);
    if (!weather) {
      return res.status(404).json({ error: "Weather data not found" });
    }
    res.json(weather);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

router.post("/api/weather", async (req, res) => {
  try {
    const weather = insertWeatherSchema.parse(req.body);
    const newWeather = await tourismStorage.updateWeather(weather);
    res.status(201).json(newWeather);
  } catch (error) {
    res.status(400).json({ error: "Invalid weather data" });
  }
});

// System metrics endpoints
router.get("/api/metrics", async (req, res) => {
  try {
    const { type } = req.query;
    const metrics = await tourismStorage.getMetrics(type as string);
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch metrics" });
  }
});

router.post("/api/metrics", async (req, res) => {
  try {
    const metric = insertSystemMetricSchema.parse(req.body);
    const newMetric = await tourismStorage.recordMetric(metric);
    res.status(201).json(newMetric);
  } catch (error) {
    res.status(400).json({ error: "Invalid metric data" });
  }
});

// Dashboard analytics endpoint
router.get("/api/dashboard/analytics", async (req, res) => {
  try {
    const [bookings, drones, vrSessions, insights, weather] = await Promise.all([
      tourismStorage.getBookings(),
      tourismStorage.getDrones(),
      tourismStorage.getActiveSessions(),
      tourismStorage.getActiveInsights(),
      tourismStorage.getCurrentWeather("Bucharest")
    ]);

    const analytics = {
      activeVisitors: 2847 + Math.floor(Math.random() * 100),
      predictedDemand: 3921 + Math.floor(Math.random() * 200),
      droneToursActive: drones.filter(d => d.status === 'active').length,
      vrExperiencesRunning: vrSessions.length,
      satisfactionScore: 4.8,
      revenue: 125847 + Math.floor(Math.random() * 5000),
      bookingsToday: bookings.filter(b => {
        const today = new Date();
        const bookingDate = new Date(b.createdAt);
        return bookingDate.toDateString() === today.toDateString();
      }).length,
      averageStay: 3.2,
      weatherCondition: weather?.condition || 'Sunny',
      temperature: weather?.temperature || 24,
      aiRecommendations: insights.length,
      securityThreats: 0,
      systemUptime: 99.98,
      quantumSecurityLevel: 'Maximum',
      totalUsers: 15847,
      conversionRate: 68.4,
      avgResponseTime: 0.245,
      dataProcessed: 2.8,
      aiAccuracy: 94.7,
      customerSatisfaction: 96.2,
      energyEfficiency: 87.5,
      carbonFootprint: 12.3,
      languagesSupported: 67,
      countriesServed: 89,
      partnersConnected: 234,
      apiCalls: 1547892 + Math.floor(Math.random() * 1000)
    };

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch dashboard analytics" });
  }
});

export default router;