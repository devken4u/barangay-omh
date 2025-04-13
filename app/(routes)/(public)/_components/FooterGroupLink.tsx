import { FooterGroupLink as Type } from "../_types/types";

function FooterGroupLink({ footerGroupLinks }: { footerGroupLinks: Type }) {
  return (
    <div>
      <h1 className="font-bold text-xl">{footerGroupLinks.groupName}</h1>
      <div className="flex flex-col items-start">
        {footerGroupLinks.links.map((link) => {
          return (
            <a key={link.key} href={`${link.url}`} className="hover:underline">
              {link.name}
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default FooterGroupLink;
