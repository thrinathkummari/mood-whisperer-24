import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { BookCard } from "@/components/BookCard";
import { BookFilters } from "@/components/BookFilters";
import { mockBooks } from "@/data/books";
import { Book } from "@/types/product";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const filteredAndSortedBooks = useMemo(() => {
    let filtered = mockBooks;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Genre filter
    if (selectedGenre !== "All") {
      filtered = filtered.filter(book => book.genre === selectedGenre);
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
        case "featured":
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });

    return sorted;
  }, [searchQuery, selectedGenre, sortBy]);

  const featuredBooks = mockBooks.filter(book => book.featured);

  return (
    <div className="min-h-screen bg-gradient-calm">
      <Navbar onSearchChange={setSearchQuery} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        {!searchQuery && selectedGenre === "All" && (
          <section className="py-12 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-wellness bg-clip-text text-transparent">
              Discover Your Next Great Read
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore thousands of books across all genres. From bestsellers to hidden gems, 
              find the perfect story for every moment.
            </p>
          </section>
        )}

        {/* Featured Books */}
        {!searchQuery && selectedGenre === "All" && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Featured Books</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </section>
        )}

        {/* All Books with Filters */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {searchQuery ? `Search Results for "${searchQuery}"` : "All Books"}
            </h2>
            <span className="text-muted-foreground">
              {filteredAndSortedBooks.length} books found
            </span>
          </div>
          
          <BookFilters
            selectedGenre={selectedGenre}
            onGenreChange={setSelectedGenre}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>

          {filteredAndSortedBooks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No books found matching your criteria.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;