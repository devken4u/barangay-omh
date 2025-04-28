"use server";

import {
  createDocumentType,
  editDocumentType,
  setDocumentStatus,
} from "@/db/documentType/documentType";
import { auth } from "@/auth";
import { CreateLog } from "@/db/log/log";
import { revalidatePath } from "next/cache";

export async function createDocumentTypeAction({ name }: { name: string }) {
  try {
    const session = await auth();
    await createDocumentType({ name });
    await CreateLog({
      email: session?.user.email!,
      action: "CREATE",
      message: "Created a new document type.",
    });
    revalidatePath("/admin/dashboard/document-types");
    return true;
  } catch (error) {
    throw error;
  }
}

export async function editDocumentTypeAction({
  name,
  id,
}: {
  name: string;
  id: string;
}) {
  try {
    const session = await auth();
    await editDocumentType({ name, id });
    await CreateLog({
      email: session?.user.email!,
      action: "UPDATE",
      message: "Updated a document type.",
    });
    revalidatePath("/admin/dashboard/document-types");
    return true;
  } catch (error) {
    throw error;
  }
}

export async function setDocumentStatusAction({
  status,
  id,
}: {
  status: boolean;
  id: string;
}) {
  try {
    const session = await auth();
    await setDocumentStatus({ status, id });
    await CreateLog({
      email: session?.user.email!,
      action: "UPDATE",
      message: "Updated document type status.",
    });
    revalidatePath("/admin/dashboard/document-types");
    return true;
  } catch (error) {
    throw error;
  }
}
