export type Category = string;

export type Product = {
  _id?: string;
  id?: string;
  name: string;
  category: Category;
  originalPrice: number;
  discountPercent: number;
  images: string[];
  description: string;
  material: string;
  sku: string;
  inStock: boolean;
  featured?: boolean;
  newArrival?: boolean;
};

export type Offer = {
  _id?: string;
  id?: string;
  title: string;
  type: "Festival Offer" | "Limited Time" | "New Arrival";
  discountPercent: number;
  description: string;
  cta: string;
};

export type EnquiryInput = {
  name: string;
  phone: string;
  email: string;
  message: string;
  productId?: string;
};

export type ProductInput = Omit<Product, "id" | "_id"> & {
  id?: string;
};
