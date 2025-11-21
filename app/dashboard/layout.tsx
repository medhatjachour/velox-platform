import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default async function DashboardRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Check authentication
  const user = await getCurrentUser();

  // Redirect to login if not authenticated
  if (!user) {
    redirect("/auth/login");
  }

  // Wrap all dashboard pages with DashboardLayout
  return (
    <DashboardLayout
      user={{
        name: user.name || user.username || "User",
        email: user.email,
        role: user.role,
      }}
    >
      {children}
    </DashboardLayout>
  );
}
