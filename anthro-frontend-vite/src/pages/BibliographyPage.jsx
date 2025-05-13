import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getTopicPage } from "../utils/wp";
import PageTransition from "../components/PageTransition";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function BibliographyPage() {
  const contentRef = useRef(null);
  const navigate = useNavigate();

  const { data: page, isLoading } = useQuery({
    queryKey: ["bibliography"],
    queryFn: () => getTopicPage("bibliography"),
  });

  useEffect(() => {
    // Content animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      ".bibliography-title",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    ).fromTo(
      ".bibliography-content",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.6"
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  if (isLoading) {
    return (
      <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
        <Header lightMode={false} />
        <div className="pt-32 pb-20 min-h-screen">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="animate-pulse text-amber-400 text-2xl font-serif">
                Loading Bibliography
              </div>
              <div className="flex space-x-2">
                <div
                  className="w-3 h-3 bg-amber-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-3 h-3 bg-amber-400 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-3 h-3 bg-amber-400 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
            <div className="max-w-4xl mx-auto">
              <h1 className="bibliography-title text-5xl md:text-6xl font-serif mb-8 text-amber-400">
                Bibliography
              </h1>
              <div
                className="bibliography-content prose prose-invert prose-amber max-w-none"
                dangerouslySetInnerHTML={{ __html: page?.content?.rendered }}
              />
              <style jsx global>{`
                .prose a {
                  color: #fbbf24; /* amber-400 */
                  text-decoration: underline;
                  transition: color 0.2s;
                }
                .prose a:hover {
                  color: #fcd34d; /* amber-300 */
                }
                .prose ul,
                .prose ol {
                  color: #d1d5db; /* gray-300 */
                }
                .prose li {
                  margin-bottom: 0.5rem;
                }
              `}</style>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </PageTransition>
  );
}

export default BibliographyPage;
