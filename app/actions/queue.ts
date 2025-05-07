"use server";

import { createQueue, deleteQueue, getQueues } from "@/db/queue/queue";
import { revalidatePath } from "next/cache";

export async function createQueueAction({
  person_name,
}: {
  person_name: string;
}) {
  try {
    await createQueue({ person_name });
    revalidatePath("/admin/dashboard/online-queuing");
    return true;
  } catch (error) {
    throw error;
  }
}

export async function deleteQueueAction(id: string) {
  try {
    await deleteQueue(id);
    revalidatePath("/admin/dashboard/online-queuing");
    return true;
  } catch (error) {
    throw error;
  }
}

export async function getQueuesAction() {
  try {
    const queues = await getQueues();
    return JSON.parse(JSON.stringify(queues));
  } catch (error) {
    throw error;
  }
}
