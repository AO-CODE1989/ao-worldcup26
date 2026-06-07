export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  const apiKey = process.env.FOOTBALL_DATA_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "Football API key not configured" });

  try {
    const response = await fetch(
      "https://api.football-data.org/v4/competitions/WC/matches",
      { headers: { "X-Auth-Token": apiKey } }
    );
    if (!response.ok) return res.status(response.status).json({ error: "Football API error" });

    const data = await response.json();
    const matches = (data.matches || []).map(m => ({
      id: m.id,
      status: m.status,
      homeTeam: m.homeTeam?.name || "",
      awayTeam: m.awayTeam?.name || "",
      homeScore: m.score?.fullTime?.home,
      awayScore: m.score?.fullTime?.away,
      minute: m.minute || null,
      winner: m.score?.winner,
    }));
    return res.status(200).json({ matches, lastUpdated: new Date().toISOString() });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
