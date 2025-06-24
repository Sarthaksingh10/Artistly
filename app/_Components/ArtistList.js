"use client";
import { useEffect, useState } from "react";
import ArtistCard from "./ArtistCard";

export default function ArtistList({ searchParams }) {
  const category = searchParams?.category || "all";
  const location = searchParams?.location || "all";
  const priceRange = parseInt(searchParams?.priceRange);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    async function fetchArtistToDisplay() {
      const artistRes = await fetch("api/artists");
      let artistData = await artistRes.json();
      //Filtering for the category
      if (category !== "all") {
        artistData = artistData.filter((artist) =>
          Array.isArray(artist.category)
            ? artist.category.includes(category)
            : artist.category === category
        );
      }
      //filtering w.r.t location
      if (location !== "all") {
        artistData = artistData.filter(
          (artist) => artist.location === location
        );
      }

      //filtering for price range with respect to the slider
      if (priceRange && priceRange !== "all") {
        artistData = artistData.filter((artist) => {
          if (!artist.priceRange) return false; //  Skip if priceRange is undefined/null

          const rangeParts = artist.priceRange.split("-"); //splitting range into and array
          const upperBoundStr = rangeParts[1] || rangeParts[0]; //takking the upperbound and if not upper bound we take lower bound
          const upperBound = parseInt(
            upperBoundStr.replace("₹", "").trim(), //replacing currency symbol with blankspace to match it with slider
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
    <div className="grid grid-cols-2 gap-[10px] m-4 md:flex md:flex-wrap md:justify-between ">
      {artists.map((artist) => (
        <ArtistCard key={artist.id} artist={artist} />
      ))}
    </div>
  );
}
