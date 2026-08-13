import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper to initialize Gemini Client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// ==========================================
// API ROUTES
// ==========================================

// AI Assistant Endpoint powered by Gemini API
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGeminiClient();

    const systemInstruction = `You are "Kashmi", the official AI Travel Concierge for KashmirYatra (Where Every Valley Tells a Story).
You are a warm, highly knowledgeable, friendly local Kashmir travel expert based in Srinagar.
Your job is to assist travelers planning trips to Kashmir (Srinagar, Gulmarg, Pahalgam, Sonamarg, Gurez Valley, Doodhpathri, Yusmarg, Aru Valley, Betaab Valley, Great Lakes, etc.).

Provide helpful, accurate, polite, and practical advice on:
- Itineraries (customized for couples, families, adventure seekers, budget travelers)
- Weather updates & what clothing/gear to pack per season (winter snow, spring blooms, autumn chinar leaves, summer pleasant)
- Houseboat stays on Dal Lake / Nigeen Lake
- Transport & cab options (Innova, Etios, Tempo Traveller, Union Cabs in Gulmarg/Pahalgam)
- Passes & Permits (e.g. Gurez Valley border permit requirements)
- Gulmarg Gondola cable car phases & ticketing advice
- Authentic Kashmiri cuisine (Wazwan, Rogan Josh, Yakhni, Dum Aloo, Nadru Monje, Kashmiri Kahwa, Noon Chai)
- Local shopping (Pashmina shawls, saffron, dry fruits, papier-mâché, carpet weaving)

Guidelines:
- Keep responses engaging, structured with clear bullet points or short paragraphs.
- Be warm and welcoming with authentic Kashmiri hospitality ("Khush Amdeed", "Adaab").
- If the user asks to book or finalize costs, invite them to click "BOOK NOW" on WhatsApp (+91 7006248669) for direct local assistance!
- Speak politely, concisely, and clearly.`;

    if (!ai) {
      // Fallback friendly response if GEMINI_API_KEY is missing
      return res.json({
        text: `Khush Amdeed! I am Kashmi, your KashmirYatra AI Travel Concierge.

Here are key quick insights for your Kashmir journey:
- **Srinagar**: Perfect for Dal Lake Shikara rides & luxury wooden houseboats.
- **Gulmarg**: Famous for Asia's highest Gondola cable car (13,780 ft) & snow activities.
- **Pahalgam**: Beautiful river views along Lidder River, Betaab Valley, & Aru Valley.
- **Gurez Valley**: Breathtaking offbeat border valley near Habba Khatoon peak (requires ID proof).

*For custom itinerary quotes or hotel/cab availability, click "BOOK NOW" to chat directly with our Srinagar team on WhatsApp!*`,
      });
    }

    const contents = [];
    if (Array.isArray(history) && history.length > 0) {
      for (const msg of history) {
        contents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.text }],
        });
      }
    }
    contents.push({ role: "user", parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
        tools: [{ googleSearch: {} }],
      },
    });

    const replyText =
      response.text ||
      "I am delighted to help you plan your Kashmir trip! Which destinations or dates are you considering?";

    res.json({ text: replyText });
  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    res.status(500).json({
      error: "Failed to generate AI response",
      fallbackText:
        "Khush Amdeed! I encountered a temporary network hiccup. Feel free to ask me anything about Kashmir weather, itineraries, or houseboats, or click 'BOOK NOW' to talk directly to our local Srinagar team on WhatsApp!",
    });
  }
});

// Weather Endpoint for Kashmir Locations
const LOCATIONS = [
  { name: "Srinagar", lat: 34.0837, lon: 74.7973, alt: "1,585m", key: "srinagar", desc: "Summer Capital & Dal Lake" },
  { name: "Gulmarg", lat: 34.0484, lon: 74.3805, alt: "2,650m", key: "gulmarg", desc: "Snow Meadow & Gondola" },
  { name: "Pahalgam", lat: 34.0161, lon: 75.3150, alt: "2,130m", key: "pahalgam", desc: "Valley of Shepherds & Lidder" },
  { name: "Sonamarg", lat: 34.3000, lon: 75.2900, alt: "2,740m", key: "sonamarg", desc: "Meadow of Gold & Glacier" },
  { name: "Gurez Valley", lat: 34.6369, lon: 74.8398, alt: "2,400m", key: "gurez", desc: "Offbeat Border & Habba Khatoon" },
];

