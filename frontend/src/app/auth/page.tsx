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
            // ✅ Save token in cookie (expires in 1 day)
            document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24}; secure; samesite=strict`;

            // ✅ Redirect to petition page
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

  return <p>Token received. Sending to backend...</p>;
}