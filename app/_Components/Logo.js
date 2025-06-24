import Image from "next/image";
import Link from "next/link";

import logo from "@/public/Logo.png";
/* Linking logo to home page */
export default function Logo() {
  return (
    <div>
      <Link href="/" className="flex items-center gap-4 z-10">
        <Image
          src={logo}
          height="60"
          quality={100}
          width="60"
          alt="The Wild Oasis logo"
          className="rounded-full"
        />
        <span className="hidden sm:block text-xl font-semibold text-primary-100">
          Artistly
        </span>
      </Link>
    </div>
  );
}
