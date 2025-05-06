import { getUserBusinesses } from "@/db/business/business";
import { auth } from "@/auth";
import { Business } from "@/types";
import BusinessCard from "./BusinessCard";

async function BusinessList() {
  const session = await auth();
  const businesses = await getUserBusinesses(session?.user.email!);
  const data: Business[] = JSON.parse(JSON.stringify(businesses));

  return (
    <div>
      {data.length > 0 && (
        <div className="grid [grid-template-columns:repeat(auto-fill,minmax(300px,1fr))] gap-4">
          {data.map((business) => {
            return <BusinessCard key={business._id} business={business} />;
          })}
        </div>
      )}
    </div>
  );
}

export default BusinessList;
