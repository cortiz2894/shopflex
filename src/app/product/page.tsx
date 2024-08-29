import ProductDetail from "@/components/ProductDetail/index";

export const metadata = {
  title: "Shopflex",
  description: "Shopflex basic template",
};

export default function Product() {

  return (
      <main data-cursor-exclusion>
        <ProductDetail />
      </main>
  );
}
