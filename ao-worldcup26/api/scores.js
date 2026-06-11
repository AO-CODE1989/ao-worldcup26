let cache = { data: null, time: 0 };

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();

  // Servir le cache s'il a moins de 30 secondes
  if (cache.data && Date.now() - cache.time < 30000) {
    return res.status(200).json(cache.data);
  }

  const apiKey = process.env.FOOTBALL_DATA_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key not configured" });

  try {
    const response = await fetch(
      "https://api.football-data.org/v4/competitions/WC/matches",
      { headers: { "X-Auth-Token": apiKey } }
    );
    if (!response.ok) {
      // En cas d'erreur (rate limit), servir l'ancien cache si dispo
      if (cache.data) return res.status(200).json(cache.data);
      return res.status(response.status).json({ error: "Football API error" });
    }
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
    cache = { data: { matches, lastUpdated: new Date().toISOString() }, time: Date.now() };
    return res.status(200).json(cache.data);
  } catch (err) {
    if (cache.data) return res.status(200).json(cache.data);
    return res.status(500).json({ error: err.message });
  }
}
