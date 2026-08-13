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

const KASHMIR_KNOWLEDGE_BASE = `
### OFFICIAL BRAND & CONTACT INFORMATION
- Brand Name: KashmirYatra
- Tagline: "Your Journey to Paradise Begins Here"
- Primary Office Location: Awantipora, Jammu & Kashmir, India – 192122
- Primary WhatsApp Support & Booking: +91 7006248669 (Direct Link: https://wa.me/917006248669)
- Email: info@kashmiryatra.com
- Identity: KashmirYatra is a local Kashmir-based travel companion connecting travelers directly with verified local drivers, traditional houseboat hosts, and mountain resorts with zero agent markups.

### BOOKING & PAYMENT MECHANISM
- IMPORTANT: KashmirYatra does NOT operate automated online cart checkout or online card payments on the website.
- All inquiries, availability checks, custom itinerary quotes, and bookings are handled directly and transparently through WhatsApp (+91 7006248669).
- When a customer wishes to book or check availability, provide the direct WhatsApp link: https://wa.me/917006248669 (or include the specific package name in the message parameter: https://wa.me/917006248669?text=Hello%20KashmirYatra%2C%20I%20am%20interested%20in%20[Package%20Name]).
- Payments are finalized directly via official verified bank account transfers or UPI QR codes upon issuing official travel vouchers.

### COMPLETE PACKAGE CATALOG & PRICING
1. **Kashmir Escape (3 Nights / 4 Days)**
   - Category: Holiday Package
   - Starting Price: ₹11,999 per person
   - Tagline: Srinagar & Meadow Tour — A Perfect Short Gateway
   - Destinations Covered: Srinagar, Gulmarg, Pahalgam, Dal Lake
   - Key Highlights: 1 Night Luxury Houseboat stay on Dal Lake with Shikara ride; Gulmarg Gondola ride experience & snow meadow sightseeing; Pahalgam Lidder River walk & Betaab Valley excursion; Srinagar UNESCO Mughal Gardens (Nishat & Shalimar Bagh).
   - Day-by-Day Itinerary:
     * Day 1: Srinagar Airport pickup, check-in to Deluxe Houseboat on Dal Lake, evening 1-hour romantic Shikara ride passing floating vegetable gardens, dinner.
     * Day 2: Day excursion to Gulmarg (56 km / 2 hours) for Gondola cable car ride (Phase 1 & Phase 2) and snow activities. Return to Srinagar hotel for overnight stay.
     * Day 3: Day excursion to Pahalgam (Valley of Shepherds) via Pampore saffron fields; visit Betaab Valley, Aru Valley, and Lidder riverbank. Return to Srinagar hotel.
     * Day 4: Srinagar Mughal Gardens (Shalimar & Nishat Bagh), Shankaracharya Temple visit, souvenir shopping, and Srinagar Airport drop.
   - Accommodation: 1 Night Deluxe Houseboat (Dal/Nigeen Lake) + 2 Nights 3★/4★ Srinagar Hotel.
   - Inclusions: Welcome Kashmiri Kahwa, 1N Houseboat, 2N Hotel, Daily Breakfast & Dinner, 1-hr Shikara ride, dedicated private vehicle (Etios/Dzire/Innova) for all transfers and sightseeing, fuel, toll taxes, parking fees, driver allowance, 24/7 travel manager assistance.
   - Exclusions: Airfare/train fare, Gulmarg Gondola tickets (can be pre-booked via WhatsApp), Pahalgam local union cabs (Betaab/Aru), personal pony rides/snow bikes, garden entry fees, tips.
   - Best Time: All year round (Spring & Summer for greenery, Winter for snow).

2. **Kashmir Explorer (4 Nights / 5 Days)**
   - Category: Holiday Package
   - Starting Price: ₹15,499 per person
   - Tagline: Complete Valley Discovery — Srinagar, Gulmarg & Pahalgam Stay
   - Destinations Covered: Srinagar, Gulmarg, Pahalgam, Dal Lake, Mughal Gardens
   - Key Highlights: Overnight stay in Pahalgam amidst pine valleys and Lidder river; 1 Night Houseboat on Dal Lake; Full day Gulmarg snow slopes and Gondola cable car; Excursion to Betaab Valley, Aru Valley & Chandanwari; Mughal gardens and Shikara ride.
   - Day-by-Day Itinerary:
     * Day 1: Srinagar arrival, transfer to Dal Lake Deluxe Houseboat, welcome Kahwa, sunset Shikara cruise.
     * Day 2: Drive to Pahalgam via Pampore Saffron fields and Avantipur Ruins. Check-in to Pahalgam riverside resort. Afternoon Lidder river walk or horse ride to Baisaran Meadow (Mini Switzerland). Overnight in Pahalgam.
     * Day 3: Explore Betaab Valley, Aru Valley & Chandanwari. Scenic late-afternoon drive back to Srinagar hotel.
     * Day 4: Full day trip to Gulmarg. Ride Gondola Phase 1 & 2 to Apharwat Peak (13,780 ft), St. Mary's Church & Golf Course views. Return to Srinagar hotel.
     * Day 5: Visit Nishat Bagh, Shalimar Bagh, Chashme Shahi, Parimahal; souvenir shopping; Srinagar Airport drop.
   - Accommodation: 1 Night Houseboat + 1 Night Pahalgam Resort + 2 Nights Srinagar Hotel.
   - Inclusions: 4 Nights accommodation, Daily Breakfast & Dinner, 1-hr Shikara ride, dedicated private vehicle, fuel, tolls, driver charges.
   - Exclusions: Airfare, Gondola tickets, Pahalgam local union cabs, personal pony rides.

3. **Kashmir Grand Tour (5 Nights / 6 Days)**
   - Category: Holiday Package
   - Starting Price: ₹19,999 per person
   - Tagline: The Golden Triangle — Srinagar, Gulmarg, Pahalgam & Sonamarg
   - Destinations Covered: Srinagar, Gulmarg, Pahalgam, Sonamarg, Thajiwas Glacier
   - Key Highlights: Covers ALL top 4 Kashmir destinations (Srinagar, Gulmarg, Pahalgam, Sonamarg); Overnight stays in Pahalgam and Dal Lake Houseboat; Thajiwas Glacier excursion in Sonamarg (Meadow of Gold); Gulmarg Gondola Cable Car; Full day Pahalgam Valleys.
   - Day-by-Day Itinerary:
     * Day 1: Srinagar Airport arrival, check-in to Luxury Houseboat, evening Dal Lake Shikara ride.
     * Day 2: Day excursion to Sonamarg (85 km) along Sindh River. Visit Thajiwas Glacier by pony or foot. Return to Srinagar hotel.
     * Day 3: Day trip to Gulmarg. Phase 1 & 2 Gondola ride, snow sports, return to Srinagar hotel.
     * Day 4: Scenic drive to Pahalgam. Check-in to Pahalgam resort. Visit Betaab & Aru Valleys, Lidder river. Overnight in Pahalgam.
     * Day 5: Morning in Pahalgam. Return drive to Srinagar. Sightseeing of Nishat & Shalimar Mughal gardens, Parimahal, Shankaracharya Temple. Overnight in Srinagar hotel.
     * Day 6: Old Srinagar heritage walk, Jamia Masjid, dry fruit / Pashmina shopping, Srinagar Airport drop.
   - Accommodation: 1 Night Houseboat + 1 Night Pahalgam Resort + 3 Nights Srinagar Hotel.
   - Inclusions: 5 Nights accommodation, Breakfast & Dinner, Shikara ride, dedicated private vehicle for all excursions.
   - Exclusions: Airfare, Gondola tickets, Sonamarg pony tickets, personal expenses.

4. **Offbeat Kashmir Escape (3 Nights / 4 Days)**
   - Category: Offbeat Package
   - Starting Price: ₹13,500 per person
   - Tagline: Doodhpathri, Yusmarg & Quiet Mountain Valleys
   - Destinations Covered: Doodhpathri, Yusmarg, Aharbal Waterfall, Srinagar
   - Key Highlights: Doodhpathri (Valley of Milk) with untamed velvet green meadows & Shaliganga river; Yusmarg (Meadow of Jesus) with dense pine forest trails & Doodh Ganga river; Aharbal Waterfall (Niagara of Kashmir); crowd-free scenic photography.
   - Day-by-Day Itinerary:
     * Day 1: Srinagar arrival, transfer to boutique lakefront houseboat / boutique hotel, peaceful Shikara ride.
     * Day 2: Day trip to Doodhpathri (42 km). Walk along Shaliganga river, velvet meadows, fresh trout. Overnight in Srinagar.
     * Day 3: Excursion to Yusmarg (47 km). Pine forest trails, Doodh Ganga torrent, optional hike to Nilnag lake. Overnight in Srinagar.
     * Day 4: Morning visit to Aharbal Waterfall on Veshav river, transfer to Srinagar Airport.
   - Accommodation: 3 Nights tranquil boutique stays / houseboat.
   - Inclusions: 3 Nights stay, Breakfast & Dinner, dedicated private SUV, Shikara ride, driver allowances.

5. **Offbeat Kashmir Explorer (4 Nights / 5 Days)**
   - Category: Offbeat Package
   - Starting Price: ₹17,999 per person
   - Tagline: Gurez Valley & Hidden Border Jewels
   - Destinations Covered: Gurez Valley, Dawar, Habba Khatoon Peak, Razdan Pass, Srinagar
   - Key Highlights: Cross high Razdan Pass (11,672 ft); Stay in Dawar village beside turquoise Kishanganga River; View iconic pyramid Habba Khatoon Peak at sunset; Authentic Dard-Shin tribal culture; Stargazing.
   - Day-by-Day Itinerary:
     * Day 1: Srinagar to Gurez Valley via Bandipora and Razdan Pass (11,672 ft) with views of Mt. Harmukh. Descend into Dawar. Overnight wooden cottage in Dawar (Gurez).
     * Day 2: Full day exploring Habba Khatoon peak & spring, Sheikhpora village, and Tulail Valley border villages. Overnight in Gurez.
     * Day 3: Morning in Dawar, scenic return drive over Razdan Pass to Srinagar. Overnight hotel in Srinagar.
     * Day 4: Excursion to Doodhpathri velvet meadows. Evening market walk in Srinagar. Overnight in Srinagar.
     * Day 5: Morning Shikara on Nigeen Lake, transfer to Srinagar Airport.
   - Accommodation: 2 Nights Gurez Valley (Dawar Wooden Cottage / Homestay) + 2 Nights Srinagar Hotel.
   - Inclusions: 4 Nights accommodation, Breakfast & Dinner, Inner-Line border permits assistance, private SUV with mountain-experienced driver.
   - Note: Valid Government Photo ID proof (Aadhaar Card, Passport, or Voter ID) is mandatory for Gurez checkpoints.

6. **Offbeat Kashmir Grand Experience (5 Nights / 6 Days)**
   - Category: Offbeat Package
   - Starting Price: ₹22,500 per person
   - Tagline: The Secret Kashmir Odyssey — Gurez, Bangus, Doodhpathri & Yusmarg
   - Destinations Covered: Gurez Valley, Bangus Valley, Doodhpathri, Yusmarg, Srinagar
   - Key Highlights: Covers the top 4 hidden valleys of Kashmir; Bangus high-altitude biosphere; Gurez Kishanganga river stay; Doodhpathri & Yusmarg; 1 Night Houseboat.
   - Accommodation: 1 Night Bangus Region + 2 Nights Gurez Valley + 1 Night Houseboat + 1 Night Srinagar Hotel.
   - Inclusions: All Stays, Breakfast & Dinner, Inner Line Permits, private SUV (Innova / Scorpio).

7. **Gulmarg Alpine Ski & Snow Expedition (3 Nights / 4 Days)**
   - Category: Adventure Tour
   - Starting Price: ₹16,500 per person
   - Tagline: Powder Snow Paradise — Skiing & Snowboarding in Gulmarg
   - Destinations Covered: Gulmarg, Mount Apharwat, Kungdoor, Srinagar
   - Key Highlights: Skiing and snowboarding coaching on Gulmarg powder snow; Gondola Phase 1 & 2 up to 13,780 ft; Snowmobile & ATV snow safari; Drung Frozen Waterfall.
   - Day-by-Day Itinerary:
     * Day 1: Srinagar Airport pickup, direct snow transfer to Gulmarg (56 km), check-in to heated resort, ski equipment fitting.
     * Day 2: Morning ski coaching with certified local instructor on beginner slopes; Gondola Phase 1 & 2 to Apharwat peak. Overnight in Gulmarg.
     * Day 3: Snowmobiling / ATV safari, Drung Frozen Waterfall visit, afternoon drive to Srinagar hotel. Overnight in Srinagar.
     * Day 4: Morning Shikara on Dal Lake, Srinagar Airport transfer.
   - Accommodation: 2 Nights Heated Resort in Gulmarg + 1 Night Srinagar Hotel.
   - Inclusions: 3 Nights heated accommodation, Daily Breakfast & Dinner, 1-Day Ski Equipment rental (Skis, Boots, Poles) + Instructor session, 4x4 snow vehicles with tire chains.
   - Best Time: December to March (Winter Snow Season).

8. **Alpine Lakes Trekking & Camping (4 Nights / 5 Days)**
   - Category: Adventure Tour
   - Starting Price: ₹18,999 per person
   - Tagline: Great Lakes Trail Prelude — Sonamarg, Nichnai & Alpine Meadows
   - Destinations Covered: Sonamarg, Nichnai Pass, Table Top, Srinagar
   - Key Highlights: Guided alpine camping under starry skies in Sonamarg meadows; trek through birch forests, boulder fields and sparkling mountain tarns; certified guide, cook, and pack horses included; 1 Night celebration Houseboat stay.
   - Accommodation: 2 Nights Wilderness Tents + 1 Night Base Lodge + 1 Night Srinagar Houseboat.
   - Inclusions: Trekking tents, sleeping bags, mess tent, certified wilderness guide, cook, pack mules for personal luggage (up to 12kg/person), all meals during trek, 1N Houseboat.
   - Best Time: June to September.

9. **Kashmir Thrill — Rafting, Camping & Mountain Safari (5 Nights / 6 Days)**
   - Category: Adventure Tour
   - Starting Price: ₹21,999 per person
   - Tagline: River Rafting in Pahalgam, Sonamarg Glaciers & ATV Safari
   - Destinations Covered: Pahalgam, Sonamarg, Gulmarg, Lidder River, Srinagar
   - Key Highlights: Whitewater Rafting on Lidder River rapids in Pahalgam; Gondola and mountain ATV quad biking in Gulmarg; Sledging on Thajiwas Glacier in Sonamarg; Lakeside camping with campfire.
   - Accommodation: 1 Night Riverside Camp + 1 Night Pahalgam Resort + 2 Nights Srinagar + 1 Night Houseboat.
   - Inclusions: All Stays with Breakfast & Dinner, Lidder River Rafting ticket with safety gear, private SUV transfers.
   - Best Time: May to September.

### DESTINATIONS OVERVIEW
- **Srinagar**: Summer capital on the banks of Jhelum River. Famous for Dal Lake, Nigeen Lake, traditional cedar wood houseboats, Shikaras, Shalimar Bagh & Nishat Bagh Mughal gardens, Shankaracharya Temple, Hazratbal, Old City Jamia Masjid, Wazwan culinary feasts, and Pashmina/saffron shopping.
- **Gulmarg (8,690 ft)**: The Meadow of Flowers and ski capital. Home to the world-famous Gulmarg Gondola (Phase 1 to Kungdoor 10,000 ft, Phase 2 to Apharwat Peak 13,780 ft), highest golf course, St. Mary's historic church, snowmobiling, and Drung Frozen Waterfall.
- **Pahalgam (7,200 ft)**: The Valley of Shepherds along the crystal Lidder River. Gateway to Betaab Valley, Aru Valley, Chandanwari, and Baisaran Meadow (dubbed 'Mini Switzerland'). Top hub for whitewater rafting, trout fishing, and pine trail walks.
- **Sonamarg (8,950 ft)**: The Meadow of Gold. Gateway to Ladakh with golden alpine meadows, Sindh river, and the majestic Thajiwas Glacier.
- **Doodhpathri**: The Valley of Milk in Budgam district (42 km from Srinagar). Pristine untamed emerald grasslands and gushing Shaliganga stream.
- **Gurez Valley**: Crown of offbeat border valleys along the Line of Control. Features the iconic pyramid Habba Khatoon Peak, Dawar village, Kishanganga River, and Dard-Shin tribal culture. Requires valid Indian Govt ID proof for border checkposts.
- **Yusmarg**: The Meadow of Jesus (47 km from Srinagar). Surrounded by dense pine forests, Doodh Ganga torrent, and Nilnag lake.
- **Aharbal**: The Niagara of Kashmir (70 km from Srinagar). Spectacular 25m waterfall on the Veshav River.
- **Betaab Valley**: 15 km from Pahalgam, famous Bollywood filming location framed by willow groves and snow-capped peaks.
- **Aru Valley**: 12 km from Pahalgam, serene village with eco-cottages, horse riding, and base for Kolahoi Glacier treks.

### SERVICES OFFERED
1. **Tour Packages**: Customized holiday packages for families, couples, honeymooners, corporate groups, and solo travelers.
2. **Hotel & Stay Assistance**: Deluxe Houseboats on Dal/Nigeen Lake, heated winter mountain resorts in Gulmarg, riverside Pahalgam retreats, and boutique homestays.
3. **Cab & Transportation**: Dedicated sedans (Etios/Dzire), SUVs (Innova/Crysta/Scorpio), Tempo Travellers (12–26 seaters), and 4x4 snow-chained vehicles for winter sectors with polite local drivers.
4. **Customized Sightseeing**: Flexible pacing, heritage walks, Mughal gardens, and offbeat scenic viewpoints.
5. **Adventure Experiences**: Skiing coaching in Gulmarg, Lidder river rafting in Pahalgam, alpine trekking, snowmobiling, and ATV safaris.
6. **Customized Tour Planning**: 100% personalized itineraries crafted on WhatsApp to suit exact preferences.
7. **Airport & Transit Assistance**: Punctual pickup and drop at Sheikh ul-Alam International Airport (Srinagar IXL).
8. **Honeymoon Specials**: Houseboat stays, candle-light dinner setups, flower-bed room decoration, complimentary honeymoon cake, and private sunset Shikara rides.

### POLICIES, TERMS & FAQS
- **Pricing Policy**: All rates listed on the website are starting indicative prices per person on twin-sharing basis. Exact final quotes depend on travel dates, number of travelers, hotel category (3★/4★/5★), vehicle selection, and seasonal rates.
- **Cancellation & Refund Policy**:
  * 30 days or more prior to arrival: 90% refund of advance deposit (minus token administrative fee).
  * 15 to 29 days prior: 50% refund of total package cost.
  * 7 to 14 days prior: 25% refund of total package cost.
  * Less than 7 days prior or No Show: Non-refundable due to pre-paid hotel and vehicle blockages.
  * Weather / Snow Disruption: KashmirYatra assists in rescheduling dates or providing alternative safe sightseeing without unnecessary penalties wherever suppliers permit.
  * Refund Processing: Approved refunds are processed directly back to original bank/UPI accounts within 5–7 working days.
- **Border Permits**: Visitors to Gurez Valley must carry valid government photo ID (Aadhaar / Passport / Voter ID); KashmirYatra coordinates local permits.
- **Best Time to Visit**:
  * Spring (March–May): Tulip garden blooming (late March–mid April), almond blossoms, pleasant green valleys (10°C–20°C).
  * Summer (June–August): Pleasant weather (15°C–30°C), river rafting, lush green alpine meadows.
  * Autumn (Sept–November): Golden Chinar foliage, crisp mountain air, saffron harvest in Pampore (8°C–22°C).
  * Winter (Dec–February): Snow wonderland, skiing in Gulmarg, frozen streams, heated houseboats (-5°C–10°C).
`;

