import HeroCarousel from "@/Components/HeroCarousel";
import Category from "@/Components/Category";
import FeaturedProducts from "@/Components/FeaturedProducts";
import PromoBanner from "@/Components/PromoBanner";
import BrandsSection from "@/Components/BrandSection";
// import BrandsSection from "@/Components/BrandsSection";


export default function Home() {
  return (
    <>
      {/* Full-width hero carousel */}
      <div className="relative left-1/2 -mt-6 w-screen -translate-x-1/2">
        <h1 className="sr-only">
          TechCart: smartphones, laptops, tablets and accessories
        </h1>
        <HeroCarousel />
      </div>

      <Category />
      <FeaturedProducts />
      <PromoBanner />
      <BrandsSection />
      {/* <BrandsSection /> */}
     
    </>
  );
}