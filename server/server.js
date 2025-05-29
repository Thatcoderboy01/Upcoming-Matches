import express from "express";
import cors from "cors";
import matchesRouter from "./routes/matches.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use("/api/matches", matchesRouter);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
