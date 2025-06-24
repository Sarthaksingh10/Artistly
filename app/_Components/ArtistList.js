"use client";
import { useEffect, useState } from "react";
import ArtistCard from "./ArtistCard";
import { useSearchParams } from "next/navigation";

export default function ArtistList() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "all";
  const location = searchParams.get("location") || "all";
  const priceRange = searchParams.get("priceRange")
    ? parseInt(searchParams.get("priceRange"))
    : null;

  const [artists, setArtists] = useState([]);

  useEffect(() => {
    async function fetchArtistToDisplay() {
      const artistRes = await fetch("/api/artists");
      let artistData = await artistRes.json();

      // Filtering for the category
      if (category !== "all") {
        artistData = artistData.filter((artist) =>
          Array.isArray(artist.category)
            ? artist.category.includes(category)
            : artist.category === category
        );
      }

      // filtering w.r.t location
      if (location !== "all") {
        artistData = artistData.filter(
          (artist) => artist.location === location
        );
      }

      // filtering for price range with respect to the slider
      if (priceRange !== null) {
        artistData = artistData.filter((artist) => {
          if (!artist.priceRange) return false; // Skip if priceRange is undefined/null

          const rangeParts = artist.priceRange.split("-"); // splitting range into an array
          const upperBoundStr = rangeParts[1] || rangeParts[0]; // taking the upper bound and if not upper bound we take lower bound
          const upperBound = parseInt(
            upperBoundStr.replace("₹", "").trim(), // replacing currency symbol with blank space to match it with slider
            10
          );
          return upperBound <= priceRange;
        });
      }

      setArtists(artistData);
    }

    fetchArtistToDisplay();
  }, [category, location, priceRange]);

  return (
    /* Mapping all the artist creating a grid layout */
    <div className="flex flex-wrap gap-[10px] m-4  justify-center md:justify-between ">
      {artists.map((artist) => (
        <ArtistCard key={artist.id} artist={artist} />
      ))}
    </div>
  );
}
