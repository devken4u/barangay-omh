"use server";

import { createOfficialPosition } from "@/db/barangayOfficialPosition/barangayOfficialPosition";

export async function createOfficialPositionAction(title: string) {
  try {
    await createOfficialPosition({ title });
    return true;
  } catch (error) {
    return false;
  }
}
