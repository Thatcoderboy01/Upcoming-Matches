import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await fetch("https://www.scorebat.com/video-api/v3/");
    const data = await response.json();
    const allMatches = data.response || [];

    // 🧮 Pagination Logic
    const page = parseInt(req.query.page) || 1;
    const limit = 9;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedMatches = allMatches.slice(startIndex, endIndex);

    res.json({
      page,
      total: allMatches.length,
      totalPages: Math.ceil(allMatches.length / limit),
      matches: paginatedMatches,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch matches" });
  }
});

export default router;