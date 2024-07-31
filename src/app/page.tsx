import Hero from "@/components/Hero/Hero";
import ProductCard from "@/components/ProductCard/index";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="flex justify-center my-20">
        <div className="w-[90%] flex gap-12">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>

      </div>
    </main>
  );
}
