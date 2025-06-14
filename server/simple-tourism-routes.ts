import { Router } from "express";
import { z } from "zod";
import { simpleTourismStorage } from "./simple-tourism-storage";
import { 
  createBookingSchema, createVRSessionSchema, createDroneSchema 
} from "@shared/simple-tourism-schema";

const router = Router();

// Dashboard analytics endpoint
router.get("/api/dashboard/analytics", async (req, res) => {
  try {
    const analytics = await simpleTourismStorage.getDashboardData();
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch dashboard analytics" });
  }
});

// Bookings endpoints
router.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await simpleTourismStorage.getBookings();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

router.post("/api/bookings", async (req, res) => {
  try {
    const booking = createBookingSchema.parse(req.body);
    const newBooking = await simpleTourismStorage.createBooking(booking);
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ error: "Invalid booking data" });
  }
});

router.patch("/api/bookings/:id/status", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    const booking = await simpleTourismStorage.updateBookingStatus(id, status);
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
    const drones = await simpleTourismStorage.getDrones();
    res.json(drones);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch drone fleet" });
  }
});

router.get("/api/drones/:droneId", async (req, res) => {
  try {
    const drone = await simpleTourismStorage.getDroneById(req.params.droneId);
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
    const drone = await simpleTourismStorage.updateDroneStatus(req.params.droneId, status, location);
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
    const sessions = await simpleTourismStorage.getActiveSessions();
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch VR sessions" });
  }
});

router.post("/api/vr-sessions", async (req, res) => {
  try {
    const session = createVRSessionSchema.parse(req.body);
    const newSession = await simpleTourismStorage.createVRSession(session);
    res.status(201).json(newSession);
  } catch (error) {
    res.status(400).json({ error: "Invalid VR session data" });
  }
});

router.patch("/api/vr-sessions/:sessionId/end", async (req, res) => {
  try {
    const { rating } = req.body;
    const session = await simpleTourismStorage.endVRSession(req.params.sessionId, rating);
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
    const insights = await simpleTourismStorage.getActiveInsights();
    res.json(insights);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch AI insights" });
  }
});

// Weather endpoints
router.get("/api/weather/:location", async (req, res) => {
  try {
    const weather = await simpleTourismStorage.getCurrentWeather(req.params.location);
    if (!weather) {
      return res.status(404).json({ error: "Weather data not found" });
    }
    res.json(weather);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

// Activity feed endpoint
router.get("/api/activity-feed", async (req, res) => {
  try {
    const activityFeed = await simpleTourismStorage.getActivityFeed();
    res.json(activityFeed);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch activity feed" });
  }
});

export default router;