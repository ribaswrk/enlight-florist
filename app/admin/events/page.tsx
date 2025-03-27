"use client";
import { useEffect, useState } from "react";
import {
  PencilIcon,
  TrashIcon,
  PlusCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";

// Tipe data untuk produk
type Event = {
  id: number;
  name: string;
  show: number;
  image: string;
};

export default function EventsManagement() {
  // Data produk contoh (ganti dengan data sebenarnya dari API/database)
  const [events, setEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventShow, setEventShow] = useState(0);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
  const [selectedEventId, setSelectedEventId] = useState<number>(0);
  const { data: session } = useSession();

  // Filter kategori berdasarkan pencarian
  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchEvent = async () => {
    try {
      const res = await fetch("/api/protected/events", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to fetch event");

      const data = await res.json();
      setEvents(data); // ✅ Store actual data, not a promise
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };

  const saveEvent = async () => {
    if (!eventName.trim()) return;
    setLoading(true);
    try {
      const token = session?.accessToken;
      if (!token) throw new Error("No token available");
      console.log(token);
      const method = editingEvent ? "PUT" : "POST";
      const body = editingEvent
        ? JSON.stringify({ id: editingEvent.id, name: eventName })
        : JSON.stringify({ name: eventName, show: eventShow });
      const res = await fetch("/api/protected/events", {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body,
      });
      if (!res.ok) throw new Error("Failed to save event");
      setEventName("");
      setEventShow(0);
      setShowDialog(false);
      setEditingEvent(null);
      fetchEvent();
    } catch (error) {
      console.error("Error saving event:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk menghapus kategori
  const deleteEvent = async () => {
    if (!selectedEventId) return;
    try {
      const res = await fetch("/api/protected/events", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedEventId }),
      });

      if (!res.ok) throw new Error("Failed to delete event");

      const data = await res.json();
      console.log("Event deleted:", data);

      // Refresh the event list after deletion
      fetchEvent();
    } catch (error) {
      console.error("Error deleting event:", error);
    } finally {
      setShowConfirmDialog(false);
      setSelectedEventId(0);
    }
  };

  const openDialog = (event?: Event) => {
    setEditingEvent(event || null);
    setEventName(event?.name || "");
    setEventShow(event?.show || 0);
    setShowDialog(true);
  };

  const confirmDelete = (eventId: number) => {
    setSelectedEventId(eventId);
    setShowConfirmDialog(true);
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manajemen Event</h1>
        <button
          onClick={() => openDialog()}
          className="p-1.5 inline-flex items-center"
        >
          <PlusCircleIcon className="h-10 w-10" />
          <span className="sr-only">Tambah Kategori</span>
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Cari event..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nama Event
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Banner
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredEvents.map((event) => (
              <tr key={event.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{event.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{event.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{event.image}</td>
                <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-2">
                  <button onClick={() => openDialog(event)}>
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => confirmDelete(event.id)}
                    className="p-1.5 inline-flex items-center justify-center"
                  >
                    <TrashIcon className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Delete Confirmation Dialog */}
        {showConfirmDialog && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold mb-4">Hapus Kategori</h2>
              <p>Apakah Anda yakin ingin menghapus kategori ini?</p>
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  onClick={() => setShowConfirmDialog(false)}
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                >
                  Batal
                </button>
                <button
                  onClick={deleteEvent}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        )}
        {showDialog && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-96">
              {/* Tombol silang untuk menutup dialog */}
              <button
                onClick={() => setShowDialog(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>

              <h2 className="text-lg font-bold mb-4">
                {editingEvent ? "Edit" : "Tambah"} Kategori
              </h2>
              <input
                type="text"
                placeholder="Nama Event"
                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
              {/* home view */}
              <label className="flex items-center space-x-2 mb-4">
                <span>Home View</span>
                <input
                  type="checkbox"
                  className="w-5 h-5 border-gray-300 rounded"
                  checked={eventShow === 1} // Jika `productHomeView` adalah "1", maka dicentang
                  onChange={(e) => setEventShow(e.target.checked ? 1 : 0)} // Toggle antara 1 dan 0
                />
              </label>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowDialog(false)}
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                >
                  Batal
                </button>
                <button
                  onClick={saveEvent}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {loading ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
