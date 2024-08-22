import Container from "@/components/Container/index";
import Gallery from "@/components/Gallery/index";
import Hero from "@/components/Hero/index";
import ProductList from "@/components/ProductList/index";
import { Carousel } from "@/components/shared/Carousel/index";
import SectionTitle from "@/components/shared/SectionTitle/index";
import { PRODUCT_LIST , PRODUCT_LIST_CAROUSEL} from '@/utils/mocks.js'

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
            <Carousel products={PRODUCT_LIST_CAROUSEL}/>
            <SectionTitle text='Most wanted'/>
            <ProductList products={PRODUCT_LIST}/>
          </Container>
        <Gallery />
        <Container>
          <SectionTitle text='Most wanted'/>
          <ProductList products={PRODUCT_LIST}/>
        </Container>
      </main>
  );
}
