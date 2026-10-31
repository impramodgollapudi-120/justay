export type ScreenType =
  | 'home'
  | 'packages'
  | 'package_detail'
  | 'stays'
  | 'stay_detail'
  | 'events'
  | 'event_detail'
  | 'itinerary'
  | 'booking_summary'
  | 'booking_success'
  | 'bookings'
  | 'wishlist'
  | 'offers'
  | 'profile';

export type NavTabType = 'home' | 'bookings' | 'packages' | 'stays' | 'events' | 'offers' | 'wishlist' | 'profile';

export type PackageCategory = 'All' | 'Beach' | 'Hills' | 'Adventure' | 'Family' | 'Heritage';

export type EventType =
  | 'Birthday Party'
  | 'Wedding & Reception'
  | 'Corporate Retreat'
  | 'Pool Party & DJ Night'
  | 'Anniversary Gala'
  | 'Cocktail & Dinner'
  | 'Reunion & Get-Together';

export type EventSlotTime = 'Morning (9:00 AM - 2:00 PM)' | 'Evening (4:00 PM - 10:00 PM)' | 'Full Day (9:00 AM - 11:00 PM)' | 'Night Stay & Party (2:00 PM - 11:00 AM Next Day)' | 'Custom Hours';

export type FoodPackageOption =
  | 'No Food / Venue Only'
  | 'Hi-Tea & Snacks (₹450/guest)'
  | 'Standard Buffet - Veg & Non-Veg (₹850/guest)'
  | 'Royal Feast & Live Counters (₹1,350/guest)'
  | 'Custom Catering Menu';

export interface EventResort {
  id: string;
  name: string;
  location: string;
  city: string;
  rating: number;
  reviewsCount: number;
  venuePrice: number; // Base venue booking price
  capacityMin: number;
  capacityMax: number;
  eventTypeSupported: EventType[];
  availableSlots: string[];
  foodAvailable: boolean;
  foodStartingPricePerGuest: number;
  amenities: string[];
  imageUrl: string;
  galleryImages: string[];
  description: string;
  venueFeatures: string[];
  highlights: string[];
}

export interface ActivityItem {
  time: string;
  title: string;
  description: string;
  iconType: 'flight' | 'food' | 'beach' | 'shopping' | 'dining' | 'hotel' | 'activity' | 'sightseeing';
}

export interface ItineraryDay {
  dayNumber: number;
  dayTitle: string;
  activities: ActivityItem[];
}

export interface TravelPackage {
  id: string;
  title: string;
  tagline?: string;
  destination: string;
  duration: string; // e.g. "3 Days / 2 Nights"
  days: number;
  nights: number;
  tags: string[]; // ['Stay', 'Food', 'Transport', 'Sightseeing']
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  badge?: 'Best Seller' | 'Popular' | 'Trending' | 'Special Deal';
  category: 'Beach' | 'Hills' | 'Adventure' | 'Family' | 'Heritage';
  imageUrl: string;
  galleryImages: string[];
  overview: string;
  inclusions: string[];
  exclusions?: string[];
  highlights: {
    title: string;
    icon: string;
  }[];
  itinerary: ItineraryDay[];
  hotelName?: string;
  hotelRating?: string;
}

export interface StayProperty {
  id: string;
  name: string;
  location: string;
  city: string;
  rating: number;
  reviewsCount: number;
  pricePerNight: number;
  originalPrice?: number;
  propertyType: 'Hotel' | 'Resort' | 'Villa' | 'Homestay' | 'Apartment';
  starRating: 3 | 4 | 5;
  amenities: string[];
  mealPlan: 'Room Only' | 'Breakfast' | 'Breakfast + Dinner' | 'All Meals';
  imageUrl: string;
  galleryImages: string[];
  description: string;
  breakfastIncluded: boolean;
  distanceToBeachOrCenter?: string;
}

export interface Destination {
  id: string;
  name: string;
  stateCountry: string;
  startPrice: number;
  imageUrl: string;
  packagesCount: number;
  staysCount: number;
  popularFor: string;
}

export interface StayExtensionRecord {
  id: string;
  dateExtended: string;
  extraDays: number;
  amountPaid: number;
  previousCheckOutDate: string;
  newCheckOutDate: string;
}

export interface BookingDetails {
  id: string;
  type: 'package' | 'stay' | 'event';
  itemId: string;
  title: string;
  imageUrl: string;
  location: string;
  duration?: string;
  checkInDate: string;
  checkOutDate: string;
  
  // 18+ Age Verification Requirement
  primaryGuestAge?: number;
  isAgeVerified18Plus?: boolean;

  // ID Proof Photocopy for Room & Resort Check-in
  idProofType?: 'Aadhaar Card' | 'Passport' | "Driver's License" | 'Voter ID';
  idProofNumber?: string;
  idProofPhotoUrl?: string; // photo copy image or data url
  idProofFileName?: string;
  idVerificationStatus?: 'Submitted for Review' | 'Action Required: ID Proof Missing' | 'Pending Verification';

  // Tourism Requirements & Preferences
  dietaryPreference?: 'Vegetarian' | 'Jain Meal' | 'Non-Vegetarian' | 'Vegan' | 'No Preference';
  transportPreference?: 'Private AC Sedan' | 'SUV (Innova)' | 'Luxury Coach / Tempo' | 'Self-Drive / None';
  guideLanguage?: 'English' | 'Hindi' | 'Regional Language' | 'Self-Guided';
  activityPace?: 'Relaxed & Leisurely' | 'Moderate' | 'High Adventure & Active';
  roomPreference?: 'King Bed' | 'Twin Beds' | 'Pool Facing' | 'High Floor';
  specialRequests?: string;

  // Extended Stay (Extra days management)
  extraDaysAdded?: number;
  originalCheckOutDate?: string;
  pricePerExtraNight?: number;
  extendedStayCharges?: number;
  extensionHistory?: StayExtensionRecord[];

  // Event-specific booking details
  eventTimeSlot?: string;
  eventType?: string;
  foodRequired?: boolean;
  foodPackageName?: string;
  foodPricePerGuest?: number;
  totalFoodCost?: number;
  venueRentalCost?: number;
  guestsCount: number;
  roomsCount: number;
  packagePrice: number;
  discount: number;
  couponCode?: string;
  taxesAndFees: number;
  totalAmount: number;
  paymentMethod: 'UPI' | 'Credit / Debit Card' | 'Net Banking';
  status: 'Pending' | 'Confirmed' | 'Approval Pending (ID Required)' | 'Completed' | 'Cancelled';
  paymentStatus?: 'Not processed' | 'Pending' | 'Paid' | 'Failed' | string;
  bookingDate: string;
  bookingRef: string;
  userName: string;
  userEmail: string;
  userPhone: string;
}

export interface FilterState {
  priceMin: number;
  priceMax: number;
  propertyType: string; // 'All' | 'Hotel' | 'Resort' | 'Villa' | 'Homestay' | 'Apartment'
  starRating: string; // 'All' | '5' | '4' | '3'
  amenities: string[]; // ['Free Wi-Fi', 'Swimming Pool', 'AC', 'Parking', 'Restaurant', 'Room Service']
  meals: string; // 'All' | 'Room Only' | 'Breakfast' | 'Breakfast + Dinner' | 'All Meals'
}

export interface SearchParams {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
}

export interface AppNotification {
  id: string | number;
  title: string;
  desc: string;
  time: string;
  read: boolean;
  type: 'offer' | 'booking' | 'trending';
}
