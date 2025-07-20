"use client";

import { useEffect } from "react";

export default function AuthCallback() {
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get("access_token");

    if (token) {
      console.log("Access Token:", token);

      fetch("http://localhost:5173/petitions/verify-auth", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Backend response:", data);

          if (data.authorized) {
            document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24}; secure; samesite=strict`;
            window.location.href = "/petition";
          } else {
            console.error("User is not authorized");
          }
        })
        .catch((err) => {
          console.error("Error contacting backend:", err);
        });
    } else {
      console.error("No access token found in URL hash.");
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="text-center space-y-4">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">
          Processing login... please wait
        </p>
      </div>
    </div>
  );
}
