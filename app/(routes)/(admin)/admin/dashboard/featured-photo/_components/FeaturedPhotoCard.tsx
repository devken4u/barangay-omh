import { FeaturedPhoto } from "@/types";

export default function FeaturedPhotoCard({
  featuredPhoto,
}: {
  featuredPhoto: FeaturedPhoto;
}) {
  return (
    <div>
      <div className="w-full">
        <img
          src={featuredPhoto.url}
          alt="featured-photo"
          className="size-full object-contain"
        />
      </div>
    </div>
  );
}
