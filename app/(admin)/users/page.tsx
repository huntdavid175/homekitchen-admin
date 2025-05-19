import { UserManagement } from "@/components/admin/UserManagement";
import { createClient } from "@/utils/supabase/server";

export default async function UsersPage() {
  let usersData = null;
  try {
    // Get Supabase client
    const supabase = await createClient();

    // Get the session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      throw new Error("No active session");
    }

    console.log(
      "Attempting to fetch from:",
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_URL}/api/dashboard/overview`
    );

    const fetchOverview = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_URL}/api/users/`,
      {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store", // or 'force-cache' if you want to cache the response
      }
    );

    console.log("Fetch response status:", fetchOverview.status);
    console.log("Fetch response ok:", fetchOverview.ok);

    if (!fetchOverview.ok) {
      const errorText = await fetchOverview.text();
      console.error("Response not ok. Status:", fetchOverview.status);
      console.error("Error response:", errorText);
      throw new Error(
        `HTTP error! status: ${fetchOverview.status}, body: ${errorText}`
      );
    }

    usersData = await fetchOverview.json();
    console.dir(usersData, { depth: null });
  } catch (error: any) {
    console.error("Error in fetch process:", error);
    console.error("Error name:", error?.name);
    console.error("Error message:", error?.message);
    console.error("Error stack:", error?.stack);
    // You might want to handle this error appropriately
    // For example, show an error message to the user
  }
  return <UserManagement users={usersData.data} />;
}
