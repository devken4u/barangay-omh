import { AdminSidebar } from "@/components/admin-sidebar";
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

export default async function page() {
  await redirectIfNotAuthenticated("/");
  await redirectIfRoleNotAuthorized(["super-admin", "admin"], "/");

  return (
    <SidebarProvider>
      <AdminSidebar />
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
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="px-4 flex items-center flex-col text-center">
          <h1 className="font-bold text-3xl">
            Welcome to barangay 174{" "}
            <span className="text-primary">Operations and Monitoring Hub</span>{" "}
            Admin Panel
          </h1>
          <p className="py-4 font-semibold">
            Manage and oversee barangay activities efficiently through the
            <br />
            Barangay 174 Operations and Monitoring Hub Admin Panel — your
            <br />
            centralized platform for tracking, coordination, and administrative
            control.
          </p>
          <div className="w-52 h-52 mx-auto perspective-1000 py-4">
            <img
              src="/barangay-174-icon.png"
              alt="Spinning Image"
              className="w-full h-full animate-spin-3d"
            />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
