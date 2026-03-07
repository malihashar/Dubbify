"use client";

import { Suspense } from "react";
import { PhoneCallScreen } from "@/views/TranslatePhoneCallScreen";
import { Topbar } from "@/components/layout/topbar";

export default function TranslatePhoneCallPage() {
  return (
    <>
      <Topbar />
      <Suspense>
        <PhoneCallScreen />
      </Suspense>
    </>
  );
}
