import { X } from "@phosphor-icons/react";
import styles from "./styles.module.scss";
import { motion } from "framer-motion";
import { SidebarItem } from "./SidebarItem";

interface SidebarProps {
  productsCart: ProductCart[];
  setProductsCart: (productsCart: ProductCart[]) => void;
  handleCloseSidebar: () => void;
}
export const Sidebar = ({
  handleCloseSidebar,
  productsCart,
  setProductsCart,
}: SidebarProps) => {
  const calculateTotalPrice = (cart: ProductCart[]) => {
    const totalPrice = cart.reduce((total, currentItem) => {
      return total + currentItem.amount * currentItem.price;
    }, 0);

    return totalPrice;
  };

  const totalPrice = calculateTotalPrice(productsCart);

  const handleDeleteProduct = (product: ProductCart) => {
    const filteredProducts = productsCart.filter(
      (productCart) => productCart.id !== product.id
    );
    setProductsCart(filteredProducts);
  };

  const handleChangeProductAmount = ({
    product,
    type,
  }: {
    product: ProductCart;
    type: "increase" | "decrease";
  }) => {
    const updatedCart = productsCart.map((item) => {
      if (item.id === product.id) {
        return type === "increase"
          ? { ...item, amount: item.amount + 1 }
          : { ...item, amount: Math.max(1, item.amount - 1) };
      }
      return item;
    });

    setProductsCart(updatedCart);
  };

  return (
    <motion.div
      animate={{ width: 486 }}
      initial={{ width: 0 }}
      exit={{ width: 0 }}
      className={styles.sidebarContainer}
    >
      <header>
        <span>Carrinho de Compras</span>
        <X onClick={handleCloseSidebar} size={20} />
      </header>
      <main>
        {productsCart.map((product) => (
          <SidebarItem
            handleChangeProductAmount={(type) => {
              handleChangeProductAmount({ product, type });
            }}
            productCart={product}
            handleDeleteProduct={() => handleDeleteProduct(product)}
            key={product.id}
            {...product}
          />
        ))}
      </main>
      <footer>
        <div>
          <span>Total:</span>
          <span>R${totalPrice}</span>
        </div>
        <button>Finalizar Compra</button>
      </footer>
    </motion.div>
  );
};
