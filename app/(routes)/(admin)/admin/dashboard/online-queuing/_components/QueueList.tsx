import { columns } from "../_table/columns";
import { DataTable } from "../_table/DataTable";
import { getQueues } from "@/db/queue/queue";
import { Queue } from "@/types";

async function QueueList() {
  const queues = await getQueues();
  const data: Queue[] = JSON.parse(JSON.stringify(queues));

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default QueueList;
