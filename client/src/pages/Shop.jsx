import ProductCard from "../components/ProductCard";
import Nav from "../components/Nav";
import { useSelector } from "react-redux";

import useCart from "../hooks/useCart";

const Shop = () => {
  const { addToCart } = useCart();
  const products = useSelector((state) => state.products);

  return (
    <section>
      <Nav />

      <div>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <header>
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Popular Products
            </h2>
          </header>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex rounded border border-gray-100"></div>

            <div>
              <label htmlFor="SortBy" className="sr-only">
                SortBy
              </label>
            </div>
          </div>

          <ul className="mt-4 grid gap-4  sd:grid-cols-2 lg:grid-cols-3 md:grid-cols-2">
            {products.map((product) => (
              <div key={product.id}>
                <ProductCard
                  name={product.name}
                  price={product.price}
                  id={product.id}
                  image={product.image}
                  addToCart={() =>
                    addToCart(
                      product.id,
                      product.name,
                      product.price,
                      product.image
                    )
                  }
                />
              </div>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Shop;
