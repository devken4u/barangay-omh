import { getFeaturedPhotos } from "@/db/featuredPhoto/featuredPhoto";
import { FeaturedPhoto } from "@/types";
import FeaturedPhotoCard from "./FeaturedPhotoCard";

export async function FeaturedPhotoList() {
  const featuredPhotos = await getFeaturedPhotos();
  const data: FeaturedPhoto[] = JSON.parse(JSON.stringify(featuredPhotos));

  return (
    <div className="grid [grid-template-columns:repeat(auto-fill,minmax(250px,1fr))] gap-4">
      {data &&
        data.map((featuredPhoto) => {
          return (
            <FeaturedPhotoCard
              featuredPhoto={featuredPhoto}
              key={featuredPhoto._id as string}
            />
          );
        })}
      {data.length === 0 && <p>No featured photo(s).</p>}
    </div>
  );
}

export default FeaturedPhotoList;
