import express from "express";
import cors from "cors";
import eventRoutes from "./routes/event-routes.js";

const app = express();
app.use(cors());
app.use(express.json());

// 1. Health Check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    student: "2416501057",
  });
});

// 2. Etkinlik Rotaları
app.use("/events", eventRoutes);

// 3. 404 ve Genel Hata Yakalayıcı
app.use((req, res) => {
  res.status(404).json({ error: { message: "Route not found" } });
});

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: { message: "Server error" } });
});

export default app;