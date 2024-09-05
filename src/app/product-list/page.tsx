import Container from "@/components/Container";
import type { CollectionType } from "@/components/Gallery";
import { Product } from "@/components/ProductCard/product.types";
import ProductList from "@/components/ProductList";
import ProductsHero from "@/components/ProductsHero/ProductsHero";
import SectionTitle from '@/components/shared/SectionTitle/index';
import { getCategory, getDrops, getProducts } from "@/services/products";
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

interface CollectionWithProducts extends CollectionType {
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

  console.log('products by drop: ', products)

  return (
       <main
        data-cursor-exclusion 
        data-cursor-size="30px"
        data-cursor-text=""
       >
        {collection && drop && <ProductsHero title={drop.title} image={getImage(drop.image)}/>}
        {!collection && <ProductsHero title={'All Products'} image={'/images/background.jpg'}/>}
        <Container>
          <ProductList products={products} />
        </Container>      
     </main>
  );
}
