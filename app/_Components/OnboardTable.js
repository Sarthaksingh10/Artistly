"use client";
import React, { useEffect, useState } from "react";
/* manager table to approve delete and view the submissions from form */
export default function OnboardTable() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    async function fetchArtists() {
      try {
        const res = await fetch("api/submissions");
        const data = await res.json();
        setSubmissions(data);
      } catch (error) {
        console.error("Failed to fetch submissions:", error);
      }
    }
    fetchArtists();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`api/submissions/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setSubmissions((prev) => prev.filter((artist) => artist.id !== id));
      } else {
        alert("Failed to delete artist");
      }
    } catch (error) {
      console.error("Error deleting artist:", error);
    }
  };

  const handleApprove = async (artist) => {
    try {
      const checkRes = await fetch(`api/artists?id=${artist.id}`);
      const existing = await checkRes.json();
      if (existing.length > 0) {
        alert("Artist already approved!");
        return;
      }

      const addRes = await fetch("api/artists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(artist),
      });

      if (addRes.ok) {
        await fetch(`api/submissions/${artist.id}`, {
          method: "DELETE",
        });

        setSubmissions((prev) =>
          prev.filter((submission) => submission.id !== artist.id)
        );
      } else {
        alert("Approval failed");
      }
    } catch (error) {
      console.error("Error approving artist:", error);
    }
  };
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full text-sm text-left text-white bg-zinc-900 border border-zinc-700 rounded-lg">
        <thead className="bg-zinc-800 text-zinc-300 uppercase text-xs">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">City</th>
            <th className="px-4 py-3">Fee</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {submissions.length > 0 ? (
            submissions.map((artist) => (
              <tr key={artist.id} className="border-t border-zinc-700">
                <td className="px-4 py-2">{artist.fullname}</td>
                <td className="px-4 py-2">
                  {Array.isArray(artist.category)
                    ? artist.category.join(", ")
                    : artist.category}
                </td>
                <td className="px-4 py-2">{artist.location}</td>
                <td className="px-4 py-2">{artist.pricerange}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => alert(JSON.stringify(artist, null, 2))}
                    className="text-blue-400 hover:underline mr-4"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleApprove(artist)}
                    className="text-blue-400 hover:underline mr-4"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDelete(artist.id)}
                    className="text-red-400 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-4 text-zinc-400">
                No submissions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
