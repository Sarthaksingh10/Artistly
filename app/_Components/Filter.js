// Filter.jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import dbArtist from "../_data/db.json";

export default function Filter() {
  //mapping all the unique category in the select box to filter w.r.t categories
  const Categories = [
    ...new Set(dbArtist.artists.flatMap((artist) => artist.category)),
  ];
  //mapping all the unique locations in the select box to filter w.r.t location
  const Locations = [
    ...new Set(dbArtist.artists.map((artist) => artist.location)),
  ];

  //handling state for filter logic
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [range, setRange] = useState(5000);

  const router = useRouter();

  //setting up the params in url
  const applyFilters = () => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (location) params.set("location", location);
    if (range !== null) params.set("priceRange", range);

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 p-4">
      <div className="sm:flex gap-[6px] ">
        <div className="flex gap-2">
          {/* Category select box */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border bg-black text-white rounded-sm px-2 py-1"
          >
            <option value="">Category</option>
            {Categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Location select box */}
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border bg-black text-white rounded-sm px-2 py-1"
          >
            <option value="">Location</option>
            {Locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
        {/* Slider for the price range with step size of 10k */}
        <div className="flex flex-col w-full max-w-xs ">
          <label htmlFor="priceRange" className="text-white text-sm mb-1">
            Price Range: ₹{range}
          </label>
          <input
            type="range"
            name="priceRange"
            min={10000}
            max={200000}
            step={10000}
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="w-full"
          />
        </div>
      </div>
      <button
        onClick={applyFilters} //onclick it will add it to the url
        className="bg-fuchsia-600 text-white px-4 py-2 rounded"
      >
        Apply Filters
      </button>
    </div>
  );
}
