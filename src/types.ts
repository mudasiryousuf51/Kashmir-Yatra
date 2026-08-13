export type PackageCategory = 'holiday' | 'offbeat' | 'adventure';

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  overnightStay: string;
  mealsIncluded: string;
}

export interface Package {
  id: string;
  title: string;
  tagline: string;
  category: PackageCategory;
  duration: string;
  nightsCount: number;
  daysCount: number;
  startingPricePerPerson: number;
  destinationsCovered: string[];
  keyHighlights: string[];
  overview: string;
  itinerary: ItineraryDay[];
  accommodationInfo: string;
  transportationInfo: string;
  inclusions: string[];
  exclusions: string[];
  bestTime: string;
  difficulty?: 'Easy' | 'Moderate' | 'Challenging';
  importantNotes: string[];
  image: string;
  active?: boolean;
  updatedAt?: string;
}

export interface Destination {
  id: string;
  name: string;
  category: 'popular' | 'offbeat' | 'valley' | 'lakes_gardens';
  tag: string;
  image: string;
  shortDesc: string;
  longDesc: string;
  mainAttractions: string[];
  thingsToDo: string[];
  bestTimeToVisit: string;
  recommendedDuration: string;
  nearbyDestinations: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'booking' | 'payment' | 'travel' | 'customization';
}

export interface TravelerReview {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  packageTaken: string;
  date: string;
  avatar: string;
}

export type EnquiryStatus =
  | 'New'
  | 'In Progress'
  | 'Booking Requested'
  | 'Contacted'
  | 'Confirmed'
  | 'Closed';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  conversationId: string;
  anonymousSessionId: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
  detectedPackage: string | null;
  detectedDestination: string | null;
  enquiryStatus: EnquiryStatus;
  bookingIntent: boolean;
  bookingRequested: boolean;
  lastUserMessage: string;
  notes?: string;
}
