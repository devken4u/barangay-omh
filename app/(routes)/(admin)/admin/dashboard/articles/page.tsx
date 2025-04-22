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
import ArticleList from "./_components/ArticleList";
import ArticleSearch from "./_components/ArticleSearch";

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
                  <BreadcrumbPage>Homepage</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Article List</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex grow overflow-hidden">
          <div className="flex flex-col gap-4 p-4 pt-0 grow overflow-hidden">
            <div>
              <ArticleSearch />
            </div>
            <div className="grow overflow-auto">
              <ArticleList />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
