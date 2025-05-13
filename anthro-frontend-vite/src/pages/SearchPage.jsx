import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { searchPosts } from "../utils/wp";
import PageTransition from "../components/PageTransition";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const contentRef = useRef(null);
  const cardsRef = useRef([]);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch search results
  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: () => searchPosts(debouncedQuery),
    enabled: debouncedQuery.length > 0,
  });

  // Animation for search results
  useEffect(() => {
    if (
      searchResults &&
      searchResults.length > 0 &&
      cardsRef.current.length > 0
    ) {
      gsap.fromTo(
        cardsRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
        }
      );
    }
  }, [searchResults]);

  // Function to clean HTML from rendered title
  const cleanTitle = (html) => {
    if (!html) return "";
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  // Function to get excerpt from content
  const getExcerpt = (content, maxLength = 150) => {
    if (!content) return "";
    const doc = new DOMParser().parseFromString(content, "text/html");
    const text = doc.body.textContent || "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <PageTransition>
      <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
        <Header lightMode={false} contentRef={contentRef} />

        <div className="pt-32 pb-20 min-h-screen" ref={contentRef}>
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-serif mb-8 text-amber-400 text-center">
                Al Makān Search
              </h1>

              {/* Search Input */}
              <div className="relative mb-12">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full px-6 py-4 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all duration-200 shadow-[0_0_15px_rgba(251,191,36,0.1)]"
                />
                {isLoading && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-amber-400"></div>
                  </div>
                )}
              </div>

              {/* Search Results */}
              <div className="space-y-6">
                {searchQuery.length === 0 ? (
                  <div className="text-center text-gray-400">
                    Enter a search term to find articles
                  </div>
                ) : isLoading ? (
                  <div className="text-center text-gray-400">Searching...</div>
                ) : searchResults?.length === 0 ? (
                  <div className="text-center text-gray-400">
                    No results found for "{debouncedQuery}"
                  </div>
                ) : (
                  searchResults?.map((post, index) => (
                    <div
                      key={post.id}
                      ref={(el) => (cardsRef.current[index] = el)}
                      className="bg-gray-900 rounded-lg overflow-hidden shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.5)] transition-all duration-300 border border-gray-800"
                    >
                      <Link to={`/post/${post.slug}`} className="block p-6">
                        <h2 className="text-2xl font-medium text-amber-400 mb-3">
                          {cleanTitle(post.title.rendered)}
                        </h2>
                        <p className="text-gray-300">
                          {getExcerpt(post.excerpt.rendered)}
                        </p>
                        <div className="mt-4 text-right">
                          <span className="text-amber-300 hover:text-amber-200 transition-colors">
                            Read full article →
                          </span>
                        </div>
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </PageTransition>
  );
}

export default SearchPage;
