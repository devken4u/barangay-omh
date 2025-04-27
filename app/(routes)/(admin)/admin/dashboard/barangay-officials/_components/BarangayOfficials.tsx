import { OfficialPosition, Official } from "@/types";
import BarangayOfficialCreate from "./BarangayOfficialCreate";
import { getOfficialPositions } from "@/db/barangayOfficialPosition/barangayOfficialPosition";
import { getBarangayOfficials } from "@/db/barangayOfficial/barangayOfficial";
import BarangayOfficialCard from "./BarangayOfficialCard";

type GroupedType = Official & { positionData: OfficialPosition };

async function BarangayOfficials({ options = false }: { options?: boolean }) {
  const positions: OfficialPosition[] = await getOfficialPositions();
  const data: OfficialPosition[] = JSON.parse(JSON.stringify(positions));

  const officials = await getBarangayOfficials();
  const officialData: {
    _id: string;
    items: GroupedType[];
  }[] = JSON.parse(JSON.stringify(officials));

  return (
    <div>
      {options && <BarangayOfficialCreate positions={data} />}
      <div className="flex gap-2 justify-center sm:hidden my-4">
        <div>
          <img
            src="/caloocan-logo.png"
            alt="caloocan-logo"
            className="size-32"
          />
        </div>
        <div>
          <img
            src="/barangay-174-icon.png"
            alt="barangay-174-logo"
            className="size-32"
          />
        </div>
      </div>
      <div className="flex mb-12 max-w-4xl mx-auto mt-4">
        <div className="hidden sm:block">
          <img
            src="/caloocan-logo.png"
            alt="caloocan-logo"
            className="size-32"
          />
        </div>

        <div className="grow text-center">
          <h1 className="font-inter font-bold text-2xl">
            Republic of the Philippines
          </h1>
          <h2 className=" text-xl font-semibold">CITY OF CALOOCAN</h2>
          <h2 className=" text-xl font-semibold">
            BARANGAY 174, ZONE 15, DISTRICT 1
          </h2>
          <h3 className=" text-lg">CAMARIN CALOOCAN CITY</h3>
        </div>

        <div className="hidden sm:block">
          <img
            src="/barangay-174-icon.png"
            alt="barangay-174-logo"
            className="size-32"
          />
        </div>
      </div>
      <h1 className="font-montserrat font-bold text-center text-2xl">
        SANGGUNIANG BARANGAY 174
      </h1>
      {officialData && officialData.length > 0 && (
        <div className="flex flex-col gap-12">
          {officialData.map((official) => {
            return (
              <div
                key={official._id}
                className="flex gap-8 flex-wrap justify-center p-4 rounded-md "
              >
                {official.items.map((official: GroupedType) => {
                  return (
                    <BarangayOfficialCard
                      official={official}
                      key={official._id}
                      options={options}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BarangayOfficials;
