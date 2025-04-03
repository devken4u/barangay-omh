import { getUserByEmailAction } from "@/app/actions/user";
import { redirect } from "next/navigation";

async function page({ params }: { params: { email: string } }) {
  const email = await params.email;

  const user = await getUserByEmailAction(email);
  console.log(user);

  // validate email here if it exists or the email is already verified
  //   if (!user) redirect("/");
  return <div>{decodeURIComponent(email)}</div>;
}

export default page;
