export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  imageUrl: string;
  isbn: string;
  pages: number;
  publisher: string;
  publishedDate: string;
  inStock: number;
  featured?: boolean;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}