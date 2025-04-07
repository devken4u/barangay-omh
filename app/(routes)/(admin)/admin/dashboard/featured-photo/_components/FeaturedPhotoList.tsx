import { getFeaturedPhotos } from "@/db/featuredPhoto/featuredPhoto";
import { FeaturedPhoto } from "@/types";
import FeaturedPhotoCard from "./FeaturedPhotoCard";

export async function FeaturedPhotoList() {
  const featuredPhotos: FeaturedPhoto[] | null = await getFeaturedPhotos();

  return (
    <div className="grid [grid-template-columns:repeat(auto-fill,minmax(250px,1fr))] gap-4">
      {featuredPhotos &&
        featuredPhotos.map((featuredPhoto) => {
          return (
            <FeaturedPhotoCard
              featuredPhoto={featuredPhoto}
              key={featuredPhoto._id}
            />
          );
        })}
    </div>
  );
}

export default FeaturedPhotoList;
