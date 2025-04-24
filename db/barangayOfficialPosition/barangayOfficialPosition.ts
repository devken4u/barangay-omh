import { connectDB } from "../connection/connection";
import BarangayOfficialPositionModel from "../models/barangay_official_position";
import { OfficialPosition } from "@/types";

export async function getOfficialPositions() {
  try {
    await connectDB();
    const positions = await BarangayOfficialPositionModel.find().sort({
      order: "asc",
    });
    return positions;
  } catch (error) {
    throw error;
  }
}

export async function createOfficialPosition({ title }: { title: string }) {
  try {
    await connectDB();
    const lastOrder = await getLastPosition();

    if (lastOrder === null) {
      const position = await BarangayOfficialPositionModel.create({
        title,
        order: 1,
      });
      return position;
    } else {
      const position = await BarangayOfficialPositionModel.create({
        title,
        order: lastOrder.order + 1,
      });
      return position;
    }
  } catch (error) {
    throw error;
  }
}

export async function getLastPosition() {
  try {
    await connectDB();
    const position = BarangayOfficialPositionModel.findOne().sort({
      order: "desc",
    });
    if (position) return position;
    return null;
  } catch (error) {
    throw error;
  }
}
