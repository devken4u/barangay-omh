import { connectDB } from "../connection/connection";
import QueueModel from "../models/queue";

export async function createQueue({ person_name }: { person_name: string }) {
  try {
    await connectDB();
    const queue = await QueueModel.create({ person_name });
    return queue;
  } catch (error) {
    throw error;
  }
}

export async function getQueues() {
  try {
    await connectDB();
    const queues = await QueueModel.find();
    return queues;
  } catch (error) {
    throw error;
  }
}

export async function deleteQueue(id: string) {
  try {
    await connectDB();
    const queue = await QueueModel.findByIdAndDelete(id);
    return queue;
  } catch (error) {
    throw error;
  }
}
