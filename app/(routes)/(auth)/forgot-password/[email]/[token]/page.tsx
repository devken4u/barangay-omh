import { verifyToken } from "@/lib/utils";
import { redirect } from "next/navigation";
import { resetUserPasswordAction } from "@/app/actions/user";
import Barangay174Logo from "@/components/logo/Barangay174Logo";
import Link from "next/link";
import { getPasswordResetTokenByUserEmail } from "@/db/passwordResetToken/passwordResetToken";

function generateCode(): string {
  const letters = Array.from(
    { length: 4 },
    () => String.fromCharCode(65 + Math.floor(Math.random() * 26)) // A-Z
  ).join("");

  const numbers = Array.from(
    { length: 4 },
    () => Math.floor(Math.random() * 10) // 0-9
  ).join("");

  return letters + numbers;
}

async function page({ params }: { params: { email: string; token: string } }) {
  const { email, token } = await params;

  // check if user has pending password reset
  const isPendingReset = await getPasswordResetTokenByUserEmail(
    decodeURIComponent(email)
  );
  // check token
  const payload = verifyToken(token);
  const code = generateCode();
  const newPassword = `brgy-omh-${code}`;

  if (payload && isPendingReset) {
    await resetUserPasswordAction(
      decodeURIComponent(email),
      decodeURIComponent(token),
      newPassword
    );
    return (
      <div className="w-screen h-screen flex flex-col items-center bg-orange-200 p-4">
        <div className="bg-white my-auto flex flex-col items-center rounded-md shadow-md gap-2 p-8">
          <Barangay174Logo size={80} />
          <h1 className="font-semibold text-2xl text-center">Password Reset</h1>
          <h2 className="text-center flex flex-col gap-2">
            <span>Your password is reset to</span>
            <span className="bg-gray-200 font-bold p-2 rounded-md">
              {newPassword}
            </span>
            <span>
              Remember this new password before you close this tab.
              <br />
              this reset password link is already expired and you
              <br />
              cannot see this tab again when you close, or refresh it.
            </span>
            <span>
              After you logged in, change your password for better security.
            </span>
          </h2>
          <Link className="underline" href="/login">
            Go To Login
          </Link>
        </div>
      </div>
    );w
  } else {
    return (
      <div className="w-screen h-screen flex flex-col items-center bg-orange-200 p-4">
        <div className="bg-white my-auto flex flex-col items-center rounded-md shadow-md gap-2 p-8">
          <Barangay174Logo size={80} />
          <h1 className="font-semibold text-2xl text-center">
            Reset Password Link Expired
          </h1>
          <Link className="underline" href="/login">
            Go To Login
          </Link>
        </div>
      </div>
    );
  }
}

export default page;
