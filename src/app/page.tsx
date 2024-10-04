import Container from '@/components/Container/index';
import Gallery from '@/components/Gallery/index';
import Hero from '@/components/Hero/index';
import { Carousel } from '@/components/shared/Carousel/index';
import SectionTitle from '@/components/shared/SectionTitle/index';
import { getCategory, getProducts } from '@/services/products.js';

export const metadata = {
  title: 'Shopflex',
  description: 'Shopflex basic template',
};

export default async function Home() {
  const products = await getProducts();
  const categories = await getCategory();

  return (
    <main>
      <Hero />
      {categories.map((category: any) => {
        return (
          <Container key={category.id}>
            <SectionTitle text={category.title} />
            <Carousel products={category.products} />
          </Container>
        );
      })}
      <Gallery />
      <Container>
        <SectionTitle text="All products" />
        <Carousel products={products} />
      </Container>
    </main>
  );
}
