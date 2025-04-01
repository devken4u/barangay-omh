"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SquareMenu } from "lucide-react";
import { useState } from "react";

export default function NavigationLinks() {
  const [isNavigationLinksOpen, setIsNavigationLinksOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsNavigationLinksOpen((prev) => !prev)}
        className="hover:bg-background hover:text-primary cursor-pointer bg-transparent text-background rounded-full size-8 flex items-center justify-center"
      >
        <SquareMenu className="size-6" />
      </button>
      <div
        className={cn(
          "absolute top-full left-0 w-full bg-primary overflow-hidden transition-[max-height] px-8 rounded-b-md",
          isNavigationLinksOpen ? "max-h-[5000px]" : "max-h-0"
        )}
      >
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum nisi,
        reprehenderit cumque magnam repellat harum fugit quisquam ipsa maiores
        natus error, molestiae ut perspiciatis explicabo officia eius corrupti
        sequi blanditiis magni saepe expedita rem mollitia, sint facere? Minus
        tempore dolore veritatis, necessitatibus officiis ipsa vel quos aperiam
        sit eius excepturi nemo eum officia deleniti tenetur vitae mollitia ad
        quidem quaerat accusantium amet rerum ea veniam accusamus. Quibusdam,
        acclaceat, voluptatum laboriosam! Hic maiores reiciendis et, eligendi
        distinctio necessitatibus sapiente sequi debitis. Odio sapiente maiores
        autem nesciunt earum quis, iure reiciendis voluptatum sint possimus quo
        aliquid modi, magnam temporibus ducimus facere velit explicabo maxime
        architecto ratione hic eius voluptate. Repudiandae accusantium odio
        explicabo deserunt commodi cumque ipsam quasi! Tenetur reprehenderit
        nulla sint ex illo eveniet optio voluptate odio magnam nobis blanditiis
        ad, quasi, earum, libero ipsum. Sint ipsum impedit quas dicta
        aspernatur. Quibusdam ab laboriosam suscipit inventore quaerat provident
        ratione mollitia nesciunt sint. Vel fugit aperiam beatae, reiciendis rem
        omnis assumenda dicta nihil ratione suscipit, error corrupti. Dolores
        quibusdam nisi nesciunt magni eum quaerat dolore laboriosam illo impedit
        debitis, commodi nostrum excepturi voluptas consequatur velit soluta
        ullam sequi doloribus et quisquam, asperiores omnis earum porro. Iste
      </div>
    </div>
  );
}
