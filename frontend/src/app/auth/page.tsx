"use client";

import { useEffect } from "react";

export default function AuthCallback() {
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get("access_token");

    if (token) {
      console.log("Access Token:", token);
    } else {
      console.error("No access token found in URL hash.");
    }
  }, []);

  return <p>Token received. Check the console. :DDDDDDDDDDDDDDDDDDDDDDDDDDD</p>;
}