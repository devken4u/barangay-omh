import { verifyToken } from "@/lib/utils";
import { verifyUserEmail } from "@/db/user/user";
import { redirect } from "next/navigation";
import Barangay174Logo from "@/components/logo/Barangay174Logo";
import Link from "next/link";

async function page({ params }: { params: { token: string } }) {
  const { token } = await params;

  const isValid = verifyToken(token);

  if (isValid) {
    await verifyUserEmail(isValid.email);
    return (
      <div className="w-screen h-screen flex flex-col items-center bg-orange-200 p-4">
        <div className="bg-white my-auto flex flex-col items-center rounded-md shadow-md gap-2 p-8">
          <Barangay174Logo size={80} />
          <h1 className="font-semibold text-2xl text-center text-green-500">
            Your email is now verified
          </h1>
          <h2 className="text-center">
            Thank you for verifying your email.
            <br />
            <Link href="/login" className="underline">
              Go To Login
            </Link>
          </h2>
        </div>
      </div>
    );
  } else {
    redirect("/login");
  }
}

export default page;
