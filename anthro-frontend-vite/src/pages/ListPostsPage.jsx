import React, { useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getPostsInSubcategory, getCategory } from "../utils/wp";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";
import { gsap } from "gsap";

function ListPostsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const contentRef = useRef(null);
  const cardsRef = useRef([]);

  // Fetch category info for the title
  const { data: category, isLoading: isCategoryLoading } = useQuery({
    queryKey: ["category", slug],
    queryFn: () => getCategory(slug),
  });

  // Fetch posts in this subcategory
  const { data: posts, isLoading: isPostsLoading } = useQuery({
    queryKey: ["subcategoryPosts", slug],
    queryFn: () => getPostsInSubcategory(slug),
  });

  // Animation for cards
  useEffect(() => {
    if (posts && posts.length > 0 && cardsRef.current.length > 0) {
      gsap.fromTo(
        cardsRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
        }
      );
    }
  }, [posts]);

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
            <button
              onClick={() => navigate(-1)}
              className="text-amber-400 hover:text-amber-300 hover:underline text-sm flex items-center space-x-1 transition-colors duration-200 mb-4"
            >
              <span>←</span>
              <span>Go Back</span>
            </button>
            {isCategoryLoading || isPostsLoading ? (
              <div className="flex justify-center">
                <div className="animate-pulse text-amber-200 text-xl">
                  Loading posts...
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-5xl md:text-6xl font-serif mb-12 text-amber-400 text-center">
                  {category.name}
                </h1>
                <div className="space-y-8">
                  {posts && posts.length > 0 ? (
                    posts.map((post, index) => (
                      <div
                        key={post.id}
                        ref={(el) => (cardsRef.current[index] = el)}
                        className="bg-gray-900 rounded-lg overflow-hidden shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.5)] transition-all duration-300 border border-gray-800"
                      >
                        <Link to={`/post/${post.slug}`} className="block p-6">
                          <h2 className="text-2xl md:text-3xl font-medium text-amber-400 mb-3">
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
                  ) : (
                    <div className="text-center text-gray-300">
                      No posts found for this topic.
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </PageTransition>
  );
}

export default ListPostsPage;
