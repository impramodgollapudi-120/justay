import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth, firebaseConfigured } from './lib/firebase';
import { createRecord, deleteRecord, getCollection, getUserCollection, updateRecord } from './lib/firebaseData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Footer } from './components/Footer';
import { HomeScreen } from './components/HomeScreen';
import { PackagesScreen } from './components/PackagesScreen';
import { PackageDetailScreen } from './components/PackageDetailScreen';
import { StaysScreen } from './components/StaysScreen';
import { StayDetailScreen, RoomOption } from './components/StayDetailScreen';
import { EventsScreen } from './components/EventsScreen';
import { EventDetailScreen } from './components/EventDetailScreen';
import { ItineraryScreen } from './components/ItineraryScreen';
import { BookingSummaryScreen } from './components/BookingSummaryScreen';
import { BookingSuccessScreen } from './components/BookingSuccessScreen';
import { BookingsScreen } from './components/BookingsScreen';
import { WishlistScreen } from './components/WishlistScreen';
import { OffersScreen } from './components/OffersScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { SideMenu } from './components/SideMenu';
import { NotificationsModal } from './components/NotificationsModal';

import {
  ScreenType,
  NavTabType,
  TravelPackage,
  StayProperty,
  EventResort,
  Destination,
  BookingDetails,
  SearchParams,
  AppNotification,
} from './types';

