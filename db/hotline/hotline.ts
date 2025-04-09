import HotlineModel from "../models/hotline";
import { connectDB } from "../connection/connection";
import { Hotline } from "@/types";

export async function getHotlines() {
  try {
    await connectDB();
    const hotlines: Hotline[] = await HotlineModel.find();
    return hotlines;
  } catch (error) {
    throw error;
  }
}

export async function createHotline({
  label,
  number,
  created_by,
}: {
  label: string;
  number: string;
  created_by: string;
}) {
  try {
    await connectDB();
    const hotline = await HotlineModel.create({
      label,
      number,
      created_by,
    });
    return hotline;
  } catch (error) {
    throw error;
  }
}

export async function updateHotline({
  _id,
  label,
  number,
}: {
  _id: string;
  label: string;
  number: string;
}) {
  try {
    await connectDB();
    const hotline = await HotlineModel.findByIdAndUpdate(_id, {
      label,
      number,
    });
    return hotline;
  } catch (error) {
    throw error;
  }
}

export async function deleteHotline({ _id }: { _id: string }) {
  try {
    await connectDB();
    const hotline = await HotlineModel.findByIdAndDelete(_id);
    return hotline;
  } catch (error) {
    throw error;
  }
}
