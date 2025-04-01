import CurrentTime from "./CurrentTime";
import NavigationLinks from "./NavigationLinks";
import Barangay174Logo from "@/components/logo/Barangay174Logo";
import AuthButton from "./AuthButton";

export default async function PublicHeader() {
  return (
    <div className="p-4">
      <div className="bg-primary p-4 shadow-md flex items-center justify-between relative rounded-md">
        <div className="flex gap-2 items-center">
          <Barangay174Logo size={60} />
          <h1 className="text-xl font-bold text-background">
            Barangay 174 Operations and Monitoring Hub
          </h1>
        </div>
        <CurrentTime />
        <div className="flex gap-2 items-center">
          <AuthButton />
          <NavigationLinks />
        </div>
      </div>
    </div>
  );
}
