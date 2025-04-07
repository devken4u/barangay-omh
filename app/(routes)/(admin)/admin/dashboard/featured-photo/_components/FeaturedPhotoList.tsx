import { getFeaturedPhotos } from "@/db/featuredPhoto/featuredPhoto";
import { FeaturedPhoto } from "@/types";

export async function FeaturedPhotoList() {
  const featuredPhotos: FeaturedPhoto[] | null = await getFeaturedPhotos();

  return (
    <div>
      {featuredPhotos &&
        featuredPhotos.map((featuredPhoto) => {
          return (
            <img
              src={featuredPhoto.url}
              alt=""
              key={featuredPhoto._id}
              className="w-[300px] h-[150px]"
            />
          );
        })}
    </div>
  );
}

export default FeaturedPhotoList;
