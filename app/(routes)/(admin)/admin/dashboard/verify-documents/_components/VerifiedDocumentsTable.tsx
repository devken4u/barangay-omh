import { getVerifiedDocuments } from "@/db/verifiedDocument/verifiedDocument";
import { DataTable } from "../_table/data-table";
import { VerifiedDocument } from "@/types";
import { columns } from "../_table/columns";

async function VerifiedDocumentsTable() {
  const verifiedDocuments: VerifiedDocument[] = await getVerifiedDocuments();
  const data: VerifiedDocument[] = JSON.parse(
    JSON.stringify(verifiedDocuments)
  );

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default VerifiedDocumentsTable;
