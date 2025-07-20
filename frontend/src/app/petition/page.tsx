"use client";
import React, { useState, useEffect } from "react";

const PetitionPage: React.FC = () => {
  const [name, setName] = useState("");
  const [signed, setSigned] = useState(false);
  const [signatures, setSignatures] = useState<
    { name: string; email?: string; picture?: string }[]
  >([]);

  const getTokenFromCookie = () => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
  };

  // Fetch signatures from backend
  const fetchSignatures = async () => {
    const token = getTokenFromCookie();
    if (!token) return;

    try {
      const res = await fetch("http://localhost:5173/petitions/signatures", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setSignatures(data);
      }
    } catch (err) {
      console.error("Failed to fetch signatures", err);
    }
  };

  useEffect(() => {
    fetchSignatures();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getTokenFromCookie();

    if (!token) {
      alert("No token found. Please log in first.");
      return;
    }

    try {
      const verifyRes = await fetch("http://localhost:5173/petitions/verify-auth", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const verifyData = await verifyRes.json();

      if (verifyData.authorized) {
        const submitRes = await fetch("http://localhost:5173/petitions/sign", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name }),
        });

        if (submitRes.ok) {
          setSigned(true);
          fetchSignatures(); // Refresh signatures after signing
        } else {
          const err = await submitRes.json();
          alert("Failed to sign petition: " + err.msg);
        }
      } else {
        alert("You are not authorized to sign this petition.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred.");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Petition Page</h1>
      <p className="mb-6 text-gray-700">Welcome to the petition page.</p>

      {!signed ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Enter your name to sign the petition:
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Your name"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign Petition
          </button>
        </form>
      ) : (
        <p className="text-green-700 text-lg font-semibold mb-8">
          Thank you, {name}, for signing the petition!
        </p>
      )}

      {/* Show signatures list */}
      <section className="w-full max-w-md bg-white p-4 rounded shadow-md overflow-auto max-h-96">
        <h2 className="text-xl font-semibold mb-4">Signatures</h2>
        {signatures.length === 0 ? (
          <p className="text-gray-600">No signatures yet.</p>
        ) : (
          <ul>
            {signatures.map((sig, index) => (
              <li
                key={index}
                className="flex items-center space-x-4 mb-3 border-b border-gray-200 pb-2"
              >
                {sig.picture && (
                  <img
                    src={sig.picture}
                    alt={`${sig.name}'s profile`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="font-medium">{sig.name}</p>
                  {sig.email && (
                    <p className="text-sm text-gray-500">{sig.email}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default PetitionPage;
