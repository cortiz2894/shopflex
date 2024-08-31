import Container from "@/components/Container/index";
import Gallery from "@/components/Gallery/index";
import Hero from "@/components/Hero/index";
import ProductList from "@/components/ProductList/index";
import { Carousel } from "@/components/shared/Carousel/index";
import SectionTitle from "@/components/shared/SectionTitle/index";
import { getProducts } from "@/services/products.js";

export const metadata = {
  title: "Shopflex",
  description: "Shopflex basic template",
};

export default async function Home() {
  const products = await getProducts()
  return (
      <main>
        <Hero />
          <Container>
            <SectionTitle text='Drops of the month'/>
            <Carousel products={products}/>
            <SectionTitle text='Most wanted'/>
            <ProductList products={products}/>
          </Container>
        <Gallery />
        <Container>
          <SectionTitle text='Most wanted'/>
          <ProductList products={products}/>
        </Container>
      </main>
  );
}
