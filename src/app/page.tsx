"use client";
import { useProducts } from "@/hooks/useProducts";
import styles from "./styles.module.scss";
import { ShoppingCart } from "@phosphor-icons/react";
import { ProductCard } from "@/components/ProductCard/index";
import { Sidebar } from "@/components/Sidebar";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const { data } = useProducts({
    page: 1,
    rows: 5,
    sortBy: "id",
    orderBy: "ASC",
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [productsCart, setProductsCart] = useState<ProductCart[]>([]);

  const handleAddToCart = (product: Product) => {
    const foundProduct = productsCart.find(
      (productCart) => productCart.id === product.id
    );
    if (!foundProduct) {
      setProductsCart([...productsCart, { ...product, amount: 1 }]);
    } else {
      const updatedCart = productsCart.map((productCart) => {
        if (productCart.id === product.id) {
          return { ...productCart, amount: productCart.amount + 1 };
        }
        return productCart;
      });

      setProductsCart(updatedCart);
    }
  };
  return (
    <div className={styles.pageContainer}>
      <header>
        <div>
          <div className={styles.nome}>
            <h1>MKS</h1>
            <h6>Sistemas</h6>
          </div>

          <button
            onClick={() => setIsSidebarOpen(true)}
            className={styles.carrinho}
          >
            <ShoppingCart size={18} />
            <span>{productsCart.length}</span>
          </button>
        </div>
      </header>
      <main>
        {data.map((product) => (
          <ProductCard
            handleAddToCart={() => handleAddToCart(product)}
            key={product.id}
            product={product}
          />
        ))}
      </main>
      <footer>
        <span>MKS sistemas © Todos os direitos reservados</span>
      </footer>
      <AnimatePresence>
        {isSidebarOpen && (
          <Sidebar
            productsCart={productsCart}
            setProductsCart={setProductsCart}
            handleCloseSidebar={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
