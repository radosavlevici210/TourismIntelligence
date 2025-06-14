import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import simpleTourismRoutes from "./simple-tourism-routes";

export async function registerRoutes(app: Express): Promise<Server> {
  // Tourism platform routes
  app.use(simpleTourismRoutes);

  // User authentication routes (if needed)
  app.get("/api/user", (req, res) => {
    res.json({ message: "User endpoint available" });
  });

  const httpServer = createServer(app);

  return httpServer;
}
