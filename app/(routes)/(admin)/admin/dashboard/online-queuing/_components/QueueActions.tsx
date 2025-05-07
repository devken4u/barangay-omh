import { Queue } from "@/types";
import QueueDelete from "./QueueDelete";

function QueueActions({ row }: { row: Queue }) {
  return (
    <div>
      <QueueDelete row={row} />
    </div>
  );
}

export default QueueActions;
