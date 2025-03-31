import Barangay174Logo from "@/components/logo/Barangay174Logo";
import Link from "next/link";

export default function PublicHeader() {
  return (
    // header wrapper
    <div className="p-4">
      {/* header */}
      <div className="bg-primary p-4 rounded-md shadow-md">
        {/* icon and barangay name */}
        <div className="flex gap-2 items-center">
          <Barangay174Logo size={60} />
          <h1 className="text-xl font-bold text-background">
            Barangay 174 Operations and Monitoring Hub
          </h1>
        </div>
        {/* login buttons */}
        <Link
          href=""
          className="bg-background text-primary p-2 rounded-full font-semibold"
        >
          LOGIN
        </Link>
      </div>
    </div>
  );
}
