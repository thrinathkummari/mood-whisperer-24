import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, BookOpen, Search } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { Input } from "@/components/ui/input";

interface NavbarProps {
  onSearchChange?: (query: string) => void;
}

export const Navbar = ({ onSearchChange }: NavbarProps) => {
  const location = useLocation();
  const { cart } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-wellness bg-clip-text text-transparent">
              BookHaven
            </span>
          </Link>

          {/* Search Bar */}
          {location.pathname === "/" && onSearchChange && (
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search books, authors, genres..."
                  className="pl-10"
                  onChange={(e) => onSearchChange(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Cart */}
          <Link to="/cart">
            <Button variant="outline" size="default" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cart.itemCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {cart.itemCount}
                </Badge>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};