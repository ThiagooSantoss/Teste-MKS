import { ShoppingBagOpen } from "@phosphor-icons/react";
import styles from "./styles.module.scss";

interface ProductCardProps {
  product: Product;
  handleAddToCart: ( ) => void;
}
export const ProductCard = ({ handleAddToCart, product }: ProductCardProps) => {
  const {name,price,description} = product
  return (
    <div className={styles.cardContainer}>
      <div>
        <span>{name}</span>
        <span>{price}</span>
      </div>
      <span>{description}</span>
      <button onClick={handleAddToCart}>
        <ShoppingBagOpen size={14} />
        <span>Comprar</span>
      </button>
    </div>
  );
};
