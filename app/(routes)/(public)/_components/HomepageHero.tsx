import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

function HomepageHero() {
  return (
    <div className="shadow-md">
      <div className="relative w-full h-[40rem]">
        <div className="absolute top-0 left-0 size-full bg-black/40 z-10 px-2">
          <h1 className="text-center text-background font-bold text-3xl sm:text-5xl py-20">
            Serving the Community with Excellence and Care
          </h1>
          <h2 className="text-center text-background sm:text-3xl font-semibold text-xl">
            Highlights the unity and collective efforts of the barangay
            <br />
            towards development and providing essential services.
          </h2>
          <div className="flex justify-center mt-20">
            <a href="#text">
              <Button className="font-bold animate-bounce">
                EXPLORE <ArrowRight />
              </Button>
            </a>
          </div>
        </div>
        <Image
          priority={true}
          src="/brgy-featured-photo-1.jpg"
          alt="brgy-174-image"
          fill={true}
          className="object-cover object-center"
        />
      </div>
    </div>
  );
}

export default HomepageHero;