function getFallbackKashmirResponse(query: string): string {
  const q = query.toLowerCase();

  if (q.includes("escape") || (q.includes("4 day") || q.includes("3n/4d") || q.includes("3 night"))) {
    return `Khush Amdeed! Here are the verified details for **Kashmir Escape (3 Nights / 4 Days)**:

• **Category**: Holiday Package
• **Destinations**: Srinagar, Gulmarg, Pahalgam, Dal Lake
• **Starting Price**: ₹11,999 per person (This is a starting/indicative price. The final quotation may vary depending on travel dates, number of travellers, hotel category, vehicle type, season and availability.)
• **Key Inclusions**: 1 Night Luxury Houseboat stay on Dal Lake with 1-hr Shikara ride, 2 Nights Srinagar Hotel, Daily Breakfast & Dinner, dedicated private vehicle (Etios/Dzire/Innova) with fuel/tolls/parking, 24/7 assistance.
• **Exclusions**: Airfare, Gulmarg Gondola tickets, Pahalgam local union cabs (Betaab/Aru), personal pony rides.

💬 [Book Kashmir Escape on WhatsApp](https://wa.me/917006248669?text=Hello%20KashmirYatra%2C%20I%20am%20interested%20in%20the%20Kashmir%20Escape%203N%2F4D%20package)`;
  }

  if (q.includes("explorer") || (q.includes("5 day") || q.includes("4n/5d") || q.includes("4 night"))) {
    return `Khush Amdeed! Here are the verified details for **Kashmir Explorer (4 Nights / 5 Days)**:

• **Category**: Holiday Package
• **Destinations**: Srinagar, Gulmarg, Pahalgam, Dal Lake, Mughal Gardens
• **Starting Price**: ₹15,499 per person (This is a starting/indicative price. The final quotation may vary depending on travel dates, number of travellers, hotel category, vehicle type, season and availability.)
• **Key Inclusions**: 1 Night Houseboat + 1 Night Pahalgam Riverside Resort + 2 Nights Srinagar Hotel, Daily Breakfast & Dinner, 1-hr Shikara cruise, private vehicle for all excursions.
• **Exclusions**: Airfare, Gulmarg Gondola tickets, Pahalgam local union cabs, pony rides.

💬 [Book Kashmir Explorer on WhatsApp](https://wa.me/917006248669?text=Hello%20KashmirYatra%2C%20I%20am%20interested%20in%20the%20Kashmir%20Explorer%204N%2F5D%20package)`;
  }

  if (q.includes("grand") || (q.includes("6 day") || q.includes("5n/6d") || q.includes("5 night") || q.includes("golden triangle"))) {
    return `Khush Amdeed! Here are the verified details for **Kashmir Grand Tour (5 Nights / 6 Days)**:

• **Category**: Holiday Package (Covers Golden Triangle: Srinagar, Gulmarg, Pahalgam & Sonamarg)
• **Starting Price**: ₹19,999 per person (This is a starting/indicative price. The final quotation may vary depending on travel dates, number of travellers, hotel category, vehicle type, season and availability.)
• **Key Inclusions**: 1 Night Deluxe Houseboat + 1 Night Pahalgam Resort + 3 Nights Srinagar Hotel, Daily Breakfast & Dinner, Shikara ride, Thajiwas Glacier day trip, Gulmarg Gondola visit, full Pahalgam valleys.
• **Exclusions**: Airfare, Gondola tickets, Sonamarg pony rides, personal expenses.

💬 [Book Kashmir Grand Tour on WhatsApp](https://wa.me/917006248669?text=Hello%20KashmirYatra%2C%20I%20am%20interested%20in%20the%20Kashmir%20Grand%20Tour%205N%2F6D%20package)`;
  }

  if (q.includes("gurez") || q.includes("offbeat explorer") || q.includes("habba khatoon")) {
    return `Khush Amdeed! Here are the verified details for **Offbeat Kashmir Explorer (4 Nights / 5 Days - Gurez Valley)**:

• **Destinations**: Gurez Valley (Dawar), Habba Khatoon Peak, Razdan Pass (11,672 ft), Srinagar
• **Starting Price**: ₹17,999 per person (This is a starting/indicative price. The final quotation may vary depending on travel dates, number of travellers, hotel category, vehicle type, season and availability.)
• **Key Inclusions**: 2 Nights Gurez Valley wooden cottage/homestay + 2 Nights Srinagar Hotel, Breakfast & Dinner, Inner-Line border permits assistance, dedicated private SUV.
• **Important Note**: Valid Indian Government photo ID (Aadhaar/Passport/Voter ID) is mandatory for border checkpoints.

💬 [Inquire Gurez Valley Tour on WhatsApp](https://wa.me/917006248669?text=Hello%20KashmirYatra%2C%20I%20am%20interested%20in%20the%20Gurez%20Valley%20Offbeat%20Package)`;
  }

  if (q.includes("ski") || q.includes("snow expedition") || q.includes("winter adventure")) {
    return `Khush Amdeed! Here are the verified details for **Gulmarg Alpine Ski & Snow Expedition (3 Nights / 4 Days)**:

• **Destinations**: Gulmarg, Mount Apharwat, Kungdoor, Srinagar
• **Starting Price**: ₹16,500 per person (This is a starting/indicative price. The final quotation may vary depending on travel dates, number of travellers, hotel category, vehicle type, season and availability.)
• **Key Inclusions**: 2 Nights Heated Mountain Resort in Gulmarg + 1 Night Srinagar Hotel, Breakfast & Dinner, 1-day ski equipment rental (skis, boots, poles) + certified instructor session, 4x4 snow vehicle transfers with chains.
• **Best Time**: December to March.

💬 [Book Ski Expedition on WhatsApp](https://wa.me/917006248669?text=Hello%20KashmirYatra%2C%20I%20am%20interested%20in%20the%20Gulmarg%20Ski%20Expedition)`;
  }

  if (q.includes("trek") || q.includes("camping") || q.includes("alpine lake")) {
    return `Khush Amdeed! Here are the verified details for **Alpine Lakes Trekking & Camping (4 Nights / 5 Days)**:

• **Destinations**: Sonamarg, Nichnai Pass, Table Top, Srinagar
• **Starting Price**: ₹18,999 per person (This is a starting/indicative price. The final quotation may vary depending on travel dates, number of travellers, hotel category, vehicle type, season and availability.)
• **Key Inclusions**: Wilderness camping tents, sleeping bags, mess tent, certified guide, cook, pack mules for luggage, all meals during trek, 1N celebration Houseboat in Srinagar.
• **Best Time**: June to September.

💬 [Inquire Trekking on WhatsApp](https://wa.me/917006248669?text=Hello%20KashmirYatra%2C%20I%20am%20interested%20in%20the%20Alpine%20Lakes%20Trekking%20Package)`;
  }

  if (q.includes("cancel") || q.includes("refund") || q.includes("policy")) {
    return `Here is KashmirYatra's official **Cancellation & Refund Policy**:

• **30 days or more prior to arrival**: 90% refund of advance deposit (minus token administrative fee).
• **15 to 29 days prior**: 50% refund of total package cost.
• **7 to 14 days prior**: 25% refund of total package cost.
• **Less than 7 days or No Show**: Non-refundable due to pre-paid hotel and vehicle blockages.
• **Weather / Snow Disruptions**: KashmirYatra assists in rescheduling dates or arranging alternative safe sightseeing without unnecessary penalties wherever suppliers permit.
• **Refund Processing**: Approved refunds are processed directly back to your original bank account/UPI within 5–7 working days.

💬 [Contact KashmirYatra Support on WhatsApp](https://wa.me/917006248669)`;
  }

  if (q.includes("office") || q.includes("location") || q.includes("address") || q.includes("where are you")) {
    return `KashmirYatra's official office is located at:

**Awantipora, Jammu & Kashmir, India – 192122**

• **WhatsApp**: +91 7006248669
• **Email**: info@kashmiryatra.com
• **Tagline**: "Your Journey to Paradise Begins Here"

💬 [Message us on WhatsApp](https://wa.me/917006248669)`;
  }

  if (q.includes("book") || q.includes("payment") || q.includes("reserve") || q.includes("confirm")) {
    return `Khush Amdeed! Absolutely. I can help you with that. Your booking request will be handled by our KashmirYatra team on WhatsApp. Please continue with our team to confirm availability, pricing and booking details.

To finalize your Kashmir tour:
1. Click the WhatsApp link below or message us directly at **+91 7006248669**
2. Share your preferred travel dates, group size, and any custom requirements
3. Our Srinagar team will check live availability, share an exact quotation, and issue an official voucher
4. Finalize via verified bank transfer or UPI

💬 [Connect on WhatsApp (+91 7006248669) to Finalize Booking](https://wa.me/917006248669?text=Hello%20KashmirYatra%2C%20I%20am%20interested%20in%20booking%20a%20Kashmir%20tour%20package)`;
  }

  return `Khush Amdeed! 👋 I am **Kashmi**, your KashmirYatra travel consultant.

Here is verified information about KashmirYatra:
• **Office Location**: Awantipora, Jammu & Kashmir, India – 192122
• **Popular Packages**:
  - **Kashmir Escape (3N/4D)**: Starting ₹11,999/person (Srinagar, Gulmarg, Pahalgam, Dal Lake Houseboat)
  - **Kashmir Explorer (4N/5D)**: Starting ₹15,499/person (Includes overnight stay in Pahalgam)
  - **Kashmir Grand Tour (5N/6D)**: Starting ₹19,999/person (Srinagar, Gulmarg, Pahalgam & Sonamarg)
• **Offbeat & Adventure**: Offbeat Gurez Explorer (4N/5D - ₹17,999), Gulmarg Ski Tour (3N/4D - ₹16,500), Lidder Rafting & Safari (5N/6D - ₹21,999).

*Note: All prices are starting/indicative per person. The final quotation may vary depending on travel dates, number of travellers, hotel category, vehicle type, season and availability.*

💬 [Chat with KashmirYatra on WhatsApp: +91 7006248669](https://wa.me/917006248669)`;
}

