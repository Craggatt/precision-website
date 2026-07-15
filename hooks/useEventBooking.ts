'use client';

import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

/**
 * Hooks for the public event booking API at proposals.precisionsigns.com.au.
 *
 * - `useEventSlots('age-2026')` — fetch the grid of available slots
 * - `useBookSlot('age-2026')` — book one; on a stale/full slot the slot grid
 *   is automatically re-fetched so the visitor can pick again
 *
 * The endpoints are public (no auth) and CORS-open, so these call the
 * production base URL directly from the browser.
 */

const BASE_URL = 'https://proposals.precisionsigns.com.au';

export interface EventSlot {
  id: number;
  /** Naive UTC ISO string (no Z / offset) — use `parseSlotUtc` to get a Date */
  start_utc: string;
  end_utc: string;
  capacity: number;
  booked_count: number;
}

export interface EventSlotsResponse {
  name: string;
  description: string;
  slot_minutes: number;
  window_start: string;
  window_end: string;
  /** Keyed by local (Sydney) calendar date, e.g. "2026-08-01" */
  grid: Record<string, EventSlot[]>;
}

export interface BookSlotInput {
  /** Pass the exact `start_utc` string from the GET grid — do not reformat */
  slot_start_utc: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  notes?: string;
}

export interface BookSlotResponse {
  ok: true;
  id: string;
  cancel_token: string;
  event_name: string;
  slot_start_utc: string;
  slot_end_utc: string;
}

export class BookingApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'BookingApiError';
    this.status = status;
  }
}

/**
 * True when the error means the visitor's slot list is out of date
 * (someone else took the slot, or the slot never existed) and they
 * should pick a different time. `useBookSlot` already re-fetches the
 * grid on these; use this to decide what message to show.
 */
export function isSlotStaleError(error: unknown): boolean {
  return (
    error instanceof BookingApiError &&
    (error.status === 409 ||
      (error.status === 400 &&
        error.message.includes("isn't part of this event")))
  );
}

/** The API's naive UTC strings have no Z suffix — append one to parse correctly. */
export function parseSlotUtc(naiveUtc: string): Date {
  return new Date(
    naiveUtc.endsWith('Z') || /[+-]\d{2}:\d{2}$/.test(naiveUtc)
      ? naiveUtc
      : `${naiveUtc}Z`
  );
}

/** Remaining capacity — the grid only contains slots where this is ≥ 1. */
export function slotSpotsLeft(slot: EventSlot): number {
  return slot.capacity - slot.booked_count;
}

async function parseError(response: Response): Promise<BookingApiError> {
  let message = `Request failed (${response.status})`;
  try {
    const body = await response.json();
    if (typeof body?.error === 'string') message = body.error;
  } catch {
    // non-JSON error body; keep the fallback message
  }
  return new BookingApiError(message, response.status);
}

export const eventSlotsQueryKey = (
  eventSlug: string,
  range?: { from?: string; to?: string }
) => ['event-slots', eventSlug, range?.from ?? null, range?.to ?? null] as const;

/**
 * Fetch the bookable slots for an event.
 *
 * @param eventSlug e.g. 'age-2026'
 * @param options.from / options.to optional YYYY-MM-DD range filters
 *
 * The grid only contains slots with room left. Availability changes as other
 * people book, so the query re-fetches on window focus and every 60s while
 * the page is open.
 */
export function useEventSlots(
  eventSlug: string,
  options?: { from?: string; to?: string; enabled?: boolean }
) {
  const { from, to, enabled = true } = options ?? {};

  return useQuery<EventSlotsResponse, BookingApiError>({
    queryKey: eventSlotsQueryKey(eventSlug, { from, to }),
    queryFn: async () => {
      const params = new URLSearchParams();
      if (from) params.set('from', from);
      if (to) params.set('to', to);
      const qs = params.size > 0 ? `?${params}` : '';

      const response = await fetch(
        `${BASE_URL}/api/book/${encodeURIComponent(eventSlug)}${qs}`
      );
      if (!response.ok) throw await parseError(response);
      return response.json();
    },
    enabled: enabled && Boolean(eventSlug),
    staleTime: 30_000,
    refetchInterval: 60_000,
    // A 404 means a bad/deactivated slug — retrying won't help
    retry: (failureCount, error) =>
      error.status !== 404 && failureCount < 2,
  });
}

/**
 * Book a slot for an event.
 *
 * On success the API emails the customer a confirmation (with .ics and
 * cancel/reschedule links) — nothing more to do on our side. On a
 * full/stale-slot error the slot grid is invalidated so pickers refresh.
 *
 * The API has no duplicate-submission protection: disable your submit
 * button while `isPending` is true.
 */
export function useBookSlot(eventSlug: string) {
  const queryClient = useQueryClient();

  return useMutation<BookSlotResponse, BookingApiError, BookSlotInput>({
    mutationFn: async (input) => {
      const response = await fetch(
        `${BASE_URL}/api/book/event/${encodeURIComponent(eventSlug)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(input),
        }
      );
      if (!response.ok) throw await parseError(response);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['event-slots', eventSlug] });
    },
    onError: (error) => {
      if (isSlotStaleError(error)) {
        queryClient.invalidateQueries({ queryKey: ['event-slots', eventSlug] });
      }
    },
  });
}
