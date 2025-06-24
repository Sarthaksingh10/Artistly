import Link from "next/link";
/* hero section of the main home page */
export default function Hero() {
  return (
    <div>
      <section className="max-w-4xl text-center mb-16">
        <h1 className="text-[40px] sm:text-[50px] md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-fuchsia-400 via-cyan-400 to-white bg-clip-text text-transparent mb-6">
          Connect Event Planners & Artists Effortlessly
        </h1>
        <p className="text-base sm:text-lg md:text-xl font-normal text-zinc-300 mb-10 leading-relaxed">
          Discover, connect and book curated artists for your next event. <br />
          <span className="text-zinc-400">
            Artistly bridges the gap between event planners and top artist
            managers—making talent booking seamless, transparent, and instant.
          </span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
          <Link href="/artists">
            <button className="cursor-pointer w-full px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-white shadow-md hover:from-fuchsia-700 hover:to-cyan-400 transition">
              Browse Artists
            </button>
          </Link>
          <Link href="/managerboard">
            <button className="cursor-pointer w-full px-6 py-3 rounded-lg font-medium bg-zinc-800/70 hover:bg-cyan-600 hover:text-white transition text-zinc-100 flex items-center gap-2 justify-center">
              <span>Manager Dashboard</span>
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
