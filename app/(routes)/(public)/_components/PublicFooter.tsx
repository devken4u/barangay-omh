import { Separator } from "@/components/ui/separator";
import FooterGroupLink from "./FooterGroupLink";
import { FooterGroupLink as Type } from "../_types/types";
import { v4 as uuidv4 } from "uuid";

function PublicFooter() {
  const footerGroupLinkLinks: Type = {
    groupName: "Links",
    links: [
      { name: "Home", url: "/", key: uuidv4() },
      { name: "Announcements", url: "/announcements", key: uuidv4() },
      { name: "About", url: "/about", key: uuidv4() },
      { name: "Barangay Officials", url: "/barangay-officials", key: uuidv4() },
      { name: "Hotlines", url: "/hotlines", key: uuidv4() },
    ],
  };

  const footerGroupLinkServices: Type = {
    groupName: "Services",
    links: [{ name: "Job Board", url: "/", key: uuidv4() }],
  };

  return (
    <footer className="bg-primary text-background p-8">
      <div className="grid grid-cols-3">
        <h1 className="text-3xl font-bold">BARANGAY 174 OMH</h1>
        <FooterGroupLink footerGroupLinks={footerGroupLinkLinks} />
        <FooterGroupLink footerGroupLinks={footerGroupLinkServices} />
      </div>
      <Separator className="my-8" />
      <h2 className="text-center font-semibold">
        Barangay 174 Operations And Monitoring Hub &copy;2025
      </h2>
    </footer>
  );
}

export default PublicFooter;