const getWeatherCodeDescription = (code: number): { text: string; icon: string } => {
  if (code === 0) return { text: "Clear & Sunny", icon: "Sun" };
  if (code === 1 || code === 2) return { text: "Partly Cloudy", icon: "CloudSun" };
  if (code === 3) return { text: "Overcast Sky", icon: "Cloud" };
  if (code === 45 || code === 48) return { text: "Misty / Foggy", icon: "CloudFog" };
  if (code >= 51 && code <= 67) return { text: "Light Rain / Drizzle", icon: "CloudDrizzle" };
  if (code >= 71 && code <= 77) return { text: "Snowfall / Flurries", icon: "Snowflake" };
  if (code >= 80 && code <= 82) return { text: "Rain Showers", icon: "CloudRain" };
  if (code >= 85 && code <= 86) return { text: "Moderate/Heavy Snowfall", icon: "Snowflake" };
  if (code >= 95) return { text: "Thunderstorm", icon: "CloudLightning" };
  return { text: "Pleasant Mountain Weather", icon: "Sun" };
};

app.get("/api/weather", async (req, res) => {
  try {
    const weatherData = await Promise.all(
      LOCATIONS.map(async (loc) => {
        try {
          const url = `https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FKolkata`;
          const response = await fetch(url);
          if (!response.ok) throw new Error("Weather API failed");
          const data = await response.json();

          const current = data.current;
          const daily = data.daily;
          const codeInfo = getWeatherCodeDescription(current.weather_code);

          return {
            name: loc.name,
            key: loc.key,
            description: loc.desc,
            altitude: loc.alt,
            temp: Math.round(current.temperature_2m),
            tempMax: daily?.temperature_2m_max?.[0] ? Math.round(daily.temperature_2m_max[0]) : Math.round(current.temperature_2m + 4),
            tempMin: daily?.temperature_2m_min?.[0] ? Math.round(daily.temperature_2m_min[0]) : Math.round(current.temperature_2m - 5),
            humidity: current.relative_humidity_2m,
            windSpeed: Math.round(current.wind_speed_10m),
            condition: codeInfo.text,
            weatherCode: current.weather_code,
            lastUpdated: new Date().toISOString(),
          };
        } catch (e) {
          // Reliable fallback weather if external API call fails
          return {
            name: loc.name,
            key: loc.key,
            description: loc.desc,
            altitude: loc.alt,
            temp: loc.name === "Gulmarg" ? 12 : loc.name === "Srinagar" ? 22 : 18,
            tempMax: loc.name === "Gulmarg" ? 16 : loc.name === "Srinagar" ? 26 : 22,
            tempMin: loc.name === "Gulmarg" ? 6 : loc.name === "Srinagar" ? 14 : 10,
            humidity: 62,
            windSpeed: 8,
            condition: loc.name === "Gulmarg" ? "Cool & Pleasant" : "Sunny & Clear",
            weatherCode: 0,
            lastUpdated: new Date().toISOString(),
          };
        }
      })
    );

    res.json({
      success: true,
      locations: weatherData,
      seasonAdvisory: getSeasonAdvisory(),
    });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch Kashmir weather" });
  }
});

function getSeasonAdvisory() {
  const month = new Date().getMonth();
  if (month === 11 || month === 0 || month === 1) {
    return {
      season: "Winter (Peak Snow Season)",
      packing: "Heavy thermal thermowear, down jackets, snow boots, gloves, woolen caps, and lip balm.",
      roadStatus: "Srinagar-Gulmarg & Pahalgam roads open. Chains required for Gulmarg upper roads during heavy snow. Zoji La Pass may have periodic snow clearing closures.",
    };
  } else if (month >= 2 && month <= 4) {
    return {
      season: "Spring (Tulips & Almond Blossoms)",
      packing: "Light thermals, jackets, cardigans, comfortable walking shoes, and sunglasses.",
      roadStatus: "All major roads, Srinagar-Sonamarg, and Gulmarg Gondola operating smoothly. Indira Gandhi Memorial Tulip Garden open in Srinagar (late March to mid April).",
    };
  } else if (month >= 5 && month <= 8) {
    return {
      season: "Summer (Pleasant Mountain Escapes)",
      packing: "Light cotton clothes for day, light jacket/windcheater for evenings in Gulmarg & Pahalgam, sunscreen, and umbrella.",
      roadStatus: "All high passes open including Gurez Valley (Razdan Pass), Leh Highway via Sonamarg, and Sinthan Top.",
    };
  } else {
    return {
      season: "Autumn (Golden Chinar Leaves & Crisp Air)",
      packing: "Medium woolens, light thermals, comfortable sneakers, camera, and windbreakers.",
      roadStatus: "All routes clear with golden Chinar trees across Mughal Gardens, Nishat Bagh, and Boulevard Road.",
    };
  }
}

// ==========================================
// VITE / STATIC SERVING
// ==========================================
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
