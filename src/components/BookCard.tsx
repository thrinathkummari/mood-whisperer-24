import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";
import { Book } from "@/types/product";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";

interface BookCardProps {
  book: Book;
}

export const BookCard = ({ book }: BookCardProps) => {
  const { addToCart, getItemQuantity } = useCart();
  const { toast } = useToast();
  const itemQuantity = getItemQuantity(book.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(book);
    toast({
      title: "Added to cart",
      description: `${book.title} has been added to your cart.`,
    });
  };

  return (
    <Link to={`/book/${book.id}`}>
      <Card className="h-full hover:shadow-wellness transition-all duration-300 cursor-pointer group">
        <CardContent className="p-4">
          <div className="relative mb-4">
            <img
              src={book.imageUrl}
              alt={book.title}
              className="w-full h-64 object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
            />
            {book.originalPrice && (
              <Badge variant="destructive" className="absolute top-2 right-2">
                Sale
              </Badge>
            )}
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
              {book.title}
            </h3>
            <p className="text-muted-foreground">{book.author}</p>
            <Badge variant="secondary" className="text-xs">
              {book.genre}
            </Badge>
            
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(book.rating) 
                        ? "fill-warning text-warning" 
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({book.reviewCount.toLocaleString()})
              </span>
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-primary">
                  ${book.price.toFixed(2)}
                </span>
                {book.originalPrice && (
                  <span className="text-sm line-through text-muted-foreground">
                    ${book.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              
              <Button
                size="sm"
                onClick={handleAddToCart}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                {itemQuantity > 0 ? `In Cart (${itemQuantity})` : "Add to Cart"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};