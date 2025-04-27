"use server";

import {
  createOfficialPosition,
  movePositionOrderUp,
  movePositionOrderDown,
  deleteBarangayOfficialPosition,
  updateOfficialPosition,
} from "@/db/barangayOfficialPosition/barangayOfficialPosition";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { CreateLog } from "@/db/log/log";

export async function createOfficialPositionAction(title: string) {
  try {
    const session = await auth();
    await createOfficialPosition({ title });
    await CreateLog({
      email: session?.user.email!,
      action: "CREATE",
      message: "Created a new barangay official position.",
    });
    revalidatePath("/admin/dashboard/barangay-officials");
    return true;
  } catch (error) {
    return false;
  }
}

export async function updateOfficialPositionAction(title: string, id: string) {
  try {
    const session = await auth();
    await updateOfficialPosition({
      title,
      id,
    });
    await CreateLog({
      email: session?.user.email!,
      action: "DELETE",
      message: "Deleted a barangay official position.",
    });
    revalidatePath("/admin/dashboard/barangay-officials");
    return true;
  } catch (error) {
    return false;
  }
}

export async function movePositionOrderUpAction(id: string) {
  try {
    await movePositionOrderUp(id);
    revalidatePath("/admin/dashboard/barangay-officials");
    return true;
  } catch (error) {
    return false;
  }
}

export async function movePositionOrderDownAction(id: string) {
  try {
    await movePositionOrderDown(id);
    revalidatePath("/admin/dashboard/barangay-officials");
    return true;
  } catch (error) {
    return false;
  }
}

export async function deleteBarangayOfficialPositionAction(id: string) {
  try {
    const session = await auth();
    await deleteBarangayOfficialPosition(id);
    await CreateLog({
      email: session?.user.email!,
      action: "DELETE",
      message: "Deleted a barangay official position.",
    });
    revalidatePath("/admin/dashboard/barangay-officials");
    return true;
  } catch (error) {
    return false;
  }
}
