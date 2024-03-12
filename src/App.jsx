import React, { useState } from "react";
import { searchChunks } from "./apiClient";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Earthen Bottle",
    href: "#",
    price: "$48",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 2,
    name: "Nomad Tumbler",
    href: "#",
    price: "$35",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
  },
  {
    id: 3,
    name: "Focus Paper Refill",
    href: "#",
    price: "$89",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg",
    imageAlt:
      "Person using a pen to cross a task off a productivity paper card.",
  },
  {
    id: 4,
    name: "Machined Mechanical Pencil",
    href: "#",
    price: "$35",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  {
    id: 5,
    name: "Pancake",
    href: "#",
    price: "$3500",
    imageSrc: "Pancake.jpeg",
    imageAlt: "yum yum",
  },
  //  More products...
];

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false); // New state to track search status

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setIsSearching(true); // Indicate search start
    try {
      const results = await searchChunks(searchTerm);
      setSearchResults(results.score_chunks || []); // Assuming the API returns an object with a `score_chunks` array
    } catch (error) {
      console.error("Failed to fetch search results:", error);
      setSearchResults([]); // Reset search results on error
    } finally {
      setIsSearching(false); // Indicate search end
    }
  };

  return (
    <>
      <div className="navbar bg-base-100 w-full">
        {/* Navbar content */}
        <div className="flex-1 flex justify-center">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              className="input input-bordered flex-1 max-w-md" // Adjusted width for responsiveness
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSearching}
            >
              {isSearching ? "Searching..." : "Search"}
            </button>
          </form>
        </div>
      </div>

      {/* Search Results Section */}
      {searchTerm.trim() !== "" && (
        <div className="search-results mt-8">
          {searchResults.length > 0 ? (
            <div className="mx-auto px-4 py-8 lg:max-w-7xl">
              {/* Results rendering */}
            </div>
          ) : (
            !isSearching && (
              <p className="text-center text-lg mt-4">
                No results found for "{searchTerm}".
              </p>
            )
          )}
        </div>
      )}

      {/* Shop Section */}

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <a key={product.id} href={product.href} className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {product.price}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
