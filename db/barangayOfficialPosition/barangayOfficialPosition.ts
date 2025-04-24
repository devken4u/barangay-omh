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

export async function getFirstPosition() {
  try {
    await connectDB();
    const position = BarangayOfficialPositionModel.findOne().sort({
      order: "asc",
    });
    if (position) return position;
    return null;
  } catch (error) {
    throw error;
  }
}

export async function movePositionOrderUp(id: string) {
  try {
    await connectDB();
    const first = await getFirstPosition();
    if (String(first._id) === id){
      return false;
    }

    const positions = await getOfficialPositions();

    const index = positions.findIndex((position) => {
      return String(position._id) === id;
    });

    const positionToSwap = positions[index - 1];
    const positionForSwap = await BarangayOfficialPositionModel.findById(id);
    
    await BarangayOfficialPositionModel.findByIdAndUpdate(positionToSwap._id, {
      order: positionForSwap.order
    });

    await BarangayOfficialPositionModel.findByIdAndUpdate(positionForSwap._id, {
      order: positionToSwap.order
    });
    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function movePositionOrderDown(id: string) {
  try {
    await connectDB();
    const last = await getLastPosition();
    if (String(last._id) === id) return false;
    
    const positions = await getOfficialPositions();

    const index = positions.findIndex((position) => {
      return String(position._id) === id;
    });

    const positionToSwap = positions[index + 1];
    const positionForSwap = await BarangayOfficialPositionModel.findById(id);
    
    await BarangayOfficialPositionModel.findByIdAndUpdate(positionToSwap._id, {
      order: positionForSwap.order
    });

    await BarangayOfficialPositionModel.findByIdAndUpdate(positionForSwap._id, {
      order: positionToSwap.order
    });
    return true;
  } catch (error) {
    throw error;
  }
}
