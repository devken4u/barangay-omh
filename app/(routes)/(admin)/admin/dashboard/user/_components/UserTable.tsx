import { DataTable } from "../_table/DataTable";
import { columns } from "../_table/columns";
import { User } from "@/types";
import { getUsers } from "@/db/user/user";

async function UserTable() {
  const users: User[] = await getUsers();
  const data: User[] = JSON.parse(JSON.stringify(users));
  return (
    <div className="px-4">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default UserTable;
