import { create } from "zustand";

import {
  fetchAttendees,
  saveAttendee,
  updateAttendee,
  deleteAttendee
} from "../services/api.js";

export const useAttendeeStore = create((set, get) => ({
  attendees: [],
  loading: false,
  error: "",

  loadAttendees: async (search = "") => {
    set({
      loading: true,
      error: ""
    });

    try {
      const attendees = await fetchAttendees(search);

      set({
        attendees,
        loading: false
      });
    } catch (error) {
      set({
        loading: false,
        error:
          error.response?.data?.message ||
          "Could not load attendees"
      });
    }
  },

  createAttendee: async (payload) => {
    const attendee = await saveAttendee(payload);

    set((state) => ({
      attendees: [...state.attendees, attendee].sort((a, b) =>
        a.fullName.localeCompare(b.fullName)
      )
    }));

    return attendee;
  },

  updateAttendee: async (id, payload) => {
    const attendee = await updateAttendee(id, payload);

    set((state) => ({
      attendees: state.attendees
        .map((item) =>
          item._id === id ? attendee : item
        )
        .sort((a, b) =>
          a.fullName.localeCompare(b.fullName)
        )
    }));

    return attendee;
  },

  deleteAttendee: async (id) => {
    await deleteAttendee(id);

    set((state) => ({
      attendees: state.attendees.filter(
        (item) => item._id !== id
      )
    }));
  }
}));
