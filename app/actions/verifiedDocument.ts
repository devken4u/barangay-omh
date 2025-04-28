"use server";

import { createVerifiedDocument } from "@/db/verifiedDocument/verifiedDocument";
import { auth } from "@/auth";
import { CreateLog } from "@/db/log/log";
import { revalidatePath } from "next/cache";

export async function createVerifiedDocumentAction({
  owner_name,
  document_type,
  remarks,
}: {
  owner_name: string;
  document_type: string;
  remarks: string;
}) {
  try {
    const session = await auth();
    const verifiedDocument = await createVerifiedDocument({
      owner_name,
      document_type,
      remarks,
      verified_by: session?.user.email!,
    });
    await CreateLog({
      action: "CREATE",
      email: session?.user.email!,
      message: "Created a new verified document",
    });
    revalidatePath("/admin/dashboard/verify-documents");
    const BASE_URL = process.env.BASE_URL;
    const verifiedLink = `${BASE_URL}/verified-document/${verifiedDocument._id}`;
    return verifiedLink;
  } catch (error) {
    throw error;
  }
}
