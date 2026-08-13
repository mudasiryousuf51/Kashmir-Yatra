import { Destination, FAQ, Package, ServiceItem, TravelerReview } from '../types';

export const WHATSAPP_NUMBER = "+91 7006248669";
export const WHATSAPP_RAW = "917006248669";

export function getWhatsAppLink(message?: string): string {
  const defaultText = "Hello KashmirYatra! I want to inquire about trip packages and availability for Kashmir.";
  const text = message || defaultText;
  return `https://wa.me/${WHATSAPP_RAW}?text=${encodeURIComponent(text)}`;
}

export function getPackageWhatsAppLink(packageName: string): string {
  const text = `Hello KashmirYatra, I am interested in booking the ${packageName}. Please share availability, itinerary and booking details.`;
  return `https://wa.me/${WHATSAPP_RAW}?text=${encodeURIComponent(text)}`;
}

export function getCustomPlanWhatsAppLink(planDetails: {
  duration: string;
  travelers: string;
  season: string;
  stayType: string;
  interests: string[];
}): string {
  const text = `Hello KashmirYatra, I would like a customized Kashmir trip quote:
- Duration: ${planDetails.duration}
- Travelers: ${planDetails.travelers}
- Preferred Month/Season: ${planDetails.season}
- Accommodation Standard: ${planDetails.stayType}
- Interests: ${planDetails.interests.join(', ')}
Please share available dates and customized itinerary pricing.`;
  return `https://wa.me/${WHATSAPP_RAW}?text=${encodeURIComponent(text)}`;
}

// Local image paths generated for the applet
import heroDalLake from '../assets/images/kashmir_hero_dal_lake_1786626682885.jpg';
import gulmargSnow from '../assets/images/gulmarg_snow_meadow_1786626702325.jpg';
import pahalgamRiver from '../assets/images/pahalgam_valley_river_1786626718521.jpg';

export const HERO_IMAGES = {
  dalLake: heroDalLake,
  gulmarg: gulmargSnow,
  pahalgam: pahalgamRiver,
  sonamarg: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
  shikara: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80",
  chinar: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
  mughalGardens: "https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1200&q=80",
  doodhpathri: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  gurez: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80"
};

