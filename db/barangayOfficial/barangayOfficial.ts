import { Truculenta } from "next/font/google";
import { connectDB } from "../connection/connection";
import BarangayOfficialModel from "../models/barangay_official";

export async function createBarangayOfficial({
  name,
  titles,
  position,
  image_url,
  public_id,
}: {
  name: string;
  titles: string;
  position: string;
  image_url?: string;
  public_id?: String;
}) {
  try {
    await connectDB();
    const official = await BarangayOfficialModel.create({
      name,
      titles,
      position,
      image_url,
      public_id,
    });
    return official;
  } catch (error) {
    throw error;
  }
}

export async function deleteBarangayOfficial(id: string){
  try {
    await connectDB();
    const deleteOfficial = await BarangayOfficialModel.findByIdAndDelete(id);
    return deleteOfficial;
  } catch (error) {
    throw error;
  }
}

export async function getBarangayOfficials() {
  try {
    await connectDB();
    const officials = await BarangayOfficialModel.aggregate([
      {
        $lookup: {
          from: "barangayofficialpositions",
          localField: "position",
          foreignField: "_id",
          as: "positionData",
        },
      },
      {
        $unwind: {
          path: "$positionData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$positionData.order",
          items: { $push: "$$ROOT" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    return officials;
  } catch (error) {
    throw error;
  }
}

export async function updateBarangayOfficial({
  name,
  titles,
  position,
  image_url,
  public_id,
  id
}: {
  name: string;
  titles: string;
  position: string;
  image_url?: string;
  public_id?: String;
  id: string
}){
  try {
    await connectDB();
    const official = await BarangayOfficialModel.findByIdAndUpdate(id,{
      name,
      titles,
      position,
      image_url,
      public_id,
    });
    return official;
  } catch (error) {
    throw error;
  }
}