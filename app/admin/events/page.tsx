"use client";
import { useState } from "react";
import Link from "next/link";
import { PencilIcon, TrashIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

// Tipe data untuk produk
type Event = {
	id: number;
	name: string;
	image: string;
};

export default function EventsManagement() {
	// Data produk contoh (ganti dengan data sebenarnya dari API/database)
	const [events, setEvents] = useState<Event[]>([
		{
			id: 1,
			name: "Wisuda UMN",
			image: "https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b",
		},
		{
			id: 2,
			name: "Valentine",
			image: "https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b",
		},
		{
			id: 3,
			name: "Wisuda Untar",
			image: "https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b",
		},
		{
			id: 4,
			name: "Wisuda Binus",
			image: "https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b",
		},
		{
			id: 5,
			name: "Hari Ibu",
			image: "https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b",
		},
	]);

	const [searchTerm, setSearchTerm] = useState("");

	// Filter event berdasarkan pencarian
	const filteredEvents = events.filter(
		(event) =>
			event.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	// Fungsi untuk menghapus event
	const deleteProduct = (id: number) => {
		if (window.confirm("Apakah Anda yakin ingin menghapus event ini?")) {
			setEvents(events.filter((event) => event.id !== id));
		}
	};

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Manajemen Event</h1>
				<Link
					href="/admin/events/add"
					className="p-1.5 inline-flex items-center justify-center"
				>
					<PlusCircleIcon className="h-10 w-10" />
					<span className="sr-only">Tambah Event</span>
				</Link>
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
									<Link
										href={`/admin/categories/edit/${event.id}`}
										className="p-1.5inline-flex items-center justify-center"
									>
										<PencilIcon className="h-4 w-4" />
										<span className="sr-only">Edit</span>
									</Link>
									<button
										onClick={() => deleteProduct(event.id)}
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
			</div>
		</div>
	);
}
