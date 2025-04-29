import { getVerifiedDocumentById } from "@/db/verifiedDocument/verifiedDocument";
import { VerifiedDocument } from "@/types";
import { formatDateV2 } from "@/lib/utils";
import mongoose from "mongoose";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const isValid = mongoose.Types.ObjectId.isValid(id);

  if (isValid) {
    const verifiedDocument: VerifiedDocument = await getVerifiedDocumentById(
      id
    );
    return (
      <div className="flex justify-center mb-4">
        <div>
          <h1 className="text-green-500 font-bold text-3xl mb-4">
            THIS DOCUMENT IS VERIFIED
          </h1>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-bold">Document owner</p>
              <p className="p-2 border rounded-md border-primary">
                {verifiedDocument.owner_name}
              </p>
            </div>
            <div>
              <p className="text-sm font-bold">Document type</p>
              <p className="p-2 border rounded-md border-primary">
                {verifiedDocument.document_type}
              </p>
            </div>
            <div>
              <p className="text-sm font-bold">Verification Date</p>
              <p className="p-2 border rounded-md border-primary">
                {formatDateV2(verifiedDocument.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center mb-4">
        <div>
          <h1 className="text-red-500 font-bold text-3xl mb-4">
            INVALID DOCUMENT ID
          </h1>
        </div>
      </div>
    );
  }
}

export default page;
