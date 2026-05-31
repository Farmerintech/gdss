import { useEffect, useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import toast from "react-hot-toast";

import PageTransition from "../components/PageTransition.jsx";
import SearchInput from "../components/SearchInput.jsx";
import AttendeeCard from "../components/AttendeeCard.jsx";
import AttendeeModal from "../components/AttendeeModal.jsx";
import EmptyState from "../components/EmptyState.jsx";
import LoadingSkeleton from "../components/LoadingSkeleton.jsx";

import { useDebouncedValue } from "../hooks/useDebouncedValue.js";
import { useAttendeeStore } from "../context/attendeeStore.js";

export default function Attendees() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [editingAttendee, setEditingAttendee] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    nickname: "",
    profileImageUrl: ""
  });

  const debouncedQuery = useDebouncedValue(query);

  const {
    attendees,
    loading,
    error,
    loadAttendees,
    createAttendee,
    updateAttendee,
    deleteAttendee
  } = useAttendeeStore();

  useEffect(() => {
    loadAttendees(debouncedQuery);
  }, [debouncedQuery, loadAttendees]);

  function openAddModal() {
    setEditingAttendee(null);

    setFormData({
      fullName: "",
      nickname: "",
      profileImageUrl: ""
    });

    setShowForm(true);
  }

  function openEditModal(attendee) {
    setEditingAttendee(attendee);

    setFormData({
      fullName: attendee.fullName || "",
      nickname: attendee.nickname || "",
      profileImageUrl: attendee.profileImageUrl || ""
    });

    setShowForm(true);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.fullName.trim()) {
      toast.error("Full name is required");
      return;
    }

    try {
      if (editingAttendee) {
        await updateAttendee(editingAttendee._id, formData);
        toast.success("Attendee updated");
      } else {
        await createAttendee(formData);
        toast.success("Attendee added");
      }

      await loadAttendees(debouncedQuery);

      setShowForm(false);
      setEditingAttendee(null);
    } catch (error) {
      toast.error(error.message || "Operation failed");
    }
  }

  async function handleDelete(attendee) {
    const confirmed = window.confirm(
      `Delete ${attendee.fullName}?`
    );

    if (!confirmed) return;

    try {
      await deleteAttendee(attendee._id);
      toast.success("Attendee deleted");

      await loadAttendees(debouncedQuery);
    } catch (error) {
      toast.error(error.message || "Delete failed");
    }
  }

  return (
    <PageTransition>
      <section className="container-shell">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
              Guest Book
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Attendees
            </h1>

            <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-300">
              Browse contributors, find friends, and manage attendees.
            </p>
          </div>

          <div className="flex gap-3">
            <div className="inline-flex min-h-11 items-center gap-2 rounded-2xl bg-white px-4 text-sm font-bold shadow-sm dark:bg-white/10">
              Sorted A-Z
            </div>

            <button
              onClick={openAddModal}
              className="inline-flex min-h-11 items-center gap-2 rounded-2xl bg-accent px-4 text-sm font-bold text-white transition hover:opacity-90"
            >
              <FiPlus />
              Add Attendee
            </button>
          </div>
        </div>

        <div className="mb-6 max-w-xl">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search attendees by name"
          />
        </div>

        {loading ? (
          <LoadingSkeleton count={3} />
        ) : error ? (
          <EmptyState
            title="Could not load attendees"
            message={error}
          />
        ) : attendees.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {attendees.map((attendee) => (
              <div key={attendee._id} className="relative">
                <AttendeeCard
                  attendee={attendee}
                  onSelect={setSelected}
                />

                <div className="absolute right-3 top-3 flex gap-2">
                  <button
                    onClick={() => openEditModal(attendee)}
                    className="rounded-lg bg-white p-2 shadow-md transition hover:scale-105 dark:bg-gray-800"
                  >
                    <FiEdit2 />
                  </button>

                  <button
                    onClick={() => handleDelete(attendee)}
                    className="rounded-lg bg-white p-2 text-red-500 shadow-md transition hover:scale-105 dark:bg-gray-800"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No attendees found"
            message="Try a different name or clear the search field."
          />
        )}
      </section>

      <AttendeeModal
        attendee={selected}
        onClose={() => setSelected(null)}
      />

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl dark:bg-gray-900">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {editingAttendee
                  ? "Edit Attendee"
                  : "Add Attendee"}
              </h2>

              <button
                onClick={() => setShowForm(false)}
                className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Full Name
                </label>

                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fullName: e.target.value
                    })
                  }
                  className="w-full rounded-xl border px-4 py-3 outline-none"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Nickname
                </label>

                <input
                  type="text"
                  value={formData.nickname}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      nickname: e.target.value
                    })
                  }
                  className="w-full rounded-xl border px-4 py-3 outline-none"
                  placeholder="Johnny"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Profile Image URL
                </label>

                <input
                  type="text"
                  value={formData.profileImageUrl}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      profileImageUrl: e.target.value
                    })
                  }
                  className="w-full rounded-xl border px-4 py-3 outline-none"
                  placeholder="https://..."
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-accent py-3 font-bold text-white"
              >
                {editingAttendee
                  ? "Update Attendee"
                  : "Add Attendee"}
              </button>
            </form>
          </div>
        </div>
      )}
    </PageTransition>
  );
}
