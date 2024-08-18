import Container from "@/components/Container/index";
import Gallery from "@/components/Gallery/index";
import Hero from "@/components/Hero/index";
import ProductList from "@/components/ProductList/index";
import { Carousel } from "@/components/shared/Carousel/index";
import SectionTitle from "@/components/shared/SectionTitle/index";
import Transition from "@/components/shared/Transition/index";

export const metadata = {
  title: "Shopflex",
  description: "Shopflex basic template",
};

export default function Home() {

  return (
      <main>
        <Hero />
          <Container>
            <SectionTitle text='Drops of the month'/>
            <Carousel />
            <SectionTitle text='Most wanted'/>
            <ProductList />
          </Container>
        <Gallery />
        <Container>
          <SectionTitle text='Most wanted'/>
          <Carousel />
          <SectionTitle text='Most wanted'/>
          <ProductList />
          <SectionTitle text='Carousel culero'/>
            <ProductList />
        </Container>
      </main>
  );
}
