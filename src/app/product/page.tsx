import ProductDetail from "@/components/ProductDetail/index";

export const metadata = {
  title: "Shopflex",
  description: "Shopflex basic template",
};

export default function Product() {

  return (
      <main 
        data-cursor-exclusion 
        data-cursor-size="30px"
        data-cursor-text=""
      >
        <ProductDetail />
      </main>
  );
}
