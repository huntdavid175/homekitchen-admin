import { AdminDashboard } from "@/components/admin/AdminDashboard";

export default function AdminPage() {
  // You can toggle this to true to see empty states
  const showEmptyStates = false;

  return <AdminDashboard showEmptyStates={showEmptyStates} />;
}
