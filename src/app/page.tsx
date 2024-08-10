import Container from "@/components/Container/index";
import Hero from "@/components/Hero/index";
import ProductList from "@/components/ProductList/index";
import SectionTitle from "@/components/shared/SectionTitle/index";
import Loader from "@/components/shared/Loader/index";

export default function Home() {

  return (
    <main>
      <Hero />
      <div className="flex justify-center my-10">
        <Container>
          <SectionTitle text='Drops of the month'/>
          <ProductList />
          <SectionTitle text='Most wanted'/>
          <ProductList />
        </Container>
      </div>
      <Loader />
    </main>
  );
}