// AI Assistant Endpoint powered by Gemini API
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGeminiClient();

    const systemInstruction = `You are "Kashmi", the official, highly knowledgeable, and friendly AI Travel Concierge for KashmirYatra.
Tagline: "Your Journey to Paradise Begins Here"

You are a warm, courteous, professional local Kashmiri travel consultant based in Jammu & Kashmir.

Here is the complete, official, and authoritative KashmirYatra knowledge base:
${KASHMIR_KNOWLEDGE_BASE}

--------------------------------------------------
CRITICAL BEHAVIORAL AND ACCURACY DIRECTIVES:
--------------------------------------------------

1. ACCURACY & NO HALLUCINATION RULE:
- You must NEVER make up or invent information.
- Always use the official KashmirYatra knowledge base provided above as your primary, authoritative knowledge source.
- If the requested information is NOT in the knowledge base or cannot be verified (e.g. today's live road closures, current exact snow depth on a specific slope today, specific flight/train schedules, unlisted discounts, live room availability on unconfirmed future dates), you MUST clearly say:
  "I don't have verified information about that at the moment. Please contact KashmirYatra on WhatsApp at +91 7006248669 for the latest information."
- NEVER invent packages, prices, discounts, hotel room availability, vehicle availability, booking confirmations, permits, flight/train timings, or road clearance statuses.

2. PRICING DIRECTIVES:
- If a package has a price listed in the catalog, state the exact listed starting price per person (e.g., ₹11,999 for Kashmir Escape 3N/4D, ₹15,499 for Kashmir Explorer 4N/5D, ₹19,999 for Kashmir Grand Tour 5N/6D, ₹13,500 for Offbeat Kashmir Escape 3N/4D, ₹17,999 for Offbeat Kashmir Explorer 4N/5D, ₹22,500 for Offbeat Kashmir Grand 5N/6D, ₹16,500 for Gulmarg Alpine Ski 3N/4D, ₹18,999 for Alpine Lakes Trekking 4N/5D, ₹21,999 for Kashmir Thrill 5N/6D).
- When mentioning package pricing, ALWAYS state:
  "This is a starting/indicative price. The final quotation may vary depending on travel dates, number of travellers, hotel category, vehicle type, season and availability."
- Never present a starting rate as a guaranteed, locked final quote.

3. BOOKING DIRECTIVES:
- Understand that KashmirYatra does NOT have online booking or online payments on the website.
- If the customer shows intent to book, asks how to book, asks to reserve, or confirms their trip (e.g., "I want to book this", "Can I reserve this package?", "I want to confirm the trip", "How do I book?"):
  * Respond warmly and state:
    "Absolutely. I can help you with that. Your booking request will be handled by our KashmirYatra team on WhatsApp. Please continue with our team to confirm availability, pricing and booking details."
  * Provide the direct WhatsApp booking link with the package name if discussed: https://wa.me/917006248669?text=Hello%20KashmirYatra%2C%20I%20am%20interested%20in%20[Package%20Name]
  * Do NOT claim or suggest that the booking is already confirmed, locked, or paid for. The final confirmation is provided directly by the KashmirYatra team on WhatsApp after checking dates and issuing travel vouchers.
- If the customer asks generally about contacting KashmirYatra, direct them to WhatsApp: +91 7006248669 (https://wa.me/917006248669).

4. PERSONALIZED RECOMMENDATIONS & GENERAL QUESTIONS:
- Act as an intelligent, helpful travel consultant. Understand user travel party, duration, and desires:
  * For 4 days (short gateway / peaceful couples/families): Recommend **Kashmir Escape (3N/4D)** (Srinagar, Gulmarg, Pahalgam, Dal Lake houseboat) or **Offbeat Kashmir Escape (3N/4D)** (Doodhpathri & Yusmarg), and explain why.
  * For 5 days (popular comprehensive / couples / families): Recommend **Kashmir Explorer (4N/5D)** (includes overnight stay in Pahalgam resort + Dal Lake houseboat + Gulmarg) or **Offbeat Kashmir Explorer (4N/5D)** (Gurez Valley & Habba Khatoon Peak).
  * For 6 days (complete classic or offbeat): Recommend **Kashmir Grand Tour (5N/6D)** (Golden Triangle: Srinagar, Gulmarg, Pahalgam, Sonamarg & Thajiwas Glacier) or **Offbeat Kashmir Grand (5N/6D)**.
  * For snow, skiing & adventure: Recommend **Gulmarg Alpine Ski & Snow Expedition (3N/4D)**, **Alpine Lakes Trekking (4N/5D)**, or **Kashmir Thrill Rafting & Safari (5N/6D)**.
  * For honeymoon: Recommend adding Honeymoon inclusions (candle-light dinner, flower-bed decor, cake, private Shikara) with Kashmir Explorer or Kashmir Escape.
- Compare packages accurately when asked (e.g. difference between 3N/4D and 5N/6D: 3N/4D has all stays in Srinagar/Houseboat with day trips to Gulmarg & Pahalgam, whereas 5N/6D includes an overnight stay in Pahalgam and a full day trip to Sonamarg & Thajiwas Glacier).
- State office location clearly: Awantipora, Jammu & Kashmir, India – 192122.
- State contact clearly: WhatsApp +91 7006248669, email info@kashmiryatra.com.

5. CONVERSATION STYLE:
- Friendly, professional, warm Kashmiri hospitality ("Khush Amdeed", "Adaab").
- Clear, structured responses with readable bullet points and bold key terms.
- Concise and focused on Kashmir tourism. Avoid fluff or generic boilerplate.`;

    if (!ai) {
      // Fallback response with exact verified project data
      return res.json({
        text: getFallbackKashmirResponse(message),
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
      model: "gemini-3.7-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.3,
      },
    });

    const replyText =
      response.text ||
      "Khush Amdeed! I am here to help you choose the best Kashmir package, explore destinations, or connect directly on WhatsApp at +91 7006248669.";

    res.json({ text: replyText });
  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    res.status(500).json({
      error: "Failed to generate AI response",
      fallbackText:
        "Khush Amdeed! I encountered a temporary connection issue. You can ask me about our packages (Kashmir Escape 3N/4D, Kashmir Explorer 4N/5D, Kashmir Grand Tour 5N/6D), or message our local Kashmir team directly on WhatsApp at +91 7006248669 (https://wa.me/917006248669)!",
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
