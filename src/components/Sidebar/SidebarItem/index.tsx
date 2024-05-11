import { X } from "@phosphor-icons/react";
import styles from "./styles.module.scss";

interface SidebarItemProps {
  productCart: ProductCart;
  handleDeleteProduct: () => void;
  handleChangeProductAmount: (type: "increase" | "decrease") => void;
}

export const SidebarItem = ({
  handleDeleteProduct,
  productCart,
  handleChangeProductAmount,
}: SidebarItemProps) => {
  const { amount, name, price } = productCart;
  return (
    <div className={styles.sidebarItemContainer}>
      <span>{name}</span>
      <div>
        <label>Qtd:</label>
        <div>
          <button onClick={() => handleChangeProductAmount("decrease")}>
            -
          </button>
          <span>{amount}</span>
          <button onClick={() => handleChangeProductAmount("increase")}>
            +
          </button>
        </div>
      </div>
      <span>R${price}</span>

      <X onClick={handleDeleteProduct} size={18} />
    </div>
  );
};
