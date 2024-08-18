import ProductDetail from "@/components/ProductDetail/index";
import Transition from "@/components/shared/Transition/index";

export const metadata = {
  title: "Shopflex",
  description: "Shopflex basic template",
};

export default function Product() {

  return (
    <Transition>
        <main>
					<ProductDetail />
        </main>
    </Transition>
  );
}
