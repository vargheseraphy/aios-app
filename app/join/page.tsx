import { Suspense } from "react";
import { JoinView } from "@/components/auth/JoinView";

export const metadata = { title: "Join — AI Operating System for Leaders" };

export default function JoinPage() {
  return (
    <Suspense fallback={null}>
      <JoinView />
    </Suspense>
  );
}
