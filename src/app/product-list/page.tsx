import Container from "@/components/Container";
import type { CollectionType } from "@/components/Gallery";
import { Product } from "@/interfaces/products.interface";
import ProductList from "@/components/ProductList";
import ProductsHero from "@/components/ProductsHero/ProductsHero";
import { getDrops, getProducts } from "@/services/products";
import { getImage } from '@/services/products'

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

export interface CollectionWithProducts extends CollectionType {
  products: Product[]
}

export default async function ProductListPage({ searchParams }: ProductListPageProps) {

 const collection = searchParams.collection || null;
 let products = [];
 let drop = null;

  if (collection) {
    const drops:CollectionWithProducts[] = await getDrops(collection);
    drop = drops.length > 0 ? drops[0] : null;

    products = drops.flatMap((drop) => drop.products || []);
  } else {
    products = await getProducts();
  }

  return (
       <main>
        {collection && drop && <ProductsHero title={drop.title} image={getImage(drop.image)}/>}
        {!collection && <ProductsHero title={'All Products'} image={'/images/background.jpg'}/>}
        <Container>
          <ProductList products={products} />
        </Container>      
     </main>
  );
}
