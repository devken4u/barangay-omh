"use server";

import { auth } from "@/auth";
import {
  createBusinessRequest,
  closeBusiness,
  deleteBusiness,
  openBusiness,
} from "@/db/business/business";
import { CreateLog } from "@/db/log/log";
import { revalidatePath } from "next/cache";

export async function createBusinessRequestAction({
  business_name,
  business_address,
  business_contact,
  business_description,
}: {
  business_name: string;
  business_address: string;
  business_contact: string;
  business_description: string;
}) {
  try {
    const session = await auth();
    await createBusinessRequest({
      business_name,
      business_address,
      business_contact,
      business_description,
      created_by: session?.user.email!,
    });
    await CreateLog({
      email: session?.user.email!,
      action: "CREATE",
      message: "Created a business request.",
    });
    revalidatePath("/user/dashboard/business-listing");
    return true;
  } catch (error) {
    throw error;
  }
}

export async function closeBusinessAction(id: string) {
  try {
    await closeBusiness(id);
    revalidatePath("/user/dashboard/business-listing");
    return true;
  } catch (error) {
    throw error;
  }
}

export async function openBusinessAction(id: string) {
  try {
    await openBusiness(id);
    revalidatePath("/user/dashboard/business-listing");
    return true;
  } catch (error) {
    throw error;
  }
}

export async function deleteBusinessAction(id: string) {
  try {
    const session = await auth();
    await deleteBusiness(id);
    await CreateLog({
      email: session?.user.email!,
      action: "DELETE",
      message: "Deleted a business.",
    });
    revalidatePath("/user/dashboard/business-listing");
    return true;
  } catch (error) {
    throw error;
  }
}
