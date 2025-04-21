import Announcements from "./_components/Announcements";
import FeaturedPhotos from "./_components/FeaturedPhotos";
import HomepageHero from "./_components/HomepageHero";
import Hotlines from "./_components/Hotlines";

function HomePage() {
  return (
    <div className="space-y-4">
      <HomepageHero />
      <div className="px-8 grid grid-cols-2 gap-2">
        <Hotlines />
        <Announcements />
      </div>
    </div>
  );
}

export default HomePage;
