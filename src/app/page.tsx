import Container from "@/components/Container/index";
import Hero from "@/components/Hero/Hero";
import ProductList from "@/components/ProductList/index";
import Title from "@/components/Title/index";

export default function Home() {

  return (
    <main>
      <Hero />
      <div className="flex justify-center my-10">
        <Container>
          <Title text='Drops of the month'/>
          <ProductList />
        </Container>
      </div>
    </main>
  );
}
