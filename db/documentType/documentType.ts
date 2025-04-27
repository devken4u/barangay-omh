import { connectDB } from "../connection/connection";
import DocumentTypeModel from "../models/documentType";

export async function createDocumentType({ name }: { name: string }) {
  try {
    await connectDB();
    const documentType = await DocumentTypeModel.create({
      name,
    });
    return documentType;
  } catch (error) {
    throw error;
  }
}

export async function editDocumentType({
  name,
  id,
}: {
  name: string;
  id: string;
}) {
  try {
    await connectDB();
    const documentType = DocumentTypeModel.findByIdAndUpdate(id, {
      name,
    });
    return documentType;
  } catch (error) {
    throw error;
  }
}

export async function getDocumentTypes() {
  try {
    const documentTypes = await DocumentTypeModel.find();
    return documentTypes;
  } catch (error) {
    throw error;
  }
}

export async function setDocumentStatus({
  status,
  id,
}: {
  status: boolean;
  id: string;
}) {
  try {
    await connectDB();
    const documentType = DocumentTypeModel.findByIdAndUpdate(id, {
      is_disabled: status,
    });
    return documentType;
  } catch (error) {
    throw error;
  }
}
