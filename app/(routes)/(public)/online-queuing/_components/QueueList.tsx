"use client";

import { getQueuesAction } from "@/app/actions/queue";
import { columns } from "../_table/columns";
import { DataTable } from "../_table/DataTable";
import { Queue } from "@/types";
import { useActionState, startTransition, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

function QueueList() {
  const [state, action, isPending] = useActionState(async () => {
    const queues = await getQueuesAction();
    return queues;
  }, null);

  const [data, setData] = useState<Queue[] | null>();

  useEffect(() => {
    startTransition(() => {
      action();
    });
  }, []);

  useEffect(() => {
    if (state) {
      setData(state);
    }
  }, [state]);

  return (
    <div className="space-y-4">
      <Button
        onClick={() => {
          startTransition(() => {
            action();
          });
        }}
      >
        Refresh
      </Button>
      {isPending && <Loader className="animate-spin" />}
      {data && <DataTable columns={columns} data={data} />}
    </div>
  );
}

export default QueueList;
