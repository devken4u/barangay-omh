import { getHotlines } from "@/db/hotline/hotline";
import { Hotline } from "@/types";
import HotlineItem from "../_components/HotlineItem";

async function page() {
  const hotlines = JSON.parse(JSON.stringify(await getHotlines()));

  return (
    <div className="mb-4 px-4">
      <h1 className="text-3xl font-bold text-center bg-destructive text-background py-2">
        Hotlines
      </h1>
      {hotlines && hotlines.length < 1 && (
        <p className="text-center py-4 font-semibold">-NO HOTLINES-</p>
      )}
      <div>
        {hotlines.map((hotline: Hotline) => {
          return <HotlineItem hotline={hotline} key={hotline._id} />;
        })}
      </div>
    </div>
  );
}

export default page;
