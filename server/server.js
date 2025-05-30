import express from "express";
import cors from "cors";
import matchesRouter from "./routes/matches.js";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Allow all origins for now
app.use(express.json()); // Parse JSON body

// Routes
app.use("/api/matches", matchesRouter);

// Start Server on 0.0.0.0 for external access
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Backend running and accessible on http://localhost:${PORT}`);
});
