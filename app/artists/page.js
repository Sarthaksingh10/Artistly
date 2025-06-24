import { Suspense } from "react";
import ArtistList from "../_Components/ArtistList";
import Filter from "../_Components/Filter";
export const metadata = {
  title: "Artists",
  description: "All the popular artist from different countries",
};

export default function Artists({ searchParams }) {
  return (
    <>
      <div className=" flex flex-col">
        <h3 className="ml-2 text-2xl">Filter</h3>
        <Filter />
        {/* Loading artistlist with a fallback */}
        <Suspense fallback="Loading Artists....">
          <ArtistList searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}
