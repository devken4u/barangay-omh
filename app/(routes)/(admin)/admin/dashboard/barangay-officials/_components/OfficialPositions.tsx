import BarangayOfficialPositionCreate from "./BarangayOfficialCreate";
import { columns } from "../_table/columns";
import { DataTable } from "../_table/data-table";
import { getOfficialPositions } from "@/db/barangayOfficialPosition/barangayOfficialPosition";
import { OfficialPosition } from "@/types";

async function OfficialPositions() {
  const positions: OfficialPosition[] = await getOfficialPositions();
  const data: OfficialPosition[] = JSON.parse(JSON.stringify(positions));

  return (
    <div>
      <BarangayOfficialPositionCreate />
      <div className="py-4">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}

export default OfficialPositions;
