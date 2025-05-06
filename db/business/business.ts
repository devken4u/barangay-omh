import BusinessModel from "../models/business";
import { connectDB } from "../connection/connection";

export async function createBusinessRequest({
  business_name,
  business_address,
  business_contact,
  business_description,
  created_by,
}: {
  business_name: string;
  business_address: string;
  business_contact: string;
  business_description: string;
  created_by: string;
}) {
  try {
    await connectDB();
    const business = await BusinessModel.create({
      business_name,
      business_address,
      business_contact,
      business_description,
      created_by,
    });

    return business;
  } catch (error) {
    throw error;
  }
}

export async function getUserBusinesses(email: string) {
  try {
    await connectDB();
    const businesses = await BusinessModel.find({
      created_by: email,
    }).sort({
      createdAt: "desc",
    });
    return businesses;
  } catch (error) {
    throw error;
  }
}

export async function closeBusiness(id: string) {
  try {
    await connectDB();
    const business = await BusinessModel.findByIdAndUpdate(id, {
      is_closed: true,
    });
    return business;
  } catch (error) {
    throw error;
  }
}

export async function openBusiness(id: string) {
  try {
    await connectDB();
    const business = await BusinessModel.findByIdAndUpdate(id, {
      is_closed: false,
    });
    return business;
  } catch (error) {
    throw error;
  }
}

export async function deleteBusiness(id: string) {
  try {
    await connectDB();
    const business = await BusinessModel.findByIdAndDelete(id);
    return business;
  } catch (error) {
    throw error;
  }
}
