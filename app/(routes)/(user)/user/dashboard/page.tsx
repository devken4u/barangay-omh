import {
  redirectIfNotAuthenticated,
  redirectIfRoleNotAuthorized,
} from "@/lib/page-guard";

export default async function UserDashboardPage() {
  await redirectIfNotAuthenticated("/");
  await redirectIfRoleNotAuthorized(["user"], "/");
  return <div>hello from user dashboard page</div>;
}
