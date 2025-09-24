import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Star, ShoppingCart, ArrowLeft, Plus, Minus } from "lucide-react";
import { mockBooks } from "@/data/books";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const { addToCart, getItemQuantity } = useCart();
  const { toast } = useToast();

  const book = mockBooks.find(b => b.id === id);
  const itemInCart = getItemQuantity(id || "");

  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-calm">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Book Not Found</h1>
            <Link to="/">
              <Button>Return to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(book, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity} ${quantity === 1 ? 'copy' : 'copies'} of "${book.title}" added to your cart.`,
    });
  };

  const relatedBooks = mockBooks
    .filter(b => b.genre === book.genre && b.id !== book.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-calm">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-primary hover:underline mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Books
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Book Image */}
          <div className="relative">
            <img
              src={book.imageUrl}
              alt={book.title}
              className="w-full max-w-md mx-auto lg:max-w-full h-auto rounded-lg shadow-card"
            />
            {book.originalPrice && (
              <Badge variant="destructive" className="absolute top-4 right-4">
                Sale
              </Badge>
            )}
          </div>

          {/* Book Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
              <p className="text-xl text-muted-foreground mb-1">by {book.author}</p>
              <Badge variant="secondary">{book.genre}</Badge>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(book.rating) 
                        ? "fill-warning text-warning" 
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="font-medium">{book.rating}</span>
              <span className="text-muted-foreground">
                ({book.reviewCount.toLocaleString()} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-primary">
                ${book.price.toFixed(2)}
              </span>
              {book.originalPrice && (
                <span className="text-lg line-through text-muted-foreground">
                  ${book.originalPrice.toFixed(2)}
                </span>
              )}
              {book.originalPrice && (
                <Badge className="bg-success text-success-foreground">
                  Save ${(book.originalPrice - book.price).toFixed(2)}
                </Badge>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${book.inStock > 10 ? 'bg-success' : book.inStock > 0 ? 'bg-warning' : 'bg-destructive'}`} />
              <span className="text-sm">
                {book.inStock > 10 ? 'In Stock' : book.inStock > 0 ? `Only ${book.inStock} left` : 'Out of Stock'}
              </span>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 text-center min-w-[3rem]">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.min(book.inStock, quantity + 1))}
                    disabled={quantity >= book.inStock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full" 
                onClick={handleAddToCart}
                disabled={book.inStock === 0}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {itemInCart > 0 ? `Add More (${itemInCart} in cart)` : 'Add to Cart'}
              </Button>
            </div>

            {/* Book Details */}
            <Card>
              <CardContent className="p-6 space-y-3">
                <h3 className="font-semibold text-lg">Book Details</h3>
                <Separator />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">ISBN:</span>
                    <span className="ml-2">{book.isbn}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Pages:</span>
                    <span className="ml-2">{book.pages}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Publisher:</span>
                    <span className="ml-2">{book.publisher}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Published:</span>
                    <span className="ml-2">{new Date(book.publishedDate).getFullYear()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Description */}
        <Card className="mb-12">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-4">Description</h3>
            <p className="text-muted-foreground leading-relaxed">{book.description}</p>
          </CardContent>
        </Card>

        {/* Related Books */}
        {relatedBooks.length > 0 && (
          <section>
            <h3 className="text-2xl font-bold mb-6">More books in {book.genre}</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedBooks.map((relatedBook) => (
                <Link key={relatedBook.id} to={`/book/${relatedBook.id}`}>
                  <Card className="hover:shadow-wellness transition-all duration-300 cursor-pointer">
                    <CardContent className="p-4">
                      <img
                        src={relatedBook.imageUrl}
                        alt={relatedBook.title}
                        className="w-full h-48 object-cover rounded-md mb-3"
                      />
                      <h4 className="font-semibold">{relatedBook.title}</h4>
                      <p className="text-sm text-muted-foreground">{relatedBook.author}</p>
                      <p className="text-primary font-medium">${relatedBook.price.toFixed(2)}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default BookDetail;