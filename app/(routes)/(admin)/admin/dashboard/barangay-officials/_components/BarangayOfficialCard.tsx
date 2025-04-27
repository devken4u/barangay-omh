import { CircleHelp } from "lucide-react";
import { Official, OfficialPosition } from "@/types";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Popover } from "@/components/ui/popover";
import BarangayOfficialDelete from "./BarangayOfficialDelete";
import BarangayOfficialEdit from "./BarangayOfficialEdit";
import { getOfficialPositions } from "@/db/barangayOfficialPosition/barangayOfficialPosition";

type GroupedType = Official & { positionData: OfficialPosition };

export default async function BarangayOfficialCard({
  official,
  options = false,
}: {
  official: GroupedType;
  options?: boolean;
}) {
  const positions: OfficialPosition[] = await getOfficialPositions();
  const data: OfficialPosition[] = JSON.parse(JSON.stringify(positions));

  return (
    <div className="max-w-64 w-64 p-4 border-2 shadow-md bg-white relative">
      <div className="absolute top-2 left-2 flex gap-2 items-start z-50">
        <Popover>
          <PopoverTrigger>
            <CircleHelp className="size-6 text-gray-medium" />
          </PopoverTrigger>
          <PopoverContent className="bg-background text-sm">
            {official.titles || "No Titles"}
          </PopoverContent>
        </Popover>
      </div>

      {options && (
        <div className="absolute top-2 right-2 flex gap-2">
          <BarangayOfficialEdit official={official} positions={data} />
          <BarangayOfficialDelete official={official as Official} />
        </div>
      )}
      <div className="h-72 w-full">
        {official.image_url ? (
          <img
            src={official.image_url}
            className="w-full h-full object-contain"
          />
        ) : (
          <img
            src="/person-placeholder.jpg"
            className="w-full h-full object-contain"
          />
        )}
      </div>
      <div className="flex flex-col items-center">
        <p className="text-center font-montserrat font-bold text-lg">
          {official.name}
        </p>
        <p className="text-center text-sm bg-accent-orange-base text-off-white font-semibold px-4 rounded-full">
          {official.positionData?.title
            ? official.positionData.title
            : "No Title"}
        </p>
      </div>
    </div>
  );
}
