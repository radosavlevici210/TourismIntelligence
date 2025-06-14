import { 
  TourismData, Booking, DroneFleet, VRSession, AIInsight, WeatherData, ActivityFeedItem,
  CreateBooking, CreateVRSession, CreateDrone
} from "@shared/simple-tourism-schema";

export interface ITourismStorage {
  // Dashboard Analytics
  getDashboardData(): Promise<TourismData>;
  
  // Bookings
  createBooking(booking: CreateBooking): Promise<Booking>;
  getBookings(): Promise<Booking[]>;
  getBookingById(id: number): Promise<Booking | undefined>;
  updateBookingStatus(id: number, status: string): Promise<Booking | undefined>;
  
  // Drone Fleet
  createDrone(drone: CreateDrone): Promise<DroneFleet>;
  getDrones(): Promise<DroneFleet[]>;
  getDroneById(droneId: string): Promise<DroneFleet | undefined>;
  updateDroneStatus(droneId: string, status: string, location?: any): Promise<DroneFleet | undefined>;
  
  // VR Sessions
  createVRSession(session: CreateVRSession): Promise<VRSession>;
  getActiveSessions(): Promise<VRSession[]>;
  endVRSession(sessionId: string, rating?: number): Promise<VRSession | undefined>;
  
  // AI Insights
  getActiveInsights(): Promise<AIInsight[]>;
  
  // Weather Data
  getCurrentWeather(location: string): Promise<WeatherData | undefined>;
  
  // Activity Feed
  getActivityFeed(): Promise<ActivityFeedItem[]>;
}

export class MemTourismStorage implements ITourismStorage {
  private bookings: Map<number, Booking> = new Map();
  private drones: Map<string, DroneFleet> = new Map();
  private vrSessions: Map<string, VRSession> = new Map();
  private insights: AIInsight[] = [];
  private weather: Map<string, WeatherData> = new Map();
  private activityFeed: ActivityFeedItem[] = [];
  
  private bookingId = 1;
  private droneCounter = 1;
  private sessionCounter = 1;
  private insightId = 1;

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
        tourRoute: i <= 12 ? `Route-${Math.floor(Math.random() * 5) + 1}` : undefined,
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
        rating: undefined,
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
    this.insights = [
      {
        id: 1,
        insightType: 'prediction',
        content: 'Peak tourism demand predicted for next weekend (+23%)',
        confidence: 0.92,
        priority: 'high',
        isActive: true,
        generatedAt: new Date(Date.now() - 30 * 60 * 1000)
      },
      {
        id: 2,
        insightType: 'optimization',
        content: "VR experience 'Danube Heritage' trending (+45% engagement)",
        confidence: 0.88,
        priority: 'medium',
        isActive: true,
        generatedAt: new Date(Date.now() - 45 * 60 * 1000)
      },
      {
        id: 3,
        insightType: 'maintenance',
        content: 'Autonomous drone route optimization completed',
        confidence: 0.95,
        priority: 'low',
        isActive: true,
        generatedAt: new Date(Date.now() - 60 * 60 * 1000)
      }
    ];

    // Initialize activity feed
    this.activityFeed = [
      {
        id: 1,
        type: 'booking',
        message: 'New VR session started: "Danube Delta Wildlife Tour"',
        time: '2 minutes ago',
        color: 'blue'
      },
      {
        id: 2,
        type: 'drone',
        message: 'Drone tour completed successfully - 5⭐ rating',
        time: '5 minutes ago',
        color: 'green'
      },
      {
        id: 3,
        type: 'ai',
        message: 'AI prediction updated: +15% visitors expected tomorrow',
        time: '8 minutes ago',
        color: 'purple'
      }
    ];

    // Initialize sample bookings
    const sampleBooking: Booking = {
      id: 1,
      userId: 1001,
      tourType: 'VR Heritage Experience',
      date: new Date(),
      participants: 2,
      status: 'confirmed',
      price: 89.99,
      preferences: { language: 'English', accessibility: false },
      createdAt: new Date()
    };
    this.bookings.set(1, sampleBooking);
  }

  async getDashboardData(): Promise<TourismData> {
    const activeDrones = Array.from(this.drones.values()).filter(d => d.status === 'active').length;
    const activeSessions = Array.from(this.vrSessions.values()).filter(s => s.status === 'active').length;
    const todayBookings = Array.from(this.bookings.values()).filter(b => {
      const today = new Date();
      const bookingDate = new Date(b.createdAt);
      return bookingDate.toDateString() === today.toDateString();
    }).length;

    return {
      activeVisitors: 2847 + Math.floor(Math.random() * 100),
      predictedDemand: 3921 + Math.floor(Math.random() * 200),
      droneToursActive: activeDrones,
      vrExperiencesRunning: activeSessions,
      satisfactionScore: 4.8,
      revenue: 125847 + Math.floor(Math.random() * 5000),
      bookingsToday: Math.max(todayBookings, 89),
      averageStay: 3.2,
      weatherCondition: 'Sunny',
      temperature: 24,
      aiRecommendations: this.insights.length,
      securityThreats: 0,
      systemUptime: 99.98,
      quantumSecurityLevel: 'Maximum',
      totalUsers: 15847 + Math.floor(Math.random() * 100),
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
  }

  async createBooking(createBooking: CreateBooking): Promise<Booking> {
    const booking: Booking = {
      id: this.bookingId++,
      ...createBooking,
      date: new Date(createBooking.date),
      status: 'confirmed',
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

  async createDrone(createDrone: CreateDrone): Promise<DroneFleet> {
    const drone: DroneFleet = {
      id: this.droneCounter++,
      ...createDrone,
      status: createDrone.status || 'available',
      isActive: true,
      currentLocation: createDrone.currentLocation || null
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

  async createVRSession(createSession: CreateVRSession): Promise<VRSession> {
    const session: VRSession = {
      id: this.sessionCounter++,
      ...createSession,
      status: 'active',
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

  async getActiveInsights(): Promise<AIInsight[]> {
    return this.insights.filter(i => i.isActive);
  }

  async getCurrentWeather(location: string): Promise<WeatherData | undefined> {
    return this.weather.get(location);
  }

  async getActivityFeed(): Promise<ActivityFeedItem[]> {
    return this.activityFeed;
  }
}

export const simpleTourismStorage = new MemTourismStorage();