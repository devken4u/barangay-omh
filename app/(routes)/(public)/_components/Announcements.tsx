import { getAnnouncements } from "@/db/announcement/announcement";
import { formateDateV1 } from "@/lib/utils";
import { Announcement } from "@/types";

async function Announcements() {
  const announcements = JSON.parse(
    JSON.stringify(await getAnnouncements({ limit: 10 }))
  );

  return (
    <div className="border border-primary rounded-md mb-4">
      <h1 className="text-3xl font-bold text-center bg-primary text-background py-2">
        Announcements
      </h1>
      <div className="p-4 space-y-4">
        {announcements.map((announcement: Announcement) => {
          return (
            <p
              key={announcement._id}
              className="font-semibold underline hover:bg-primary/30 p-2 rounded-md cursor-pointer"
            >
              <span className="text-red-500">*</span>
              {announcement.description}{" "}
              <span className="text-red-500 animate-pulse">
                ({formateDateV1(announcement.createdAt)})
              </span>
            </p>
          );
        })}
      </div>
      <a
        href="/announcements"
        target="_blank"
        className="p-2 hover:bg-primary hover:text-background block text-center font-bold"
      >
        See All Announcements...
      </a>
    </div>
  );
}

export default Announcements;