export const PACKAGES: Package[] = [
  // 1. Kashmir Holiday Packages
  {
    id: "kashmir-escape-3n4d",
    title: "Kashmir Escape",
    tagline: "Srinagar & Meadow Tour — A Perfect Short Gateway",
    category: "holiday",
    duration: "3 Nights / 4 Days",
    nightsCount: 3,
    daysCount: 4,
    startingPricePerPerson: 11999,
    destinationsCovered: ["Srinagar", "Gulmarg", "Pahalgam", "Dal Lake"],
    keyHighlights: [
      "1 Night Luxury Houseboat stay on Dal Lake with Shikara ride",
      "Gulmarg Gondola ride experience & snow meadow sightseeing",
      "Pahalgam Lidder River bank walk & Betaab Valley excursion",
      "Srinagar UNESCO Mughal Gardens tour (Nishat & Shalimar Bagh)"
    ],
    overview: "Designed for travelers seeking a swift yet soul-satisfying taste of Kashmir. Experience romantic Dal Lake Shikara cruises, stay in traditional wood-carved houseboats, marvel at the snowy slopes of Gulmarg, and walk beside crystal-clear streams in Pahalgam.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Srinagar & Dal Lake Houseboat Experience",
        description: "Warm welcome at Srinagar Airport (IXL). Private transfer to Dal Lake. Check-in to traditional deluxe Houseboat. Evening romantic 1-hour Shikara ride on Dal Lake passing floating vegetable markets and Nehru Park.",
        activities: ["Srinagar Airport Pickup", "Houseboat Check-in", "Sunset Shikara Ride", "Traditional Kashmiri Dinner"],
        overnightStay: "Deluxe Houseboat, Dal Lake / Nigeen Lake",
        mealsIncluded: "Dinner"
      },
      {
        day: 2,
        title: "Srinagar to Gulmarg Excursion (Meadow of Flowers)",
        description: "After breakfast, drive to Gulmarg (56 km / 2 hours). Experience the world's second-highest Gondola cable car ride (Phase 1 & Phase 2). Enjoy snow activities, pony rides, or golf course views. Return to Srinagar hotel in evening.",
        activities: ["Drive to Gulmarg", "Gulmarg Gondola Ride", "Snow activities at Kungdoor / Apharwat", "Return to Srinagar"],
        overnightStay: "3-Star / 4-Star Deluxe Hotel, Srinagar",
        mealsIncluded: "Breakfast & Dinner"
      },
      {
        day: 3,
        title: "Day Excursion to Pahalgam (Valley of Shepherds)",
        description: "Scenic drive along saffron fields of Pampore and pine-forested Lidder river. Visit Betaab Valley, Aru Valley, and Chandanwari via local union cabs. Relax beside Lidder river. Return to Srinagar.",
        activities: ["Pampore Saffron Fields view", "Lidder Riverwalk", "Betaab Valley & Aru Valley excursion", "Evening local market shopping"],
        overnightStay: "3-Star / 4-Star Deluxe Hotel, Srinagar",
        mealsIncluded: "Breakfast & Dinner"
      },
      {
        day: 4,
        title: "Mughal Gardens Sightseeing & Airport Departure",
        description: "Visit famous Shalimar Bagh, Nishat Bagh, and Shankaracharya Temple. Last-minute souvenir shopping for Kashmiri Pashmina, saffron, and dry fruits. Transfer to Srinagar Airport with unforgettable memories.",
        activities: ["Mughal Gardens Tour", "Shankaracharya Temple visit", "Srinagar Airport Drop"],
        overnightStay: "Departure",
        mealsIncluded: "Breakfast"
      }
    ],
    accommodationInfo: "1 Night Deluxe Houseboat + 2 Nights 3-Star/4-Star Hotel in Srinagar.",
    transportationInfo: "Private sedan / SUV (Etios / Dzire / Innova) for all transfers and sightseeing throughout the tour.",
    inclusions: [
      "Welcome drink on arrival (Authentic Kashmiri Kahwa)",
      "1 Night accommodation in Deluxe Houseboat",
      "2 Nights accommodation in Premium Srinagar Hotel",
      "Daily Breakfast & Dinner at all hotels/houseboat",
      "1 Hour Complimentary Shikara Ride on Dal Lake",
      "All transfers & sightseeing in private dedicated vehicle",
      "Fuel charges, toll taxes, parking fees & driver allowances",
      "24/7 Local Kashmiri travel manager assistance on call/WhatsApp"
    ],
    exclusions: [
      "Airfare / Train fare to/from Srinagar",
      "Gulmarg Gondola tickets (Can be pre-booked via WhatsApp support)",
      "Pahalgam local union cab for Betaab Valley / Aru Valley",
      "Pony / Horse rides, snow bikes, or personal recreational expenses",
      "Gardan entry fees, camera tickets, tips, and personal insurance"
    ],
    bestTime: "All Year Round (Spring & Summer for greenery, Winter for snow)",
    importantNotes: [
      "Prices shown are starting rates per person on twin-sharing basis.",
      "Customizable: Extra nights, upgraded 4★/5★ hotels, or private vehicle upgrades available upon request.",
      "Gulmarg Gondola Phase 1 & 2 tickets must be booked early during peak season."
    ],
    image: heroDalLake
  },
  {
    id: "kashmir-explorer-4n5d",
    title: "Kashmir Explorer",
    tagline: "Complete Valley Discovery — Srinagar, Gulmarg & Pahalgam Stay",
    category: "holiday",
    duration: "4 Nights / 5 Days",
    nightsCount: 4,
    daysCount: 5,
    startingPricePerPerson: 15499,
    destinationsCovered: ["Srinagar", "Gulmarg", "Pahalgam", "Dal Lake", "Mughal Gardens"],
    keyHighlights: [
      "Overnight stay in Pahalgam amidst pine valleys and Lidder river",
      "Overnight Houseboat experience on Dal Lake",
      "Full day snow slopes and Gondola cable car experience in Gulmarg",
      "Excursion to Betaab Valley, Aru Valley & Chandanwari",
      "Shikara ride and ancient Srinagar heritage sites visit"
    ],
    overview: "Our most popular itinerary for couples and families! Includes overnight stays in both Pahalgam and Srinagar so you can savor serene pine-scented mountain evenings without rushing back.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Srinagar & Dal Lake Shikara Cruise",
        description: "Pickup from Srinagar Airport. Check-in to Dal Lake Houseboat. Relax with Kashmiri Kahwa. Evening sunset Shikara ride around Lotus gardens and Char Chinar.",
        activities: ["Airport Pickup", "Houseboat Check-in", "Sunset Shikara Ride", "Overnight stay"],
        overnightStay: "Deluxe Houseboat, Dal Lake",
        mealsIncluded: "Dinner"
      },
      {
        day: 2,
        title: "Srinagar to Pahalgam — Valley of Shepherds",
        description: "Drive to Pahalgam via Pampore Saffron fields and Avantipur Ruins. Check-in to Pahalgam hotel. Spend afternoon walking along Lidder river or riding horses to Baisaran Meadow (Mini Switzerland).",
        activities: ["Drive to Pahalgam", "Pampore Saffron Farms", "Baisaran Valley hike / pony ride", "Lidder River dinner"],
        overnightStay: "3-Star / 4-Star Resort, Pahalgam",
        mealsIncluded: "Breakfast & Dinner"
      },
      {
        day: 3,
        title: "Pahalgam Valleys Excursion & Return to Srinagar",
        description: "Explore Betaab Valley (filming location of famous movie Betaab), Aru Valley wildlife sanctuary, and Chandanwari. Drive back to Srinagar in late afternoon.",
        activities: ["Betaab Valley & Aru Valley Tour", "Chandanwari sightseeing", "Scenic evening drive back to Srinagar"],
        overnightStay: "3-Star / 4-Star Hotel, Srinagar",
        mealsIncluded: "Breakfast & Dinner"
      },
      {
        day: 4,
        title: "Srinagar to Gulmarg Day Trip",
        description: "Day trip to Gulmarg. Ride Phase 1 and Phase 2 Gondola to Mount Apharwat (13,780 ft). Enjoy skiing or panoramic snow views. Return to Srinagar hotel.",
        activities: ["Gulmarg Gondola Ride", "Snow activities & Photography", "St. Mary's Church & Golf Course view"],
        overnightStay: "3-Star / 4-Star Hotel, Srinagar",
        mealsIncluded: "Breakfast & Dinner"
      },
      {
        day: 5,
        title: "Mughal Gardens Tour & Airport Drop",
        description: "Explore Nishat Bagh, Shalimar Bagh, Chashme Shahi spring, and Parimahal overlooking Dal Lake. Airport transfer for homebound journey.",
        activities: ["Mughal Gardens Walk", "Local Souvenir Shopping", "Airport Drop"],
        overnightStay: "Departure",
        mealsIncluded: "Breakfast"
      }
    ],
    accommodationInfo: "1 Night Houseboat (Srinagar) + 1 Night Hotel (Pahalgam) + 2 Nights Hotel (Srinagar).",
    transportationInfo: "Dedicated private sedan/SUV with experienced local Kashmiri driver.",
    inclusions: [
      "1 Night Deluxe Houseboat Stay on Dal Lake",
      "1 Night Scenic Pahalgam Resort Stay",
      "2 Nights Srinagar Deluxe Hotel Stay",
      "Breakfast & Dinner at all accommodations",
      "1 Hour Complimentary Shikara Ride",
      "All transfers, sightseeing tours & fuel taxes included"
    ],
    exclusions: [
      "Airfare/train fare",
      "Gondola tickets & Pahalgam Union Cabs",
      "Personal activities & pony rides"
    ],
    bestTime: "March to November (Lush greenery & blooms) or Dec to Feb (Snow lovers)",
    importantNotes: [
      "Hotel category can be upgraded to luxury 4★/5★ boutique resorts upon WhatsApp request."
    ],
    image: pahalgamRiver
  },
  {
    id: "kashmir-grand-tour-5n6d",
    title: "Kashmir Grand Tour",
    tagline: "The Golden Triangle — Srinagar, Gulmarg, Pahalgam & Sonamarg",
    category: "holiday",
    duration: "5 Nights / 6 Days",
    nightsCount: 5,
    daysCount: 6,
    startingPricePerPerson: 19999,
    destinationsCovered: ["Srinagar", "Gulmarg", "Pahalgam", "Sonamarg", "Thajiwas Glacier"],
    keyHighlights: [
      "Covers ALL top 4 Kashmir wonderlands: Srinagar, Gulmarg, Pahalgam & Sonamarg",
      "Overnight stays in Pahalgam and Srinagar Houseboat",
      "Thajiwas Glacier pony/sledge trip in Sonamarg (Meadow of Gold)",
      "High altitude Gulmarg Gondola Cable Car Ride",
      "Full day Pahalgam Valleys (Aru, Betaab, Chandanwari)"
    ],
    overview: "The quintessential Kashmir holiday! Includes the breathtaking 'Meadow of Gold' Sonamarg alongside Gulmarg, Pahalgam, and Srinagar. Ideal for travelers who want an unhurried, comprehensive vacation.",
    itinerary: [
      {
        day: 1,
        title: "Srinagar Arrival & Romantic Houseboat Stay",
        description: "Greeting at Srinagar Airport. Transfer to luxury Houseboat. Relax with Shikara ride on Dal Lake in evening.",
        activities: ["Airport Pickup", "Houseboat Check-in", "Shikara Ride", "Welcome Kahwa"],
        overnightStay: "Deluxe Houseboat, Dal Lake",
        mealsIncluded: "Dinner"
      },
      {
        day: 2,
        title: "Srinagar to Sonamarg Excursion (Meadow of Gold)",
        description: "Scenic 85km drive along Sindh river to Sonamarg. Visit Thajiwas Glacier by pony or foot. Witness towering glaciers and icy mountain streams. Return to Srinagar hotel.",
        activities: ["Sonamarg Drive", "Thajiwas Glacier tour", "Sindh River view", "Return to Srinagar"],
        overnightStay: "3-Star / 4-Star Hotel, Srinagar",
        mealsIncluded: "Breakfast & Dinner"
      },
      {
        day: 3,
        title: "Srinagar to Gulmarg Excursion",
        description: "Full day in Gulmarg. Experience Phase 1 & 2 Gondola ride up Apharwat peak. Enjoy snow sports or stroll through alpine meadows.",
        activities: ["Gulmarg Gondola Ride", "Snow activities", "Golf Course visit"],
        overnightStay: "3-Star / 4-Star Hotel, Srinagar",
        mealsIncluded: "Breakfast & Dinner"
      },
      {
        day: 4,
        title: "Srinagar to Pahalgam (Overnight Stay)",
        description: "Drive to Pahalgam. Check-in to resort. Visit Betaab Valley and Aru Valley in afternoon. Evening walk along Lidder river markets.",
        activities: ["Pampore Saffron fields", "Pahalgam Resort Check-in", "Betaab & Aru Valleys"],
        overnightStay: "3-Star / 4-Star Resort, Pahalgam",
        mealsIncluded: "Breakfast & Dinner"
      },
      {
        day: 5,
        title: "Pahalgam to Srinagar & Mughal Gardens",
        description: "Morning leisure in Pahalgam. Return drive to Srinagar. Sightseeing of Nishat Bagh, Shalimar Bagh, Parimahal, and Shankaracharya Temple.",
        activities: ["Morning river walk in Pahalgam", "Return drive to Srinagar", "Mughal Gardens tour"],
        overnightStay: "3-Star / 4-Star Hotel, Srinagar",
        mealsIncluded: "Breakfast & Dinner"
      },
      {
        day: 6,
        title: "Old Srinagar Heritage Walk & Departure",
        description: "Visit historic Jamia Masjid, Shah-e-Hamdan shrine, and handicraft markets. Transfer to Srinagar Airport.",
        activities: ["Heritage & Souvenir Shopping", "Airport Drop"],
        overnightStay: "Departure",
        mealsIncluded: "Breakfast"
      }
    ],
    accommodationInfo: "1 Night Houseboat + 1 Night Pahalgam Resort + 3 Nights Srinagar Hotel.",
    transportationInfo: "Private dedicated sedan/SUV for entire itinerary.",
    inclusions: [
      "Houseboat + Hotel accommodation (5 Nights)",
      "Daily Breakfast & Dinner",
      "Shikara Ride on Dal Lake",
      "Excursions to Sonamarg, Gulmarg, Pahalgam & Srinagar",
      "All vehicle fuel, tolls, driver charges & assistance"
    ],
    exclusions: ["Airfare", "Gondola/Thajiwas pony tickets", "Personal expenses"],
    bestTime: "April to October (Gardens & Streams) & Winter for Snow lovers",
    importantNotes: [
      "Can add 1 extra night stay directly in Gulmarg upon request!"
    ],
    image: gulmargSnow
  },

  // 2. Offbeat Kashmir Packages
  {
    id: "offbeat-kashmir-3n4d",
    title: "Offbeat Kashmir Escape",
    tagline: "Doodhpathri, Yusmarg & Quiet Mountain Valleys",
    category: "offbeat",
    duration: "3 Nights / 4 Days",
    nightsCount: 3,
    daysCount: 4,
    startingPricePerPerson: 13500,
    destinationsCovered: ["Doodhpathri", "Yusmarg", "Aharbal Waterfall", "Srinagar"],
    keyHighlights: [
      "Doodhpathri (Valley of Milk) — pristine untamed velvet green meadows",
      "Yusmarg (Meadow of Jesus) — pine forest trails & Doodh Ganga river",
      "Aharbal Waterfall — the Niagara of Kashmir",
      "Pristine village hospitality and crowd-free photography"
    ],
    overview: "Escape the tourist crowds! Discover raw, untouched Kashmir meadows where crystal streams flow through lush velvet pine forests.",
    itinerary: [
      {
        day: 1,
        title: "Srinagar Arrival & Heritage Shikara",
        description: "Arrival in Srinagar. Transfer to boutique hotel or quiet lakefront houseboat. Evening peaceful Shikara ride away from commercial routes.",
        activities: ["Airport Pickup", "Check-in", "Peaceful Nigeen/Dal Lake Shikara"],
        overnightStay: "Boutique Lake Houseboat / Hotel",
        mealsIncluded: "Dinner"
      },
      {
        day: 2,
        title: "Doodhpathri Day Excursion (Valley of Milk)",
        description: "Drive to Doodhpathri (2 hours). Walk along Shaliganga river and grassy slopes. Enjoy local tea & fresh trout fish in serene alpine nature.",
        activities: ["Doodhpathri Meadow Trek", "Shaliganga Riverwalk", "Crowd-free photography"],
        overnightStay: "Hotel, Srinagar",
        mealsIncluded: "Breakfast & Dinner"
      },
      {
        day: 3,
        title: "Yusmarg & Nilnag Lake Discovery",
        description: "Excursion to Yusmarg, known for dense pine forests and Doodh Ganga mountain torrent. Optional light hike to hidden Nilnag lake.",
        activities: ["Yusmarg Pine Trails", "Doodh Ganga riverbank picnic", "Nilnag Lake trek"],
        overnightStay: "Hotel, Srinagar",
        mealsIncluded: "Breakfast & Dinner"
      },
      {
        day: 4,
        title: "Aharbal Waterfall Visit & Airport Transfer",
        description: "Morning visit to roaring Aharbal Waterfall on Veshav river. Direct transfer to Srinagar Airport.",
        activities: ["Aharbal Waterfall Sightseeing", "Airport Drop"],
        overnightStay: "Departure",
        mealsIncluded: "Breakfast"
      }
    ],
    accommodationInfo: "3 Nights in handpicked tranquil boutique stays.",
    transportationInfo: "Private SUV with knowledgeable offbeat route driver.",
    inclusions: [
      "3 Nights stay with Breakfast & Dinner",
      "Private vehicle for Doodhpathri, Yusmarg & Aharbal routes",
      "Complimentary Shikara ride",
      "All driver allowances & parking charges"
    ],
    exclusions: ["Airfare", "Personal pony rides", "Guide tips"],
    bestTime: "May to October (Lush meadows)",
    importantNotes: [
      "Itineraries can be customized according to season, road conditions and traveler preferences."
    ],
    image: HERO_IMAGES.doodhpathri
  },
  {
    id: "offbeat-kashmir-explorer-4n5d",
    title: "Offbeat Kashmir Explorer",
    tagline: "Gurez Valley & Hidden Border Jewels",
    category: "offbeat",
    duration: "4 Nights / 5 Days",
    nightsCount: 4,
    daysCount: 5,
    startingPricePerPerson: 17999,
    destinationsCovered: ["Gurez Valley", "Dawar", "Habba Khatoon Peak", "Razdan Pass", "Srinagar"],
    keyHighlights: [
      "Cross Razdan Pass (11,672 ft) into mystical Gurez Valley",
      "Stay in Dawar village beside Kishanganga River",
      "View iconic pyramidal Habba Khatoon Peak at sunset",
      "Explore Keran / Bangus Valley offbeat tracks",
      "Authentic Dard-Shin tribal cultural interaction"
    ],
    overview: "Journey into Gurez Valley — voted India's best offbeat destination! Nestled along the Kishanganga river with the looming Habba Khatoon peak, Gurez offers pure serenity, pristine wooden hamlets, and starry night skies.",
    itinerary: [
      {
        day: 1,
        title: "Srinagar to Gurez Valley via Razdan Pass",
        description: "Early morning drive through Bandipora to Razdan Pass (11,672 ft) offering view of Mt. Harmukh. Descend into Dawar, Gurez Valley along Kishanganga river.",
        activities: ["Razdan Pass view point", "Kishanganga Riverwalk", "Dawar Check-in"],
        overnightStay: "Wooden Cottage / Guest House, Dawar (Gurez)",
        mealsIncluded: "Breakfast & Dinner"
      },
      {
        day: 2,
        title: "Habba Khatoon Peak & Border Villages Excursion",
        description: "Full day exploring Habba Khatoon spring, Sheikhpora village, and Tulail Valley. Witness traditional Dard-Shin log houses and pristine mountain life.",
        activities: ["Habba Khatoon Spring & Sunset", "Tulail Valley drive", "Border village walk"],
        overnightStay: "Guest House / Homestay, Gurez",
        mealsIncluded: "Breakfast & Dinner"
      },
      {
        day: 3,
        title: "Gurez Leisure & Drive to Doodhpathri / Srinagar",
        description: "Morning riverside stroll in Dawar. Scenic return drive over Razdan Pass to Srinagar.",
        activities: ["Morning photos in Dawar", "Return drive over Razdan Pass", "Srinagar Check-in"],
        overnightStay: "Hotel, Srinagar",
        mealsIncluded: "Breakfast & Dinner"
      },
      {
        day: 4,
        title: "Doodhpathri Meadow Day Trip",
        description: "Excursion to velvet pastures of Doodhpathri. Evening local market shopping for Kashmiri craft and walnuts.",
        activities: ["Doodhpathri meadow walk", "Lal Chowk / Old City market walk"],
        overnightStay: "Hotel, Srinagar",
        mealsIncluded: "Breakfast & Dinner"
      },
      {
        day: 5,
        title: "Srinagar Departure",
        description: "Shikara ride on Nigeen lake. Airport transfer.",
        activities: ["Morning Shikara", "Airport Drop"],
        overnightStay: "Departure",
        mealsIncluded: "Breakfast"
      }
    ],
    accommodationInfo: "2 Nights Gurez Valley Stay + 2 Nights Srinagar Stay.",
    transportationInfo: "High-clearance SUV (Scorpio / Innova / Bolero 4x4 depending on season).",
    inclusions: [
      "4 Nights accommodation with Breakfast & Dinner",
      "Inner line border permits assistance for Gurez Valley",
      "Private vehicle with mountain-experienced local driver"
    ],
    exclusions: ["Airfare", "Personal expenses"],
    bestTime: "June to October (Gurez pass opens late spring)",
    importantNotes: [
      "Valid Government ID proof (Aadhaar/Passport) required for Gurez border checkpoints.",
      "Customizable according to road conditions and weather."
    ],
    image: HERO_IMAGES.gurez
  },
  {
    id: "offbeat-grand-5n6d",
    title: "Offbeat Kashmir Grand Experience",
    tagline: "The Secret Kashmir Odyssey — Gurez, Bangus, Doodhpathri & Yusmarg",
    category: "offbeat",
    duration: "5 Nights / 6 Days",
    nightsCount: 5,
    daysCount: 6,
    startingPricePerPerson: 22500,
    destinationsCovered: ["Gurez Valley", "Bangus Valley", "Doodhpathri", "Yusmarg", "Srinagar"],
    keyHighlights: [
      "Ultimate offbeat itinerary covering top 4 hidden valleys of Kashmir",
      "Bangus Valley high-altitude grasslands & coniferous wilderness",
      "Gurez Valley Kishanganga river homestay experience",
      "Stargazing under unpolluted mountain night skies",
      "Fully customized pace with private SUV"
    ],
    overview: "For intrepid wanderers and nature purists! Immerse yourself in Kashmir's most guarded secret paradises — Bangus, Gurez, Doodhpathri, and Yusmarg.",
    itinerary: [
      {
        day: 1,
        title: "Srinagar to Bangus Valley region",
        description: "Drive north to Kupwara district into Bangus Valley foothills. Check-in to nature stay.",
        activities: ["North Kashmir scenic drive", "Bangus valley rim walk"],
        overnightStay: "Boutique Resort / Homestay, Kupwara/Bangus region",
        mealsIncluded: "Dinner"
      },
      {
        day: 2,
        title: "Bangus Meadow & Drive to Gurez",
        description: "Morning exploration of pristine Bangus biosphere. Drive through Razdan Pass into Dawar, Gurez Valley.",
        activities: ["Bangus biosphere walk", "Razdan Pass crossing", "Dawar sunset"],
        overnightStay: "Wooden Cottage, Gurez",
        mealsIncluded: "Breakfast & Dinner"
      },
      {
        day: 3,
        title: "Gurez & Tulail Valley Discovery",
        description: "Explore Habba Khatoon peak, Tulail, Chakwali (last Indian village), and river streams.",
        activities: ["Chakwali village visit", "Habba Khatoon view point", "Local Dard culture experience"],
        overnightStay: "Wooden Cottage, Gurez",
        mealsIncluded: "Breakfast & Dinner"
      },
      {
        day: 4,
        title: "Gurez to Srinagar & Houseboat",
        description: "Return drive to Srinagar. Check-in to luxury houseboat on Nigeen Lake. Relaxing evening Shikara ride.",
        activities: ["Scenic drive to Srinagar", "Nigeen Lake Houseboat", "Sunset Shikara"],
        overnightStay: "Deluxe Houseboat, Nigeen/Dal Lake",
        mealsIncluded: "Breakfast & Dinner"
      },
      {
        day: 5,
        title: "Doodhpathri & Yusmarg Excursion",
        description: "Full day excursion combining Doodhpathri grasslands and Yusmarg pine forest.",
        activities: ["Doodhpathri picnic", "Yusmarg pine trails"],
        overnightStay: "Hotel, Srinagar",
        mealsIncluded: "Breakfast & Dinner"
      },
      {
        day: 6,
        title: "Airport Departure",
        description: "Souvenir shopping for local honey & saffron, transfer to Airport.",
        activities: ["Souvenir shop visit", "Airport Transfer"],
        overnightStay: "Departure",
        mealsIncluded: "Breakfast"
      }
    ],
    accommodationInfo: "1 Night Bangus Region + 2 Nights Gurez + 1 Night Houseboat + 1 Night Srinagar Hotel.",
    transportationInfo: "Private SUV (Innova / Scorpio).",
    inclusions: ["All Stays", "Breakfast & Dinner", "Inner Line Permits", "Vehicle & Driver"],
    exclusions: ["Airfare", "Personal expenses"],
    bestTime: "June to October",
    importantNotes: [
      "Can be tailored based on weather and route status."
    ],
    image: HERO_IMAGES.gurez
  },

  // 3. Adventure Tours
  {
    id: "adventure-gulmarg-ski-3n4d",
    title: "Gulmarg Alpine Ski & Snow Expedition",
    tagline: "Powder Snow Paradise — Skiing & Snowboarding in Gulmarg",
    category: "adventure",
    duration: "3 Nights / 4 Days",
    nightsCount: 3,
    daysCount: 4,
    startingPricePerPerson: 16500,
    destinationsCovered: ["Gulmarg", "Mount Apharwat", "Kungdoor", "Srinagar"],
    keyHighlights: [
      "Skiing & Snowboarding lessons on world-famous Gulmarg powder snow",
      "Gondola Phase 1 & Phase 2 ride up to 13,780 feet",
      "Snowmobile & All-Terrain Vehicle (ATV) snow safari",
      "Certified local ski instructor guidance"
    ],
    overview: "Gulmarg is globally celebrated for having some of the finest powdery snow slopes in Asia. Whether you're a beginner wanting ski lessons or an enthusiast riding the Gondola, this adventure delivers pure adrenaline.",
    itinerary: [
      {
        day: 1,
        title: "Srinagar Arrival & Direct Transfer to Gulmarg",
        description: "Pickup from Srinagar Airport. Direct scenic snow drive to Gulmarg (56km). Check-in to heated mountain hotel. Ski equipment fitting session.",
        activities: ["Airport Pickup", "Snow vehicle drive to Gulmarg", "Equipment fitting"],
        overnightStay: "Heated Resort, Gulmarg",
        mealsIncluded: "Dinner"
      },
      {
        day: 2,
        title: "Full Day Skiing & Gondola Phase 1 & 2",
        description: "Morning ski coaching with certified local instructor on beginner slopes. Ride Gondola Phase 1 & Phase 2 to Apharwat peak for high-altitude snow views.",
        activities: ["Skiing session with instructor", "Gondola Phase 1 & 2 trip", "Apharwat Peak snow walk"],
        overnightStay: "Heated Resort, Gulmarg",
        mealsIncluded: "Breakfast & Dinner"
      },
      {
        day: 3,
        title: "Snowmobiling, ATV Ride & Gulmarg to Srinagar",
        description: "Morning snow ATV safari or sledge ride at Drung Frozen Waterfall. Evening drive back to Srinagar.",
        activities: ["Drung Frozen Waterfall tour", "Snowmobiling", "Drive to Srinagar"],
        overnightStay: "3-Star / 4-Star Hotel, Srinagar",
        mealsIncluded: "Breakfast & Dinner"
      },
      {
        day: 4,
        title: "Srinagar Airport Departure",
        description: "Morning Shikara ride on Dal Lake, transfer to Srinagar Airport.",
        activities: ["Shikara ride", "Airport Drop"],
        overnightStay: "Departure",
        mealsIncluded: "Breakfast"
      }
    ],
    accommodationInfo: "2 Nights Heated Resort in Gulmarg + 1 Night Hotel in Srinagar.",
    transportationInfo: "Chained-tire 4x4 snow vehicles for snow roads in Gulmarg.",
    inclusions: [
      "3 Nights Accommodations with Heating facilities",
      "Daily Breakfast & Dinner",
      "1 Day Ski Equipment rental (Skis, Boots, Poles) + Instructor session",
      "4x4 Snow vehicle transport in winter sector"
    ],
    exclusions: ["Airfare", "Gondola Phase 1/2 tickets", "Personal extreme sports insurance"],
    bestTime: "December to March (Winter Snow Season)",
    difficulty: "Moderate",
    importantNotes: [
      "Gondola pre-booking required at least 3 weeks in advance during winter peak."
    ],
    image: gulmargSnow
  },
  {
    id: "adventure-kashmir-trekking-4n5d",
    title: "Alpine Lakes Trekking & Camping",
    tagline: "Great Lakes Trail Prelude — Sonamarg, Nichnai & Alpine Meadows",
    category: "adventure",
    duration: "4 Nights / 5 Days",
    nightsCount: 4,
    daysCount: 5,
    startingPricePerPerson: 18999,
    destinationsCovered: ["Sonamarg", "Nichnai Pass", "Table Top", "Srinagar"],
    keyHighlights: [
      "Guided alpine camping under brilliant starry skies in Sonamarg meadows",
      "Trek through pine forests, boulder fields and sparkling mountain tarns",
      "Professional trekking guide, camp crew & pack horses included",
      "1 Night luxury Houseboat stay celebration at the end of trek"
    ],
    overview: "Trek into the heart of Kashmir's high mountain wilderness. Experience lush campsites, roaring glaciers, turquoise tarns, and campfires amidst Himalayan peaks.",
    itinerary: [
      {
        day: 1,
        title: "Srinagar Arrival & Drive to Sonamarg Base Camp",
        description: "Pickup from Srinagar Airport. Drive to Sonamarg base camp along Sindh river. Briefing session and acclimatization walk.",
        activities: ["Sonamarg drive", "Equipment check", "Acclimatization walk"],
        overnightStay: "Alpine Camping Tents / Lodge, Sonamarg",
        mealsIncluded: "Dinner"
      },
      {
        day: 2,
        title: "Trek Sonamarg to Table Top / Shekdur Meadow",
        description: "Begin trek from Shitkadi village through birch and pine forests up to Shekdur meadow with views of Sonamarg valley below.",
        activities: ["Guided trekking (5-6 hours)", "Campfire & evening stargazing"],
        overnightStay: "Wilderness Tents, Shekdur / Nichnai",
        mealsIncluded: "Breakfast, Packed Lunch & Hot Dinner"
      },
      {
        day: 3,
        title: "Nichnai Meadow Exploration & Stream Crossing",
        description: "Trek along roaring alpine streams flanked by silver birch trees and towering snow peaks.",
        activities: ["Alpine valley trek", "Glacial stream photography"],
        overnightStay: "Wilderness Tents, Nichnai",
        mealsIncluded: "Breakfast, Packed Lunch & Hot Dinner"
      },
      {
        day: 4,
        title: "Descent to Sonamarg & Drive to Srinagar Houseboat",
        description: "Descend back to Sonamarg base. Private transfer to Srinagar lake houseboat. Celebrate trek completion with hot Kahwa and traditional Wazwan meal.",
        activities: ["Descent trek", "Drive to Srinagar", "Houseboat Celebration"],
        overnightStay: "Deluxe Houseboat, Srinagar",
        mealsIncluded: "Breakfast & Celebration Dinner"
      },
      {
        day: 5,
        title: "Shikara Ride & Departure",
        description: "Morning Shikara cruise, souvenir shopping, transfer to Srinagar Airport.",
        activities: ["Shikara Ride", "Airport Transfer"],
        overnightStay: "Departure",
        mealsIncluded: "Breakfast"
      }
    ],
    accommodationInfo: "2 Nights Wilderness Tents + 1 Night Base Lodge + 1 Night Houseboat.",
    transportationInfo: "Private vehicle transfers + Pack mules for luggage support.",
    inclusions: [
      "Trekking Tents, Sleeping Bags, Mattresses & Mess Tent",
      "Certified Wilderness Guide, Cook & Helper staff",
      "Pack mules for personal baggage (up to 12kg/person)",
      "All meals during trekking",
      "1 Night Deluxe Houseboat Stay in Srinagar"
    ],
    exclusions: ["Airfare", "Personal trekking boots/jackets"],
    bestTime: "June to September",
    difficulty: "Moderate",
    importantNotes: [
      "Reasonable physical fitness required. Customized dates available for groups on WhatsApp."
    ],
    image: HERO_IMAGES.sonamarg
  },
  {
    id: "adventure-rafting-camping-5n6d",
    title: "Kashmir Thrill — Rafting, Camping & Mountain Safari",
    tagline: "River Rafting in Pahalgam, Sonamarg Glaciers & ATV Safari",
    category: "adventure",
    duration: "5 Nights / 6 Days",
    nightsCount: 5,
    daysCount: 6,
    startingPricePerPerson: 21999,
    destinationsCovered: ["Pahalgam", "Sonamarg", "Gulmarg", "Lidder River", "Srinagar"],
    keyHighlights: [
      "Whitewater Rafting session on wild rapids of Lidder River in Pahalgam",
      "Gondola ride and high-altitude mountain ATV quad biking in Gulmarg",
      "Sledge sliding on Thajiwas Glacier snow in Sonamarg",
      "Lakeside camping experience with campfire barbecue"
    ],
    overview: "Combine Kashmir's legendary beauty with thrilling white water rafting, quad biking, and glacier walking. The ultimate active holiday for adrenaline junkies!",
    itinerary: [
      {
        day: 1,
        title: "Srinagar to Pahalgam Rafting Base",
        description: "Pickup from Srinagar Airport. Drive to Pahalgam. Check-in to riverside camp/resort.",
        activities: ["Scenic drive", "Lidder River campsite check-in"],
        overnightStay: "Riverside Resort / Luxury Tents, Pahalgam",
        mealsIncluded: "Dinner"
      },
      {
        day: 2,
        title: "Lidder River Whitewater Rafting & Betaab Valley",
        description: "Raft down Joy Ride / Extra Joy ride stretch on Lidder River with professional rafting crew. Afternoon Betaab Valley exploration.",
        activities: ["Whitewater Rafting session", "Betaab & Aru Valleys tour"],
        overnightStay: "Resort, Pahalgam",
        mealsIncluded: "Breakfast & Dinner"
      },
      {
        day: 3,
        title: "Pahalgam to Sonamarg Glacier Adventure",
        description: "Drive to Sonamarg. Hike or ride ponies up to Thajiwas Glacier. Enjoy snow sledging.",
        activities: ["Sonamarg drive", "Glacier sledge ride"],
        overnightStay: "Hotel, Sonamarg / Srinagar",
        mealsIncluded: "Breakfast & Dinner"
      },
      {
        day: 4,
        title: "Gulmarg Gondola & ATV Safari",
        description: "Full day in Gulmarg. Gondola Phase 1 & 2. Quad bike ride through alpine trail.",
        activities: ["Gulmarg Gondola", "ATV Quad Biking"],
        overnightStay: "Hotel, Srinagar",
        mealsIncluded: "Breakfast & Dinner"
      },
      {
        day: 5,
        title: "Srinagar Water Sports & Houseboat",
        description: "Jet ski & Speed boat ride on Manasbal / Dal Lake. Evening Houseboat stay.",
        activities: ["Dal Lake Speedboat ride", "Houseboat Stay", "Shikara Sunset"],
        overnightStay: "Deluxe Houseboat, Srinagar",
        mealsIncluded: "Breakfast & Dinner"
      },
      {
        day: 6,
        title: "Airport Drop",
        description: "Transfer to Srinagar Airport.",
        activities: ["Airport Drop"],
        overnightStay: "Departure",
        mealsIncluded: "Breakfast"
      }
    ],
    accommodationInfo: "1 Night Riverside Camp + 1 Night Pahalgam + 2 Nights Srinagar + 1 Night Houseboat.",
    transportationInfo: "Private SUV sedan with driver.",
    inclusions: [
      "All Stays with Breakfast & Dinner",
      "Lidder River Rafting ticket with safety gear",
      "Private transfers & drivers"
    ],
    exclusions: ["Airfare", "Gondola tickets", "Personal tips"],
    bestTime: "May to September (River water levels ideal for rafting)",
    difficulty: "Moderate",
    importantNotes: [
      "Raffting is subject to water flow conditions and weather safety."
    ],
    image: pahalgamRiver
  }
];

