import ArtistCard from "./_Components/ArtistCard";
import Hero from "./_Components/Hero";
import dbArtist from "./_data/db.json";
import { Toaster } from "react-hot-toast";

const heroPageArtist = dbArtist.artists.slice(0, 3);

/* Front page or hero page  having an hero section and few artist on display */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 py-10 bg-gradient-to-b from-zinc-950 to-zinc-900 ">
      {/* Hero Section */}
      <Toaster />
      <Hero />
      {/* Featured Artists */}
      <section className="w-full max-w-6xl px-2">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center text-white mb-8">
          Featured Artists
        </h2>
        <div className="flex gap-6 overflow-x-auto pb-4 px-1 scroll-smooth snap-x snap-mandatory scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-transparent lg:flex lg:justify-between">
          {heroPageArtist.map((artist) => (
            <div key={artist.id} className="snap-center shrink-0">
              <ArtistCard artist={artist} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
