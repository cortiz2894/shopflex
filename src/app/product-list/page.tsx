import Container from "@/components/Container";
import type { CollectionType } from "@/components/Gallery";
import { Product } from "@/components/ProductCard/product.types";
import ProductList from "@/components/ProductList";
import SectionTitle from '@/components/shared/SectionTitle/index';
import { getCategory, getDrops, getProducts } from "@/services/products";

export const metadata = {
  title: "Shopflex",
  description: "Shopflex basic template",
};

interface SearchParams {
  collection?: string;
}

interface ProductListPageProps {
  searchParams: SearchParams;
}

interface CollectionWithProducts extends CollectionType {
  products: Product[]
}

export default async function ProductListPage({ searchParams }: ProductListPageProps) {

  console.log('searchParams:  ', searchParams)
 const collection = searchParams.collection || null;
 let products = [];

  if (collection) {
    const drops = await getDrops(collection);

    products = drops.flatMap((drop:CollectionWithProducts) => drop.products || []);
  } else {
    products = await getProducts();
  }

  console.log('products by drop: ', products)

  return (
       <main
        data-cursor-exclusion 
        data-cursor-size="30px"
        data-cursor-text=""
        className="pt-20"
       >
        <Container>
          <SectionTitle text={'Products'}/>
          <ProductList products={products} />
        </Container>      
     </main>
  );
}
