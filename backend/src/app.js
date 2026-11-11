import express from "express";
import cors from "cors";
// import eventRoutes from "./routes/event-routes.js"; // İleride açacağız

const app = express();
app.use(cors());
app.use(express.json()); // body -> req.body (Hata almamak için kritik)

// ADIM 4: Health Check (Sunucu ayakta mı?)
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    student: "2416501057"
  });
});

// app.use("/events", eventRoutes); // İleride açacağız

// Eşleşme yoksa (404)
app.use((req, res) => {
  res.status(404).json({ error: { message: "Route not found" } });
});

export default app;