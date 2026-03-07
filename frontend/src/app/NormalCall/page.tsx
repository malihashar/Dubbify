"use client";

import { Suspense } from "react";
import { NormalCallScreen } from "@/views/NormalCallScreen";
import { Topbar } from "@/components/layout/topbar";

export default function NormalCallPage() {
  return (
    <>
      <Topbar />
      <Suspense>
        <NormalCallScreen />
      </Suspense>
    </>
  );
}
