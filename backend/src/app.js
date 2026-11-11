import express from "express";
import cors from "cors";
import eventRoutes from "./routes/event-routes.js"; // Route importu

const app = express();
app.use(cors());
app.use(express.json()); 

// 1. Önce Health Check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    student: "2416501057"
  });
});

// 2. Sonra Etkinlik Rotaları
app.use("/events", eventRoutes); 

// 3. EN SONA 404 Hata Bloğu (Bunun yeri çok kritik!)
app.use((req, res) => {
  res.status(404).json({ error: { message: "Route not found" } });
});

export default app;