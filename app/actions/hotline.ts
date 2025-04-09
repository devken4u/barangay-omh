"use server";

import {
  createHotline,
  updateHotline,
  deleteHotline,
} from "@/db/hotline/hotline";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { CreateLog } from "@/db/log/log";

export async function createHotlineAction({
  label,
  number,
}: {
  label: string;
  number: string;
}) {
  try {
    const session = await auth();
    const hotline = await createHotline({
      label,
      number,
      created_by: session?.user.email || "",
    });
    await CreateLog({
      action: "CREATE",
      email: session?.user.email!,
      message: "Created a hotline.",
    });
    revalidatePath("/admin/dashboard/hotline");
    if (hotline) {
      return {
        status: "success",
      };
    }
    return {
      status: "failed",
    };
  } catch (error) {
    revalidatePath("/admin/dashboard/hotline");
    return {
      status: "failed",
    };
  }
}

export async function updateHotlineAction({
  _id,
  label,
  number,
}: {
  _id: string;
  label: string;
  number: string;
}) {
  try {
    const session = await auth();
    const hotline = await updateHotline({
      _id,
      label,
      number,
    });
    await CreateLog({
      action: "UPDATE",
      email: session?.user.email!,
      message: "Updated a hotline.",
    });
    revalidatePath("/admin/dashboard/hotline");
    if (hotline) {
      return {
        status: "success",
      };
    }
    return {
      status: "failed",
    };
  } catch (error) {
    revalidatePath("/admin/dashboard/hotline");
    return {
      status: "failed",
    };
  }
}

export async function deleteHotlineAction({ _id }: { _id: string }) {
  try {
    const session = await auth();
    const hotline = await deleteHotline({
      _id,
    });
    await CreateLog({
      action: "UPDATE",
      email: session?.user.email!,
      message: "Deleted a hotline.",
    });
    revalidatePath("/admin/dashboard/hotline");
    if (hotline) {
      return {
        status: "success",
      };
    }
    return {
      status: "failed",
    };
  } catch (error) {
    revalidatePath("/admin/dashboard/hotline");
    return {
      status: "failed",
    };
  }
}
