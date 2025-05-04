import { columns } from "../_table/columns";
import { DataTable } from "../_table/data-table";
import { Log } from "@/types";
import { getLogs } from "@/db/log/log";

async function LogTable() {
  const logs: Log[] = await getLogs();
  const data: Log[] = JSON.parse(JSON.stringify(logs));

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default LogTable;
