import ProductDetail from "@/components/ProductDetail/index";
import { PageProps } from "@/interfaces/page.interface";
import { getProduct } from "@/services/products";

export const metadata = {
  title: "Shopflex",
  description: "Shopflex basic template",
};

export default async function Product({ params }:PageProps) {
  
  const product = await getProduct(params.slug)

  return (
      <main 
        data-cursor-exclusion 
        data-cursor-size="30px"
        data-cursor-text=""
      >
        {/* @ts-ignore */}
        <ProductDetail product={product}/>
      </main>
  );
}
