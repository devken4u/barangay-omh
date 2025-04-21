import {
  isUnpublishedArticleEmpty,
  createArticle,
  getRecentUnpublishedArticle,
} from "@/db/article/article";
import { auth } from "@/auth";
import {
  redirectIfNotAuthenticated,
  redirectIfRoleNotAuthorized,
} from "@/lib/page-guard";
import { redirect } from "next/navigation";
import { CreateLog } from "@/db/log/log";

async function page() {
  await redirectIfNotAuthenticated("/");
  await redirectIfRoleNotAuthorized(["super-admin", "admin"], "/");
  const session = await auth();

  if (await isUnpublishedArticleEmpty(session?.user.email!)) {
    const article = await createArticle({ created_by: session?.user.email! });
    await CreateLog({
      email: session?.user.email!,
      action: "CREATE",
      message: "Created a new article.",
    });
    if (article) return redirect(`/admin/dashboard/article/${article._id}`);
  } else {
    const article = await getRecentUnpublishedArticle(session?.user.email!);
    return redirect(`/admin/dashboard/article/${article._id}`);
  }
}

export default page;
