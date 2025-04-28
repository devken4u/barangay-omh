import { connectDB } from "../connection/connection";
import VerifiedDocumentModel from "../models/verifiedDocument";

export async function createVerifiedDocument({
  owner_name,
  document_type,
  remarks,
  verified_by,
}: {
  owner_name: string;
  document_type: string;
  remarks: string;
  verified_by: string;
}) {
  try {
    await connectDB();
    const verifiedDocument = await VerifiedDocumentModel.create({
      owner_name,
      document_type,
      remarks,
      verified_by,
    });
    return verifiedDocument;
  } catch (error) {
    throw error;
  }
}
