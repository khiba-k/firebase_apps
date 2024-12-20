"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-[#FF3D00] border-gray-300"></div>
    </div>
  );
}
