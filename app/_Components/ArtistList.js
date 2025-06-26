import ArtistCard from "./ArtistCard";

async function fetchArtists() {
  const res = await fetch("http://localhost:3000/api/artists/", {
    cache: "no-store",
  });

  return res.json();
}
export default async function ArtistList({ searchParams }) {
  const category = searchParams.category || "all";
  const location = searchParams.location || "all";
  const priceRange = searchParams.priceRange
    ? parseInt(searchParams.priceRange)
    : null;

  let artists = await fetchArtists();

  // Filtering for the category
  if (category !== "all") {
    artists = artists.filter((artist) =>
      Array.isArray(artist.category)
        ? artist.category.includes(category)
        : artist.category === category
    );
  }

  // filtering w.r.t location
  if (location !== "all") {
    artists = artists.filter((artist) => artist.location === location);
  }

  // filtering for price range with respect to the slider
  if (priceRange !== null) {
    artists = artists.filter((artist) => {
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

  return (
    /* Mapping all the artist creating a grid layout */
    <div className="flex flex-wrap gap-[10px] m-4  justify-center md:justify-between ">
      {artists.map((artist) => (
        <ArtistCard key={artist.id} artist={artist} />
      ))}
    </div>
  );
}
