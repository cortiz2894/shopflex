import Hero from "@/components/Hero/Hero";
import ProductList from "@/components/ProductList/index";

export default function Home() {

  return (
    <main>
      <Hero />
      <div className="flex justify-center my-20">
        <ProductList />
      </div>
    </main>
  );
}
