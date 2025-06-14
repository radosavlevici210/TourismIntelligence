import { 
  bookings, droneFleet, vrSessions, aiInsights, weatherData, systemMetrics,
  type Booking, type DroneFleet, type VRSession, type AIInsight, 
  type WeatherData, type SystemMetric,
  type InsertBooking, type InsertDrone, type InsertVRSession, 
  type InsertAIInsight, type InsertWeather, type InsertSystemMetric
} from "@shared/tourism-schema";

export interface ITourismStorage {
  // Bookings
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookings(): Promise<Booking[]>;
  getBookingById(id: number): Promise<Booking | undefined>;
  updateBookingStatus(id: number, status: string): Promise<Booking | undefined>;
  
  // Drone Fleet
  createDrone(drone: InsertDrone): Promise<DroneFleet>;
  getDrones(): Promise<DroneFleet[]>;
  getDroneById(droneId: string): Promise<DroneFleet | undefined>;
  updateDroneStatus(droneId: string, status: string, location?: any): Promise<DroneFleet | undefined>;
  
  // VR Sessions
  createVRSession(session: InsertVRSession): Promise<VRSession>;
  getActiveSessions(): Promise<VRSession[]>;
  endVRSession(sessionId: string, rating?: number): Promise<VRSession | undefined>;
  
  // AI Insights
  createAIInsight(insight: InsertAIInsight): Promise<AIInsight>;
  getActiveInsights(): Promise<AIInsight[]>;
  
  // Weather Data
  updateWeather(weather: InsertWeather): Promise<WeatherData>;
  getCurrentWeather(location: string): Promise<WeatherData | undefined>;
  
  // System Metrics
  recordMetric(metric: InsertSystemMetric): Promise<SystemMetric>;
  getMetrics(metricType?: string): Promise<SystemMetric[]>;
}

export class MemTourismStorage implements ITourismStorage {
  private bookings: Map<number, Booking> = new Map();
  private drones: Map<string, DroneFleet> = new Map();
  private vrSessions: Map<string, VRSession> = new Map();
  private insights: Map<number, AIInsight> = new Map();
  private weather: Map<string, WeatherData> = new Map();
  private metrics: Map<number, SystemMetric> = new Map();
  
