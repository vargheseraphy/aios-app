import { SignInGate } from "@/components/auth/SignInGate";
import { MyPromptsView } from "@/components/account/MyPromptsView";

export const metadata = { title: "My Prompts — AI Operating System for Leaders" };

export default function MyPromptsPage() {
  return (
    <SignInGate>
      <MyPromptsView />
    </SignInGate>
  );
}
