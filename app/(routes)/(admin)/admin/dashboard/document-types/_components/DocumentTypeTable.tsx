import { getDocumentTypes } from "@/db/documentType/documentType";
import { DocumentType } from "@/types";
import { DataTable } from "../document-types-table/data-table";
import { columns } from "../document-types-table/columns";

async function DocumentTypeTable() {
  const documentTypes: DocumentType[] = await getDocumentTypes();
  const data: DocumentType[] = JSON.parse(JSON.stringify(documentTypes));

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default DocumentTypeTable;
