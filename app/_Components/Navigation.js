import Link from "next/link";
import Button from "./Button";
/* Navigation button in the header navigation to various pages */
export default async function Navigation() {
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-[16px] items-center">
        <li className="text-[20px]">
          <Link
            href="/onboard"
            className="hover:text-accent-400 transition-colors"
          >
            <Button>Onboard yourself</Button>
          </Link>
        </li>
        <li>
          <Link
            href="/artists"
            className="hover:text-accent-400 transition-colors"
          >
            <Button>Browse Artists</Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
