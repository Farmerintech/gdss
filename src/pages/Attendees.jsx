import { useEffect, useState } from "react";
// import { FiArrowDownAZ } from "react-icons/fi";
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
  const debouncedQuery = useDebouncedValue(query);
  const { attendees, loading, error, loadAttendees } = useAttendeeStore();

  useEffect(() => {
    loadAttendees(debouncedQuery);
  }, [debouncedQuery, loadAttendees]);

  return (
    <PageTransition>
      <section className="container-shell">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Guest book</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Attendees</h1>
            <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-300">
              Browse contributors, find friends, and see who has been filling the gallery.
            </p>
          </div>
          <div className="inline-flex min-h-11 items-center gap-2 rounded-2xl bg-white px-4 text-sm font-bold shadow-sm dark:bg-white/10">
            {/* <FiArrowDownAZ className="text-accent" aria-hidden="true" /> */}
            Sorted A-Z
          </div>
        </div>

        <div className="mb-6 max-w-xl">
          <SearchInput value={query} onChange={setQuery} placeholder="Search attendees by name" />
        </div>

        {loading ? (
          <LoadingSkeleton count={3} />
        ) : error ? (
          <EmptyState title="Could not load attendees" message={error} />
        ) : attendees.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {attendees.map((attendee) => (
              <AttendeeCard key={attendee.id} attendee={attendee} onSelect={setSelected} />
            ))}
          </div>
        ) : (
          <EmptyState title="No attendees found" message="Try a different name or clear the search field." />
        )}
      </section>
      <AttendeeModal attendee={selected} onClose={() => setSelected(null)} />
    </PageTransition>
  );
}
