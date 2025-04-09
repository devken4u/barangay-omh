"use client";

import { Hotline } from "@/types";
import HotlineForm from "./HotlineForm";
import { useOptimistic } from "react";
import HotlineCard from "./HotlineCard";
import { HotlineFormType } from "../_types/hotline";

function HotlineList({ hotlines }: { hotlines: Hotline[] }) {
  const [optimisticHotlines, addOptimisticHotline] = useOptimistic(
    hotlines,
    (state: HotlineFormType[], newHotline: HotlineFormType) => {
      return [...state, newHotline];
    }
  );

  return (
    <div className="flex flex-col gap-4 p-4 pt-0 grow overflow-hidden">
      <div>
        <HotlineForm addOptimisticHotline={addOptimisticHotline} />
      </div>
      <div className="overflow-auto grid [grid-template-columns:repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {optimisticHotlines &&
          optimisticHotlines.map((hotline) => {
            return <HotlineCard key={hotline._id} hotline={hotline} />;
          })}
        {optimisticHotlines.length === 0 && <p>No hotline(s).</p>}
      </div>
    </div>
  );
}

export default HotlineList;
