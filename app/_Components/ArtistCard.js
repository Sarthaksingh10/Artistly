import Image from "next/image";
import Button from "./Button";
/* A reusable card to map artist dynamically */
export default function ArtistCard({ artist }) {
  return (
    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-[3px] rounded-xl shadow-xl transition hover:shadow-2xl w-[300px] h-[480px] md:w-[320px] ">
      <div className="bg-zinc-900 text-white rounded-lg p-6 flex flex-col items-center text-center h-full gap-[15px]">
        {/* Image Container */}
        <div className="w-[230px] h-[250px] rounded-xl overflow-hidden border-4 border-zinc-800 shadow-md mb-4">
          {typeof artist.avatar === "string" && artist.avatar.trim() !== "" && (
            <Image
              src={artist.avatar}
              alt={artist.name || "Artist avatar"}
              width={200}
              height={200}
              className="object-cover w-full h-full"
            />
          )}
        </div>
        <div>
          {/* Artist Category */}
          <h3 className="text-xl font-semibold text-white">{artist.name}</h3>
          {artist.category.map((category) => (
            <span
              key={category}
              className="inline-block px-4 py-1 mt-2 mx-[2px] text-sm font-medium text-indigo-300 bg-indigo-800/40 rounded-full"
            >
              {category}
            </span>
          ))}
          {/* Artist priceRange */}
          <p className="text-base text-zinc-200 font-medium mt-3">
            💰 {artist.priceRange}
          </p>
          <p className="text-sm text-zinc-400 mt-1">📍 {artist.location}</p>
        </div>
        {/* CTA for qoute */}
        <div className="ml-[10px]">
          <Button>Ask For Quote</Button>
        </div>
      </div>
    </div>
  );
}
