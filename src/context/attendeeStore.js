import { create } from "zustand";
import { fetchAttendees, saveAttendee } from "../services/api.js";

export const useAttendeeStore = create((set, get) => ({
  attendees: [],
  loading: false,
  error: "",
  loadAttendees: async (search = "") => {
    set({ loading: true, error: "" });
    try {
      const attendees = await fetchAttendees(search);
      set({ attendees, loading: false });
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Could not load attendees"
      });
    }
  },
  addAttendee: async (payload) => {
    const attendee = await saveAttendee(payload);
    const existing = get().attendees.filter((item) => item.id !== attendee.id);
    set({ attendees: [...existing, attendee].sort((a, b) => a.fullName.localeCompare(b.fullName)) });
    return attendee;
  }
}));
