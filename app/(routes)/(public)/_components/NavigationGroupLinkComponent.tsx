import { NavigationGroupLink } from "../_types/types";

function NavigationGroupLinkComponent({
  navigationGroupLink,
}: {
  navigationGroupLink: NavigationGroupLink;
}) {
  return (
    <div className="my-4">
      <h1 className="font-bold text-xl mb-2">
        {navigationGroupLink.groupName}
      </h1>
      <div className="flex gap-2 flex-wrap">
        {navigationGroupLink.links.map((link) => {
          return (
            <a
              key={link.key}
              href={`${link.url}`}
              className="flex items-center gap-2 p-2 border rounded-md hover:text-primary hover:bg-background"
            >
              <link.icon />
              {link.name}
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default NavigationGroupLinkComponent;
