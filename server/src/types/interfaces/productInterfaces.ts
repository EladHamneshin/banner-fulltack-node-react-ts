interface Product {
  id: string;
  name: string;
  saleprice: number;
  quantity: number;
  description: string;
  category: string;
  discount: number;
  rating: number;
  click: number;
  image_url: string;
  image_alt: string;
  longitude: number;
  latitude: number;
  tags: {
    [key: string]: string;
  };
}


interface Category {
  id: string;
  name: string;
  clicked: number;
};

export { Product, Category };

