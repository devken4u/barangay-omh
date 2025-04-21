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

import { getArticleById, isArticleValid } from "@/db/article/article";
import { redirect } from "next/navigation";
import ArticleList from "../_components/ArticleList";
import ArticleEditor from "../_components/ArticleEditor";
import { auth } from "@/auth";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await redirectIfNotAuthenticated("/");
  await redirectIfRoleNotAuthorized(["super-admin", "admin"], "/");

  const { id } = await params;

  if (!(await isArticleValid(id))) {
    return redirect("/");
  }

  const session = await auth();
  const article = JSON.parse(
    JSON.stringify(await getArticleById(session?.user.email!, id))
  );

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
                  <BreadcrumbPage>Article</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex grow overflow-hidden">
          <ArticleList selected={id as string} />
          <ArticleEditor article={article!} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
