export interface Product {
  id: number;

  description: string;
  image: string;
  title: string;
  price: string;
  country: string;
  fulfillmentTime: string;
  colors: string[]; // hex color valu
  selectedColor: string;
  brand: string;
  onColorSelect?: (color: string) => void;
}