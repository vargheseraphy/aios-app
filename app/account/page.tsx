import { SignInGate } from "@/components/auth/SignInGate";
import { AccountView } from "@/components/account/AccountView";

export const metadata = { title: "Account — AI Operating System for Leaders" };

export default function AccountPage() {
  return (
    <SignInGate>
      <AccountView />
    </SignInGate>
  );
}
