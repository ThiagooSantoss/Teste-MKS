interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: number;
}

interface ProductCart extends Product {
  amount: number;
}
