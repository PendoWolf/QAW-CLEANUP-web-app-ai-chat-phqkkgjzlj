// Pendo Track Events. The Pendo agent attaches the visitor and account to every event,
// so the properties here never include them. When the agent isn't loaded, nothing is sent.
type TrackPropertyValue = string | number | boolean | string[];
export type TrackProperties = Record<string, TrackPropertyValue>;

declare global {
  interface Window {
    pendo?: { track: (eventName: string, properties?: TrackProperties) => void };
  }
}

/** Sends a Pendo Track Event. Tracking failures never break the app. */
export function trackEvent(eventName: string, properties: TrackProperties): void {
  try {
    window.pendo?.track(eventName, properties);
  } catch (e) {
    console.warn(`Pendo track "${eventName}" failed`, e);
  }
}

const DAY_MS = 24 * 60 * 60 * 1000;

/** Days since the epoch for a "YYYY-MM-DD" date, ignoring time zones and daylight saving. */
function dayNumber(isoDate: string): number {
  const [year, month, day] = isoDate.split("-").map(Number);
  return Date.UTC(year, month - 1, day) / DAY_MS;
}

function todayDayNumber(): number {
  const now = new Date();
  return Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / DAY_MS;
}

/** A trip's length in days, counting both the start and end dates. */
export function tripLengthDays(trip: { startDate: string; endDate: string }): number {
  return dayNumber(trip.endDate) - dayNumber(trip.startDate) + 1;
}

/** Days from today until the trip starts. Negative when it has already started. */
export function daysUntilStart(trip: { startDate: string }): number {
  return dayNumber(trip.startDate) - todayDayNumber();
}