  private bookingId = 1;
  private droneCounter = 1;
  private sessionCounter = 1;
  private insightId = 1;
  private weatherId = 1;
  private metricId = 1;

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Initialize drone fleet
    for (let i = 1; i <= 24; i++) {
      const drone: DroneFleet = {
        id: i,
        droneId: `DRONE-${i.toString().padStart(3, '0')}`,
        status: i <= 12 ? 'active' : 'available',
        currentLocation: { lat: 44.4268 + (Math.random() - 0.5) * 0.1, lng: 26.1025 + (Math.random() - 0.5) * 0.1 },
        batteryLevel: 75 + Math.floor(Math.random() * 25),
        tourRoute: i <= 12 ? `Route-${Math.floor(Math.random() * 5) + 1}` : null,
        maintenanceScheduled: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000),
        isActive: true
      };
      this.drones.set(drone.droneId, drone);
    }

    // Initialize VR sessions
    const vrExperiences = ['Danube Heritage Tour', 'Wildlife Safari', 'Historical Castles', 'Cultural Village', 'Nature Walk'];
    for (let i = 1; i <= 34; i++) {
      const session: VRSession = {
        id: i,
        sessionId: `VR-${Date.now()}-${i}`,
        experienceType: vrExperiences[Math.floor(Math.random() * vrExperiences.length)],
        userId: Math.floor(Math.random() * 1000) + 1,
        duration: 15 + Math.floor(Math.random() * 45),
        quality: '4K',
        status: 'active',
        rating: null,
        startTime: new Date(Date.now() - Math.random() * 2 * 60 * 60 * 1000)
      };
      this.vrSessions.set(session.sessionId, session);
    }

    // Initialize weather data
    const weather: WeatherData = {
      id: 1,
      location: 'Bucharest',
      temperature: 24,
      condition: 'Sunny',
      humidity: 65,
      windSpeed: 8.5,
      forecast: {
        tomorrow: { temp: 26, condition: 'Partly Cloudy' },
        dayAfter: { temp: 22, condition: 'Rainy' }
      },
      recordedAt: new Date()
    };
    this.weather.set('Bucharest', weather);

    // Initialize AI insights
    const insightTypes = ['prediction', 'optimization', 'alert', 'recommendation'];
    const sampleInsights = [
      "Peak tourism demand predicted for next weekend (+23%)",
      "VR experience 'Danube Heritage' trending (+45% engagement)",
      "Autonomous drone route optimization completed",
      "Weather-based tour recommendations updated",
      "Revenue optimization: Dynamic pricing increased bookings by 12%"
    ];

    sampleInsights.forEach((content, index) => {
      const insight: AIInsight = {
        id: index + 1,
        insightType: insightTypes[Math.floor(Math.random() * insightTypes.length)],
        content,
        confidence: 0.85 + Math.random() * 0.15,
        priority: index < 2 ? 'high' : 'medium',
        isActive: true,
        generatedAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000)
      };
      this.insights.set(insight.id, insight);
    });
  }

  // Booking methods
  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const booking: Booking = {
      id: this.bookingId++,
      ...insertBooking,
      createdAt: new Date()
    };
    this.bookings.set(booking.id, booking);
    return booking;
  }

  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBookingById(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (booking) {
      booking.status = status;
      this.bookings.set(id, booking);
    }
    return booking;
  }

  // Drone methods
  async createDrone(insertDrone: InsertDrone): Promise<DroneFleet> {
    const drone: DroneFleet = {
      id: this.droneCounter++,
      ...insertDrone
    };
    this.drones.set(drone.droneId, drone);
    return drone;
  }

  async getDrones(): Promise<DroneFleet[]> {
    return Array.from(this.drones.values());
  }

  async getDroneById(droneId: string): Promise<DroneFleet | undefined> {
    return this.drones.get(droneId);
  }

  async updateDroneStatus(droneId: string, status: string, location?: any): Promise<DroneFleet | undefined> {
    const drone = this.drones.get(droneId);
    if (drone) {
      drone.status = status;
      if (location) drone.currentLocation = location;
      this.drones.set(droneId, drone);
    }
    return drone;
  }

  // VR Session methods
  async createVRSession(insertSession: InsertVRSession): Promise<VRSession> {
    const session: VRSession = {
      id: this.sessionCounter++,
      ...insertSession,
      startTime: new Date()
    };
    this.vrSessions.set(session.sessionId, session);
    return session;
  }

  async getActiveSessions(): Promise<VRSession[]> {
    return Array.from(this.vrSessions.values()).filter(s => s.status === 'active');
  }

  async endVRSession(sessionId: string, rating?: number): Promise<VRSession | undefined> {
    const session = this.vrSessions.get(sessionId);
    if (session) {
      session.status = 'completed';
      if (rating) session.rating = rating;
      this.vrSessions.set(sessionId, session);
    }
    return session;
  }

  // AI Insights methods
  async createAIInsight(insertInsight: InsertAIInsight): Promise<AIInsight> {
    const insight: AIInsight = {
      id: this.insightId++,
      ...insertInsight,
      generatedAt: new Date()
    };
    this.insights.set(insight.id, insight);
    return insight;
  }

  async getActiveInsights(): Promise<AIInsight[]> {
    return Array.from(this.insights.values()).filter(i => i.isActive);
  }

  // Weather methods
  async updateWeather(insertWeather: InsertWeather): Promise<WeatherData> {
    const weather: WeatherData = {
      id: this.weatherId++,
      ...insertWeather,
      recordedAt: new Date()
    };
    this.weather.set(weather.location, weather);
    return weather;
  }

  async getCurrentWeather(location: string): Promise<WeatherData | undefined> {
    return this.weather.get(location);
  }

  // Metrics methods
  async recordMetric(insertMetric: InsertSystemMetric): Promise<SystemMetric> {
    const metric: SystemMetric = {
      id: this.metricId++,
      ...insertMetric,
      timestamp: new Date()
    };
    this.metrics.set(metric.id, metric);
    return metric;
  }

  async getMetrics(metricType?: string): Promise<SystemMetric[]> {
    const allMetrics = Array.from(this.metrics.values());
    return metricType ? allMetrics.filter(m => m.metricType === metricType) : allMetrics;
  }
}

export const tourismStorage = new MemTourismStorage();