export default function App() {
  // Navigation & View states
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [activeNavTab, setActiveNavTab] = useState<NavTabType>('home');
  const [packageCategoryFilter, setPackageCategoryFilter] = useState('All');

  // Selected item contexts
  const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(null);
  const [selectedStay, setSelectedStay] = useState<StayProperty | null>(null);
  const [selectedEventResort, setSelectedEventResort] = useState<EventResort | null>(null);
  const [bookingType, setBookingType] = useState<'package' | 'stay' | 'event'>('package');
  const [eventBookingPayload, setEventBookingPayload] = useState<Partial<BookingDetails> | undefined>(undefined);

  // Search parameters
  const [searchParams, setSearchParams] = useState<SearchParams>({ destination: 'All Destinations', checkIn: '', checkOut: '', guests: 2, rooms: 1 });
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [stays, setStays] = useState<StayProperty[]>([]);
  const [events, setEvents] = useState<EventResort[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [offers, setOffers] = useState<any[]>([]);
  const [foodPackages, setFoodPackages] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [dataError, setDataError] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);



  // User persistent state
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  const [bookings, setBookings] = useState<BookingDetails[]>([]);

  const [latestConfirmedBooking, setLatestConfirmedBooking] = useState<BookingDetails | null>(
    null
  );

  // Drawer & Popups
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Notifications State
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  useEffect(() => {
    let alive = true;
    Promise.all([
      getCollection<TravelPackage>('packages'), getCollection<StayProperty>('stays'),
      getCollection<EventResort>('events'), getCollection<Destination>('destinations'),
      getCollection<any>('offers'), getCollection<any>('eventFoodPackages'),
    ]).then(([p, s, e, d, o, f]) => {
      if (!alive) return;
      setPackages(p); setStays(s); setEvents(e); setDestinations(d); setOffers(o); setFoodPackages(f);
      if (p.length) setSelectedPackage(p[0]);
      if (s.length) setSelectedStay(s[0]);
      if (e.length) setSelectedEventResort(e[0]);
    }).catch((error: any) => {
      if (alive) setDataError(error?.message || 'Unable to load data from Firebase.');
    }).finally(() => { if (alive) setDataLoading(false); });
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (!alive) return;
        setCurrentUser(user);
        if (!user) { setBookings([]); setWishlistIds([]); setNotifications([]); return; }
        try {
          const [userBookings, userWishlist, userNotifications] = await Promise.all([
            getUserCollection<any>('bookings', user.uid),
            getUserCollection<any>('wishlists', user.uid),
            getUserCollection<any>('notifications', user.uid),
          ]);
          if (!alive) return;
          setBookings(userBookings as BookingDetails[]);
          setWishlistIds(userWishlist.map((item: any) => item.itemId));
          setNotifications(userNotifications as AppNotification[]);
        } catch (error: any) { if (alive) setDataError(error?.message || 'Could not load account data.'); }
      });
      return () => { alive = false; unsubscribe(); };
    }
    return () => { alive = false; };
  }, []);

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  const handleOpenNotifications = () => {
    setIsNotificationsOpen(true);
    // Mark as read after seeing notification
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    if (currentUser) notifications.forEach((n: any) => { if (typeof n.id === 'string') updateRecord('notifications', n.id, { read: true }).catch(() => {}); });
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    if (currentUser) notifications.forEach((n: any) => { if (typeof n.id === 'string') updateRecord('notifications', n.id, { read: true }).catch(() => {}); });
  };

  const handleMarkNotificationRead = (id: string | number) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    if (currentUser && typeof id === 'string') updateRecord('notifications', id, { read: true }).catch(() => {});
  };

  const handleClearNotifications = () => {
    setNotifications([]);
    if (currentUser) notifications.forEach((n: any) => { if (typeof n.id === 'string') deleteRecord('notifications', n.id).catch(() => {}); });
  };

  // Wishlist toggle handler
  const handleToggleWishlist = async (id: string) => {
    if (!currentUser) { window.alert('Please sign in with Firebase Authentication to save wishlist items.'); return; }
    try {
      const existing = await getUserCollection<any>('wishlists', currentUser.uid);
      const match = existing.find((item: any) => item.itemId === id);
      if (match) {
        await deleteRecord('wishlists', match.id);
        setWishlistIds((previous) => previous.filter((item) => item !== id));
      } else {
        await createRecord('wishlists', { userId: currentUser.uid, itemId: id });
        setWishlistIds((previous) => [...previous, id]);
      }
    } catch (error: any) { window.alert(error?.message || 'Could not update wishlist in Firebase.'); }
  };

  // Tab change handler
  const handleTabChange = (tab: NavTabType) => {
    setActiveNavTab(tab);
    switch (tab) {
      case 'home':
        setCurrentScreen('home');
        break;
      case 'events':
        setCurrentScreen('events');
        break;
      case 'stays':
        setCurrentScreen('stays');
        break;
      case 'packages':
        setCurrentScreen('packages');
        break;
      case 'offers':
        setCurrentScreen('offers');
        break;
      case 'bookings':
        setCurrentScreen('bookings');
        break;
      case 'wishlist':
        setCurrentScreen('wishlist');
        break;
      case 'profile':
        setCurrentScreen('profile');
        break;
    }
  };

  // Package select
  const handleSelectPackage = (pkg: TravelPackage) => {
    setSelectedPackage(pkg);
    setCurrentScreen('package_detail');
  };

  // Stay select (shows resort overview)
  const handleSelectStay = (stay: StayProperty) => {
    setSelectedStay(stay);
    setCurrentScreen('stay_detail');
  };

  // Event select
  const handleSelectEvent = (resort: EventResort) => {
    setSelectedEventResort(resort);
    setCurrentScreen('event_detail');
  };

  // Proceed from event configurator to payment summary
  const handleStartEventBooking = (bookingData: Partial<BookingDetails>) => {
    setEventBookingPayload(bookingData);
    setBookingType('event');
    setCurrentScreen('booking_summary');
  };

  // Proceed from resort overview to payment
  const handleStartStayBooking = (stay: StayProperty, selectedRoom?: RoomOption) => {
    if (selectedRoom) {
      setSelectedStay({
        ...stay,
        pricePerNight: selectedRoom.pricePerNight,
        originalPrice: selectedRoom.originalPrice,
        name: `${stay.name} - ${selectedRoom.name}`,
      });
    } else {
      setSelectedStay(stay);
    }
    setBookingType('stay');
    setCurrentScreen('booking_summary');
  };

  // Destination select
  const handleSelectDestination = (dest: Destination) => {
    setSearchParams((prev) => ({
      ...prev,
      destination: `${dest.name}, India`,
    }));
    setCurrentScreen('stays');
  };

  // Booking initiation
  const handleStartPackageBooking = (pkg: TravelPackage) => {
    setSelectedPackage(pkg);
    setBookingType('package');
    setCurrentScreen('booking_summary');
  };

  // Booking completed
  const handleBookingConfirmed = async (newBooking: BookingDetails) => {
    if (!currentUser) { window.alert('Please sign in with Firebase Authentication before confirming a booking.'); return; }
    try {
      const saved = await createRecord('bookings', { ...newBooking, userId: currentUser.uid });
      const persisted = { ...newBooking, id: saved.id, userId: currentUser.uid } as BookingDetails;
      setBookings((previous) => [persisted, ...previous]);
      setLatestConfirmedBooking(persisted);
      setCurrentScreen('booking_success');
    } catch (error: any) { window.alert(error?.message || 'Could not save booking to Firebase.'); }
  };

  // Booking updated (e.g. stay extended, ID proof uploaded & approved)
  const handleUpdateBooking = async (updatedBooking: BookingDetails) => {
    if (currentUser && updatedBooking.id) {
      try {
        // Do not store a base64 government-ID image inside a Firestore document.
        // Secure ID image persistence requires Firebase Storage and private Storage Rules.
        const { idProofPhotoUrl, ...bookingData } = updatedBooking;
        const persistedData = typeof idProofPhotoUrl === 'string' && idProofPhotoUrl.startsWith('data:')
          ? { ...bookingData, idProofPhotoUrl: null }
          : { ...bookingData, idProofPhotoUrl };
        await updateRecord('bookings', updatedBooking.id, { ...persistedData, userId: currentUser.uid });
      }
      catch (error: any) { setDataError(error?.message || 'Could not update booking in Firebase.'); }
    }
    setBookings((prev) =>
      prev.map((b) => (b.id === updatedBooking.id ? updatedBooking : b))
    );
    if (latestConfirmedBooking && latestConfirmedBooking.id === updatedBooking.id) {
      setLatestConfirmedBooking(updatedBooking);
    }
  };

  // Quick Screens Router
  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen
            onNavigateToStays={(dest) => {
              if (dest) setSearchParams((prev) => ({ ...prev, destination: dest }));
              setActiveNavTab('stays');
              setCurrentScreen('stays');
            }}
            onNavigateToPackages={(category) => {
              if (category) setPackageCategoryFilter(category);
              setActiveNavTab('packages');
              setCurrentScreen('packages');
            }}
            onNavigateToEvents={() => {
              setActiveNavTab('events');
              setCurrentScreen('events');
            }}
            onNavigateToOffers={() => {
              setActiveNavTab('offers');
              setCurrentScreen('offers');
            }}
            onNavigateToBookings={() => {
              setActiveNavTab('bookings');
              setCurrentScreen('bookings');
            }}
            onSelectDestination={handleSelectDestination}
            destinations={destinations}
            searchParams={searchParams}
            onUpdateSearchParams={(newParams) =>
              setSearchParams((prev) => ({ ...prev, ...newParams }))
            }
          />
        );

      case 'events':
        return (
          <EventsScreen
            events={events}
            onSelectEvent={handleSelectEvent}
            onBookNow={(resort) => {
              setSelectedEventResort(resort);
              setCurrentScreen('event_detail');
            }}
            savedIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
          />
        );

      case 'event_detail':
        if (!selectedEventResort) return <EmptyState label="No event venue selected. Add venues in Firebase and select one." />;
        return (
          <EventDetailScreen
            resort={selectedEventResort!}
            foodPackages={foodPackages}
            onBack={() => {
              setActiveNavTab('events');
              setCurrentScreen('events');
            }}
            onProceedToBooking={handleStartEventBooking}
            savedIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
          />
        );

      case 'packages':
        return (
          <PackagesScreen
            onBack={() => {
              setActiveNavTab('home');
              setCurrentScreen('home');
            }}
            onSelectPackage={handleSelectPackage}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            initialCategory={packageCategoryFilter}
            packages={packages}
          />
        );

      case 'package_detail':
        if (!selectedPackage) return <EmptyState label="No package selected. Add packages in Firebase and select one." />;
        return (
          <PackageDetailScreen
            packageData={selectedPackage}
            onBack={() => setCurrentScreen('packages')}
            onViewItinerary={() => setCurrentScreen('itinerary')}
            onBookNow={handleStartPackageBooking}
            isWishlisted={wishlistIds.includes(selectedPackage.id)}
            onToggleWishlist={handleToggleWishlist}
          />
        );

      case 'itinerary':
        if (!selectedPackage) return <EmptyState label="No package selected." />;
        return (
          <ItineraryScreen
            packageData={selectedPackage}
            onBack={() => setCurrentScreen('package_detail')}
            onProceedToBook={handleStartPackageBooking}
          />
        );

      case 'stays':
        return (
          <StaysScreen
            stays={stays}
            onBack={() => {
              setActiveNavTab('home');
              setCurrentScreen('home');
            }}
            onSelectStay={handleSelectStay}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            searchParams={searchParams}
            onUpdateSearchParams={(newParams) =>
              setSearchParams((prev) => ({ ...prev, ...newParams }))
            }
          />
        );

      case 'stay_detail':
        if (!selectedStay) return <EmptyState label="No stay selected. Add stays in Firebase and select one." />;
        return (
          <StayDetailScreen
            stay={selectedStay}
            onBack={() => setCurrentScreen('stays')}
            onProceedToPayment={handleStartStayBooking}
            isWishlisted={wishlistIds.includes(selectedStay.id)}
            onToggleWishlist={handleToggleWishlist}
            searchParams={searchParams}
          />
        );

      case 'booking_summary':
        if ((bookingType === 'event' && !selectedEventResort) || (bookingType === 'package' && !selectedPackage) || (bookingType === 'stay' && !selectedStay)) return <EmptyState label="Select a listing before starting a booking." />;
        return (
          <BookingSummaryScreen
            item={
              bookingType === 'event'
                ? selectedEventResort!
                : bookingType === 'package'
                ? selectedPackage!
                : selectedStay!
            }
            type={bookingType}
            eventBookingData={eventBookingPayload}
            onBack={() => {
              if (bookingType === 'event') {
                setCurrentScreen('event_detail');
              } else if (bookingType === 'package') {
                setCurrentScreen('package_detail');
              } else {
                setCurrentScreen('stay_detail');
              }
            }}
            onViewItinerary={() => setCurrentScreen('itinerary')}
            onBookingSuccess={handleBookingConfirmed}
          />
        );

      case 'booking_success':
        if (!latestConfirmedBooking && !bookings[0]) return <EmptyState label="No booking details to display yet." />;
        return (
          <BookingSuccessScreen
            booking={latestConfirmedBooking || bookings[0]}
            onGoToBookings={() => {
              setActiveNavTab('bookings');
              setCurrentScreen('bookings');
            }}
            onGoHome={() => {
              setActiveNavTab('home');
              setCurrentScreen('home');
            }}
            onUpdateBooking={handleUpdateBooking}
          />
        );

      case 'bookings':
        return (
          <BookingsScreen
            bookings={bookings}
            onExplorePackages={() => {
              setActiveNavTab('packages');
              setCurrentScreen('packages');
            }}
            onViewBookingDetail={(b) => {
              setLatestConfirmedBooking(b);
              setCurrentScreen('booking_success');
            }}
            onUpdateBooking={handleUpdateBooking}
          />
        );

      case 'wishlist':
        return (
          <WishlistScreen
            packages={packages}
            stays={stays}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onSelectPackage={handleSelectPackage}
            onSelectStay={handleSelectStay}
            onExplore={() => {
              setActiveNavTab('home');
              setCurrentScreen('home');
            }}
          />
        );

      case 'offers':
        return (
          <OffersScreen
            offers={offers}
            onApplyOffer={(code) => {
              // Promo applied notification
            }}
          />
        );

      case 'profile':
        return (
          <ProfileScreen
            user={currentUser}
            onNavigateToBookings={() => {
              setActiveNavTab('bookings');
              setCurrentScreen('bookings');
            }}
            onNavigateToOffers={() => setCurrentScreen('offers')}
          />
        );

      default:
        return null;
    }
  };

  const showTopHeader =
    currentScreen === 'home' ||
    currentScreen === 'events' ||
    currentScreen === 'stays' ||
    currentScreen === 'packages' ||
    currentScreen === 'offers' ||
    currentScreen === 'wishlist' ||
    currentScreen === 'bookings' ||
    currentScreen === 'profile';

  const showBottomNav =
    currentScreen === 'home' ||
    currentScreen === 'events' ||
    currentScreen === 'packages' ||
    currentScreen === 'stays' ||
    currentScreen === 'bookings' ||
    currentScreen === 'wishlist' ||
    currentScreen === 'offers' ||
    currentScreen === 'profile';

  return (
    <div className="min-h-screen bg-[#FFF5F5] flex flex-col antialiased text-[#450A0A] selection:bg-red-500/20 selection:text-red-950 font-sans">
      {/* Top Header if on root screen */}
      {showTopHeader && (
        <Header
          onOpenMenu={() => setIsSideMenuOpen(true)}
          onOpenNotifications={handleOpenNotifications}
          onOpenProfile={() => {
            setActiveNavTab('profile');
            setCurrentScreen('profile');
          }}
          onNavigateHome={() => {
            setActiveNavTab('home');
            setCurrentScreen('home');
          }}
          currentScreen={currentScreen}
          activeTab={activeNavTab}
          onNavigateTab={(tab, screen) => {
            setActiveNavTab(tab);
            if (screen) {
              setCurrentScreen(screen);
            } else {
              handleTabChange(tab);
            }
          }}
          savedCount={wishlistIds.length}
          unreadNotificationsCount={unreadNotificationsCount}
        />
      )}

      {!firebaseConfigured && <div role="alert" className="mx-auto mt-3 max-w-5xl rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">Firebase is not configured yet. Copy .env.example to .env.local, add your Firebase web app values, then restart the dev server.</div>}
      {dataError && <div role="alert" className="mx-auto mt-3 max-w-5xl rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-800">{dataError}</div>}
      {!dataLoading && !packages.length && !stays.length && !events.length && <div className="mx-auto mt-3 max-w-5xl rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">Firebase has no travel listings yet. Add documents to <b>packages</b>, <b>stays</b>, <b>events</b>, <b>destinations</b>, <b>offers</b>, and <b>eventFoodPackages</b>.</div>}
      {/* Screen Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 pb-24 md:pb-8">
        {renderScreen()}
      </main>

      {/* Glassmorphism Desktop & Main Footer */}
      {showTopHeader && (
        <Footer
          onNavigateTab={(tab, screen) => {
            setActiveNavTab(tab);
            if (screen) {
              setCurrentScreen(screen);
            } else {
              handleTabChange(tab);
            }
          }}
          onOpenNotifications={handleOpenNotifications}
        />
      )}

      {/* Bottom Navigation */}
      {showBottomNav && (
        <BottomNav
          activeTab={activeNavTab}
          onTabChange={handleTabChange}
          savedCount={wishlistIds.length}
        />
      )}

      {/* Side Menu Drawer */}
      <SideMenu
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
        onNavigate={(screen, tab) => {
          if (tab) setActiveNavTab(tab);
          setCurrentScreen(screen);
        }}
      />

      {/* Notifications Popover */}
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotificationsRead}
        onMarkAsRead={handleMarkNotificationRead}
        onClearNotifications={handleClearNotifications}
      />
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return <div className="mx-auto my-12 max-w-2xl rounded-2xl border border-dashed border-stone-300 bg-white p-8 text-center text-stone-600">{label}</div>;
}
