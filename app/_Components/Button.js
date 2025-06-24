import React from "react";

export default function Button({ children }) {
  return (
    /* A reusable button */
    <button className=" cursor-pointer px-[6px] py-[8px] rounded-lg font-medium bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-white shadow-md hover:from-fuchsia-700 hover:to-cyan-400 transition hover-outline">
      {children}
    </button>
  );
}
