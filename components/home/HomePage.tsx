import { HeroSection } from "@/components/home/HeroSection";
import { PlayPathNav } from "@/components/home/PlayPathNav";
import { NewArrivalsSection } from "@/components/home/NewArrivalsSection";
import { ShopByAgeSection } from "@/components/home/ShopByAgeSection";
import { FavoritesSection } from "@/components/home/FavoritesSection";
import { ImaginativePlayEditorial } from "@/components/home/ImaginativePlayEditorial";
import { PlushFriendsSection } from "@/components/home/PlushFriendsSection";
import { BuildDiscoverBento } from "@/components/home/BuildDiscoverBento";
import { CreativeStudioSection } from "@/components/home/CreativeStudioSection";
import { PlayStyleSection } from "@/components/home/PlayStyleSection";
import { GameNightSection } from "@/components/home/GameNightSection";
import { OutdoorPanorama } from "@/components/home/OutdoorPanorama";
import { GiftFinder } from "@/components/home/GiftFinder";
import { GiftsByPrice } from "@/components/home/GiftsByPrice";
import { WhySunnyBunny } from "@/components/home/WhySunnyBunny";
import { ProductSafetyTeaser } from "@/components/home/ProductSafetyTeaser";
import { JournalTeaser } from "@/components/home/JournalTeaser";
import { NewsletterSignup } from "@/components/home/NewsletterSignup";
import { EditorialMosaic } from "@/components/home/EditorialMosaic";

export function HomePage() {
  return (
    <div className="play-surface flex-1">
      <HeroSection />
      <PlayPathNav />
      <NewArrivalsSection />
      <ShopByAgeSection />
      <FavoritesSection />
      <ImaginativePlayEditorial />
      <PlushFriendsSection />
      <BuildDiscoverBento />
      <CreativeStudioSection />
      <PlayStyleSection />
      <GameNightSection />
      <OutdoorPanorama />
      <GiftFinder />
      <GiftsByPrice />
      <WhySunnyBunny />
      <ProductSafetyTeaser />
      <JournalTeaser />
      <NewsletterSignup />
      <EditorialMosaic />
    </div>
  );
}
