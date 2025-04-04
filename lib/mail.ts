import nodemailer from "nodemailer";

const GOOGLE_APP_PASSWORD = process.env.GOOGLE_APP_PASSWORD;
const GOOGLE_EMAIL = process.env.GOOGLE_EMAIL;

if (!GOOGLE_APP_PASSWORD || !GOOGLE_EMAIL) {
  throw new Error(
    "GOOGLE_APP_PASSWORD and GOOGLE_EMAIL is not defined in environment variables"
  );
}

const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: GOOGLE_EMAIL,
    pass: GOOGLE_APP_PASSWORD,
  },
});

export async function sendMail({
  to,
  subject,
  message,
}: {
  to: string;
  subject: string;
  message: string;
}) {
  await transporter.sendMail({
    to,
    subject,
    html: message,
  });
}