export const DESTINATIONS: Destination[] = [
  {
    id: "srinagar",
    name: "Srinagar",
    category: "popular",
    tag: "Summer Capital & Lake Jewel",
    image: heroDalLake,
    shortDesc: "The heart of Kashmir, famous for iconic Dal Lake, carved wooden houseboats, and romantic Mughal Gardens.",
    longDesc: "Srinagar, situated on the banks of the Jhelum river, is a city of lakes, ancient bridges, bustling bazaars, and timeless Mughal heritage. Floating on a Shikara at sunrise with snow mountains mirrored in serene waters is an unmissable Indian travel bucket list experience.",
    mainAttractions: ["Dal Lake & Nigeen Lake", "Shalimar Bagh & Nishat Bagh", "Shankaracharya Temple", "Hazratbal Shrine", "Old City Jamia Masjid"],
    thingsToDo: ["Overnight Houseboat Stay", "Shikara Ride at Sunrise/Sunset", "Pashmina Shawl & Saffron Shopping", "Kashmiri Wazwan Dining"],
    bestTimeToVisit: "All Year (April-Oct for greenery, Dec-Feb for winter chill)",
    recommendedDuration: "2-3 Days",
    nearbyDestinations: ["Gulmarg (56 km)", "Pahalgam (90 km)", "Sonamarg (85 km)"]
  },
  {
    id: "gulmarg",
    name: "Gulmarg",
    category: "popular",
    tag: "Meadow of Flowers & Ski Capital",
    image: gulmargSnow,
    shortDesc: "Home to the world's highest cable car ride (Gondola), pristine snow slopes, and lush summer golf course.",
    longDesc: "At 8,690 feet, Gulmarg blossoms into a colorful floral valley in summer and turns into Asia's premier skiing destination in winter. The famous Gulmarg Gondola carries visitors up to Apharwat Peak at 13,780 feet overlooking Nanga Parbat mountain range.",
    mainAttractions: ["Gulmarg Gondola (Phase 1 & Phase 2)", "Mount Apharwat", "St. Mary's Church", "Gulmarg Golf Course", "Drung Frozen Waterfall"],
    thingsToDo: ["Skiing & Snowboarding", "Gondola Cable Car Ride", "Snowmobile Safari", "High-altitude ATV Quad Biking"],
    bestTimeToVisit: "December to March (For Snow & Skiing), April to June (For Green Meadows)",
    recommendedDuration: "1-2 Days",
    nearbyDestinations: ["Srinagar (56 km)", "Tangmarg (13 km)"]
  },
  {
    id: "pahalgam",
    name: "Pahalgam",
    category: "popular",
    tag: "Valley of Shepherds & Lidder River",
    image: pahalgamRiver,
    shortDesc: "A picturesque pine-scented valley along the crystal clear Lidder river, famous for Betaab & Aru Valleys.",
    longDesc: "Pahalgam is a tranquil paradise surrounded by thick fir forests and snow-capped peaks. It serves as the base for the sacred Amarnath Yatra and offers spellbinding meadows like Baisaran, often dubbed 'Mini Switzerland'.",
    mainAttractions: ["Betaab Valley", "Aru Valley", "Chandanwari", "Baisaran Meadow", "Lidder Riverfront"],
    thingsToDo: ["Lidder River Whitewater Rafting", "Horse Riding to Baisaran", "Trout Fishing", "Pine Forest Trail Walks"],
    bestTimeToVisit: "March to November",
    recommendedDuration: "2 Days",
    nearbyDestinations: ["Srinagar (90 km)", "Anantnag (45 km)"]
  },
  {
    id: "sonamarg",
    name: "Sonamarg",
    category: "popular",
    tag: "Meadow of Gold & Glaciers",
    image: HERO_IMAGES.sonamarg,
    shortDesc: "A gateway to Ladakh with golden alpine pastures, Thajiwas Glacier, and roaring mountain torrents.",
    longDesc: "Sonamarg lies at an altitude of 8,950 feet amidst majestic Himalayan peaks. Known as the 'Meadow of Gold', it features breathtaking glaciers, silver birch trees, and sparkling blue alpine streams.",
    mainAttractions: ["Thajiwas Glacier", "Zero Point Zoji La Pass", "Sindh River", "Baltal Valley"],
    thingsToDo: ["Sledge Ride on Thajiwas Glacier", "Riverbank Camping", "Short Alpine Treks", "Snow Sledging"],
    bestTimeToVisit: "April to October",
    recommendedDuration: "1-2 Days",
    nearbyDestinations: ["Srinagar (85 km)", "Kargil (120 km)"]
  },
  {
    id: "doodhpathri",
    name: "Doodhpathri",
    category: "offbeat",
    tag: "Valley of Milk",
    image: HERO_IMAGES.doodhpathri,
    shortDesc: "Untouched, velvety emerald green pastures where roaring rivers foam like white milk.",
    longDesc: "Located in Budgam district, Doodhpathri is an pristine offbeat jewel. Its broad grassy knolls, pine-covered ridges, and the gushing Shaliganga stream offer serene sanctuary away from crowded tourist spots.",
    mainAttractions: ["Shaliganga River", "Tangnar Valley", "Dikshal Meadows"],
    thingsToDo: ["Crowd-free Meadow Picnics", "River Foot Bathing", "Nature Photography"],
    bestTimeToVisit: "May to October",
    recommendedDuration: "Day Excursion from Srinagar (42 km)",
    nearbyDestinations: ["Srinagar (42 km)", "Yusmarg (50 km)"]
  },
  {
    id: "gurez-valley",
    name: "Gurez Valley",
    category: "offbeat",
    tag: "Crown of Border Valleys",
    image: HERO_IMAGES.gurez,
    shortDesc: "Voted India's best offbeat destination with the iconic pyramid Habba Khatoon peak and Kishanganga River.",
    longDesc: "Tucked along the Line of Control, Gurez Valley is a fairytale world of traditional wooden Dard-Shin hamlets, clear turquoise waters of Kishanganga river, and dramatic mountain amphitheatres.",
    mainAttractions: ["Habba Khatoon Peak & Spring", "Dawar Village", "Tulail Valley", "Chakwali Village"],
    thingsToDo: ["Log House Homestays", "Star Gazing", "Border Village Walks", "Kishanganga Riverwalk"],
    bestTimeToVisit: "June to October (Pass closes in winter snow)",
    recommendedDuration: "2-3 Days",
    nearbyDestinations: ["Razdan Pass (45 km)", "Bandipora (86 km)"]
  },
  {
    id: "yusmarg",
    name: "Yusmarg",
    category: "offbeat",
    tag: "Meadow of Jesus",
    image: HERO_IMAGES.chinar,
    shortDesc: "Tranquil pine forest hills, roaring Doodh Ganga river, and alpine Nilnag lake.",
    longDesc: "Legend says Jesus once walked through these verdant meadows, giving it the name Yusmarg. It is ideal for peaceful pine trail hikes, pony rides, and picnics beside wild mountain torrents.",
    mainAttractions: ["Doodh Ganga River", "Nilnag Alpine Lake", "Sang-e-Safed Valley"],
    thingsToDo: ["Pine Forest Hikes", "Trout Stream Watching", "Horse Rides"],
    bestTimeToVisit: "April to November",
    recommendedDuration: "1 Day Excursion",
    nearbyDestinations: ["Srinagar (47 km)", "Doodhpathri (50 km)"]
  },
  {
    id: "aharbal",
    name: "Aharbal",
    category: "offbeat",
    tag: "Niagara of Kashmir",
    image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80",
    shortDesc: "A thunderous waterfall on Veshav river plunging through narrow granite gorges.",
    longDesc: "Aharbal is famous for its dramatic 25-meter waterfall surrounded by dense pine forests. It also serves as a gateway to high altitude lakes like Kungwattan and Kausar Nag.",
    mainAttractions: ["Aharbal Waterfall", "Veshav River Canyon", "Kungwattan Meadow"],
    thingsToDo: ["Waterfall Viewing", "Trek to Kausar Nag", "Nature Walks"],
    bestTimeToVisit: "May to October",
    recommendedDuration: "1 Day",
    nearbyDestinations: ["Shopian (28 km)", "Srinagar (70 km)"]
  },
  {
    id: "betaab-valley",
    name: "Betaab Valley",
    category: "valley",
    tag: "Lush Cinema Valley",
    image: pahalgamRiver,
    shortDesc: "Framed by willow trees and snow peaks, made famous by the iconic Bollywood movie 'Betaab'.",
    longDesc: "Located 15 km from Pahalgam, Betaab Valley is a postcard-perfect meadow where the Lidder river cuts through lush velvet lawns framed by pine forest slopes.",
    mainAttractions: ["Lidder River Bend", "Wooden Footbridges", "Willow Groves"],
    thingsToDo: ["Bollywood Photography", "Riverbank Stroll", "Family Picnic"],
    bestTimeToVisit: "April to October",
    recommendedDuration: "3-4 Hours",
    nearbyDestinations: ["Pahalgam (15 km)", "Aru Valley (12 km)"]
  },
  {
    id: "aru-valley",
    name: "Aru Valley",
    category: "valley",
    tag: "Gateway to Glaciers & Treks",
    image: HERO_IMAGES.pahalgam,
    shortDesc: "A tranquil high-mountain hamlet that serves as the starting point for Kolahoi Glacier treks.",
    longDesc: "Aru Valley is a serene eco-friendly village with sprawling meadows and wooden cottages, far removed from urban noise. It is ideal for horseback riding, camping, and star watching.",
    mainAttractions: ["Aru Biosphere Reserve", "Kolahoi Glacier Trek Base", "Wooden Homestays"],
    thingsToDo: ["Horse Riding", "Camping under Stars", "Bird Watching"],
    bestTimeToVisit: "May to October",
    recommendedDuration: "1 Day",
    nearbyDestinations: ["Pahalgam (12 km)"]
  },
  {
    id: "dal-lake",
    name: "Dal Lake & Shikaras",
    category: "lakes_gardens",
    tag: "Jewel in the Crown of Kashmir",
    image: heroDalLake,
    shortDesc: "An 18 sq km expanse of mirror water, floating gardens, lotus blooms, and historic wood houseboats.",
    longDesc: "Dal Lake is the lifeblood of Srinagar tourism. Divided into four basins, it features floating markets, wooden bridges, water lilies, and luxury houseboats crafted from fragrant cedar wood.",
    mainAttractions: ["Floating Vegetable Market", "Char Chinar Island", "Kabutarkhana", "Nehru Park"],
    thingsToDo: ["Sunset Shikara Ride", "Houseboat Stay", "Buying Fresh Flowers from Floating Vendors"],
    bestTimeToVisit: "All Year Round",
    recommendedDuration: "1-2 Days",
    nearbyDestinations: ["Mughal Gardens (2 km)", "Nigeen Lake (5 km)"]
  },
  {
    id: "mughal-gardens",
    name: "Mughal Gardens",
    category: "lakes_gardens",
    tag: "UNESCO Royal Terraced Gardens",
    image: HERO_IMAGES.mughalGardens,
    shortDesc: "Royal terraced gardens built by Emperor Jahangir with cascading fountains and centuries-old Chinar trees.",
    longDesc: "Including Shalimar Bagh (Abode of Love) and Nishat Bagh (Garden of Pleasure), these royal retreats feature Persian garden layouts, terraced water channels, and panoramic vistas over Dal Lake.",
    mainAttractions: ["Shalimar Bagh", "Nishat Bagh", "Chashme Shahi", "Parimahal"],
    thingsToDo: ["Wearing Traditional Kashmiri Phiran for Photos", "Walking under Ancient Chinar Trees", "Sunset Views"],
    bestTimeToVisit: "April to November (Autumn Chinar colors in October-November are magnificent)",
    recommendedDuration: "Half Day",
    nearbyDestinations: ["Dal Lake waterfront"]
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "tour-packages",
    title: "Kashmir Tour Packages",
    description: "Customized holiday packages for couples, families, corporate groups, and solo travelers with personalized itineraries.",
    iconName: "Compass",
    features: ["Family & Group Holidays", "Honeymoon Specials", "Budget to 5-Star Luxury", "Zero hidden costs"]
  },
  {
    id: "hotel-stay",
    title: "Hotel & Stay Assistance",
    description: "Handpicked accommodations ranging from traditional Dal Lake luxury houseboats to 4-Star mountain resorts and boutique homestays.",
    iconName: "Hotel",
    features: ["Luxury Dal Lake Houseboats", "Heated Winter Resorts in Gulmarg", "Riverside Pahalgam Retreats", "Offbeat Village Homestays"]
  },
  {
    id: "cab-transport",
    title: "Cab & Transportation",
    description: "Reliable, well-maintained vehicles driven by polite, experienced local Kashmiri drivers who double as local travel guides.",
    iconName: "Car",
    features: ["Sedans (Etios / Dzire)", "SUVs (Innova / Crysta / Scorpio)", "Tempo Travellers (12-26 Seater)", "4x4 Snow Chains for Winter Gulmarg"]
  },
  {
    id: "sightseeing",
    title: "Customized Sightseeing",
    description: "Tailored daily sightseeing plans covering legendary attractions, hidden springs, and offbeat scenic points.",
    iconName: "MapPin",
    features: ["Mughal Gardens & Temples", "Floating Flower Markets", "High-altitude Pass Views", "Heritage Old Srinagar Walks"]
  },
  {
    id: "adventure-expeditions",
    title: "Adventure Experiences",
    description: "Thrilling outdoor activities with certified instructors and safety gear for adrenaline lovers.",
    iconName: "Mountain",
    features: ["Gulmarg Gondola & Skiing", "Lidder River Whitewater Rafting", "Alpine Lakes Trekking & Camping", "Snowmobiling & ATV Safaris"]
  },
  {
    id: "customized-tours",
    title: "Customized Tour Planning",
    description: "Discuss your preferences directly with local Kashmir travel experts on WhatsApp to craft your dream itinerary.",
    iconName: "Sliders",
    features: ["Flexible Travel Dates", "Adjustable Day Pace", "Custom Meal Preferences", "Instant WhatsApp Quotation"]
  },
  {
    id: "airport-railway",
    title: "Airport & Transit Assistance",
    description: "Punctual, hassle-free pickup and drop services at Srinagar Airport (IXL) and Jammu Tawi railway station.",
    iconName: "Plane",
    features: ["Punctual Airport Pickups", "Nameplate Welcomes", "Luggage Handling", "Transit Refreshment Guidance"]
  },
  {
    id: "honeymoon-packages",
    title: "Honeymoon Packages",
    description: "Romantic Kashmir experiences with candle-light dinners, flower-bed decorations, private Shikara rides, and cake celebrations.",
    iconName: "Heart",
    features: ["Private Houseboat Nights", "Candle-light Dinner Setups", "Fresh Flower Room Decor", "Surprise Honeymoon Gifts"]
  }
];

