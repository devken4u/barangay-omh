import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type FooterGroupLink = {
  groupName: string;
  links: {
    url: string;
    key: string;
    name: string;
  }[];
};

export type NavigationGroupLink = {
  groupName: string;
  links: {
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
    url: string;
    key: string;
    name: string;
  }[];
};
