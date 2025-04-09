import { HotlineFormType } from "../_types/hotline";
import HotlineEditForm from "./HotlineEditForm";
import HotlineDelete from "./HotlineDelete";

function HotlineCard({ hotline }: { hotline: HotlineFormType }) {
  return (
    <div className="border border-primary rounded-md p-4 space-y-2 shadow-md">
      <div className="flex justify-end gap-2">
        <HotlineDelete _id={hotline._id} />
        <HotlineEditForm hotline={hotline} />
      </div>
      <p className="font-bold truncate">{hotline.label}</p>
      <p className="bg-secondary p-2 rounded-md font-semibold">
        {hotline.number}
      </p>
    </div>
  );
}

export default HotlineCard;
