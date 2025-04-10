import { DataTable } from "../announcement-table/data-table";
import { columns, Announcement } from "../announcement-table/columns";
import { getAnnouncements } from "@/db/announcement/announcement";

async function AnnouncementTable() {
  const announcements: Announcement[] = await getAnnouncements();
  const data: Announcement[] = JSON.parse(JSON.stringify(announcements));

  return (
    <div className="w-full min-w-full">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default AnnouncementTable;