export const REVIEWS: TravelerReview[] = [
  {
    id: "rev-1",
    name: "Rohan & Priya Sharma",
    location: "Mumbai, Maharashtra",
    rating: 5,
    comment: "Our honeymoon trip booked via KashmirYatra WhatsApp was flawless! The luxury houseboat stay on Nigeen Lake and candle-light dinner setup in Pahalgam were unforgettable. Special thanks to driver Shabir bhai for guiding us through Gulmarg snow!",
    packageTaken: "Kashmir Explorer 4N/5D",
    date: "May 2026",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "rev-2",
    name: "Anand & Family",
    location: "Bengaluru, Karnataka",
    rating: 5,
    comment: "Direct WhatsApp support made communication so easy. They accommodated my elderly parents with comfortable Innova transport and cozy ground-floor hotel rooms. Doodhpathri was a dream!",
    packageTaken: "Kashmir Grand Tour 5N/6D",
    date: "June 2026",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "rev-3",
    name: "Dr. Vikram Sethi",
    location: "Delhi NCR",
    rating: 5,
    comment: "We wanted an offbeat trip away from commercial crowds. KashmirYatra arranged Gurez Valley with border permits and riverside wooden stay. Truly authentic local hospitality!",
    packageTaken: "Offbeat Kashmir Explorer 4N/5D",
    date: "July 2026",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
  }
];

