"use server";

import { createOfficialPosition, movePositionOrderUp, movePositionOrderDown } from "@/db/barangayOfficialPosition/barangayOfficialPosition";
import { revalidatePath } from "next/cache";

export async function createOfficialPositionAction(title: string) {
  try {
    await createOfficialPosition({ title });
    revalidatePath("/admin/dashboard/barangay-officials");
    return true;
  } catch (error) {
    return false;
  }
}

export async function movePositionOrderUpAction(id: string){
  try {
    await movePositionOrderUp(id);
    revalidatePath("/admin/dashboard/barangay-officials");
    return true;
  } catch (error) {
    return false;
  }
}

export async function movePositionOrderDownAction(id: string){
  try {
    await movePositionOrderDown(id);
    revalidatePath("/admin/dashboard/barangay-officials");
    return true;
  } catch (error) {
    return false;
  }
}