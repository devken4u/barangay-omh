import { UserSidebar } from "@/components/user-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  redirectIfNotAuthenticated,
  redirectIfRoleNotAuthorized,
} from "@/lib/page-guard";

import UserInformation from "./_components/UserInformation";
import { getUserByEmail } from "@/db/user/user";
import { auth } from "@/auth";
import { User } from "@/types";

export default async function page() {
  await redirectIfNotAuthenticated("/");
  await redirectIfRoleNotAuthorized(["user"], "/");

  const session = await auth();
  const data = await getUserByEmail(session?.user.email!);
  const user: User = JSON.parse(JSON.stringify(data));

  return (
    <SidebarProvider>
      <UserSidebar />
      <SidebarInset className="h-screen overflow-hidden flex flex-col">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbPage>Settings</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="overflow-y-auto">
          <UserInformation user={user} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