export const FAQS: FAQ[] = [
  {
    id: "faq-1",
    question: "How can I book a package with KashmirYatra?",
    answer: "Booking with us is simple and direct! Browse our package catalog, choose your preferred itinerary, and click 'Book Now on WhatsApp'. You will be connected directly to our local Kashmir travel manager on +91 7006248669 who will confirm availability, customize details, and send your official booking voucher.",
    category: "booking"
  },
  {
    id: "faq-2",
    question: "Do you accept online payments directly on the website?",
    answer: "No. KashmirYatra is an information and marketing platform. To ensure complete transparency, safety, and customized pricing based on live hotel rates, all reservations and advance payments are finalized directly through WhatsApp using verified official bank account transfers or UPI QR codes.",
    category: "payment"
  },
  {
    id: "faq-3",
    question: "How do I contact KashmirYatra for inquiries?",
    answer: "You can reach us 24/7 on WhatsApp or call at +91 7006248669. You can also send an email to info@kashmiryatra.com.",
    category: "booking"
  },
  {
    id: "faq-4",
    question: "Can I customize an existing package itinerary?",
    answer: "Absolutely! Every package listed can be customized. Whether you want to add an extra night in Gulmarg, upgrade to a 5-star hotel, or include offbeat spots like Doodhpathri, simply inform our team on WhatsApp.",
    category: "customization"
  },
  {
    id: "faq-5",
    question: "Are package prices fixed or variable?",
    answer: "The prices listed on our website are starting indicative prices per person. Final rates depend on your exact travel dates, chosen hotel category (3-star/4-star/5-star), vehicle type, number of travelers, and seasonal peak rates. Contact us on WhatsApp (+91 7006248669) for the latest exact quote.",
    category: "payment"
  },
  {
    id: "faq-6",
    question: "What is the best time to visit Kashmir?",
    answer: "Kashmir is a 365-day paradise! March to May brings blooming tulip gardens and fresh greenery. June to September offers pleasant climate and lush alpine valleys. October to November brings magical golden Chinar autumn foliage. December to February turns Kashmir into a snowy winter ski wonderland.",
    category: "travel"
  },
  {
    id: "faq-7",
    question: "Do you provide airport transfers?",
    answer: "Yes, all our holiday packages include punctual airport pickup and drop at Sheikh ul-Alam International Airport (Srinagar IXL) in private sedan or SUV vehicles.",
    category: "travel"
  },
  {
    id: "faq-8",
    question: "Do you provide hotel accommodation and houseboats?",
    answer: "Yes! All inclusive packages feature handpicked comfortable hotels and authentic wood-carved houseboats on Dal or Nigeen Lake with daily breakfast and dinner included.",
    category: "travel"
  },
  {
    id: "faq-9",
    question: "Can I book only a dedicated cab/taxi for my trip?",
    answer: "Yes! If you have already booked your own hotels, you can contact us on WhatsApp to hire a dedicated private cab (Sedan/Innova/Tempo Traveller) with an experienced local driver for sightseeing.",
    category: "customization"
  },
  {
    id: "faq-10",
    question: "Do you arrange special Honeymoon Packages?",
    answer: "Yes! Our romantic honeymoon inclusions feature luxury houseboats, candle-light dinners, flower-bed decorations, complimentary honeymoon cakes, and private Shikara rides.",
    category: "customization"
  },
  {
    id: "faq-11",
    question: "Do you arrange adventure tours like skiing and trekking?",
    answer: "Yes, we organize skiing lessons in Gulmarg with certified local instructors, Lidder River rafting in Pahalgam, and guided alpine trek expeditions.",
    category: "travel"
  },
  {
    id: "faq-12",
    question: "What happens if weather or snowfall affects the road itinerary?",
    answer: "Safety is our topmost priority. In case of heavy snowfall in winter, our local drivers arrange 4x4 vehicles with snow tire chains. If road conditions force itinerary adjustments, our local team seamlessly manages alternative hotel or route arrangements via WhatsApp support.",
    category: "travel"
  }
];
