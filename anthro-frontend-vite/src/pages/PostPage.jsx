import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getSubtopicPost } from "../utils/wp";
import PageTransition from "../components/PageTransition";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect } from "react";

export default function PostPage() {
  const { topic } = useParams(); // 'ritual', 'mobility-labor', etc.
  const navigate = useNavigate(); // For back button

  const { data: post, isLoading } = useQuery({
    queryKey: ["subtopicPost", topic],
    queryFn: () => getSubtopicPost(topic),
  });

  // Add styling to links after content is loaded
  useEffect(() => {
    if (post) {
      // Find all links within the article and style them
      const articleLinks = document.querySelectorAll(".post-content a");
      articleLinks.forEach((link) => {
        link.classList.add(
          "text-amber-400",
          "underline",
          "hover:text-amber-300",
          "transition-colors",
          "duration-200"
        );
      });
    }
  }, [post]);

  if (isLoading) {
    return (
      <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
        <Header lightMode={false} />
        <div className="pt-32 pb-20 min-h-screen">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="animate-pulse text-amber-400 text-2xl font-serif">
                Loading Article
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

  if (!post) return <div className="p-12 text-gray-300">Loading…</div>;

  return (
    <PageTransition>
      <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
        <Header lightMode={false} />

        <div className="pt-24 pb-20 min-h-screen">
          <div className="container mx-auto px-6">
            <div className="">
              <button
                onClick={() => navigate(-1)}
                className="text-amber-400 hover:text-amber-300 hover:underline text-sm flex items-center space-x-1 transition-colors duration-200"
              >
                <span>←</span>
                <span>Go Back</span>
              </button>
            </div>
            <div className="max-w-4xl mx-auto">
              <h1
                className="text-5xl md:text-6xl font-serif mb-6 text-amber-400"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
              <article
                className="post-content space-y-8 text-lg text-gray-300"
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              />
              <style jsx global>{`
                .post-content a {
                  color: #fbbf24; /* amber-400 */
                  text-decoration: underline;
                  transition: color 0.2s;
                }
                .post-content a:hover {
                  color: #fcd34d; /* amber-300 */
                }
                .post-content img {
                  max-width: 100%;
                  height: auto;
                  margin: 1.5rem 0;
                  border-radius: 0.25rem;
                  box-shadow: 0 0 15px rgba(251, 191, 36, 0.3);
                }
                .post-content ul,
                .post-content ol {
                  padding-left: 1.5rem;
                  margin: 1rem 0;
                }
                .post-content li {
                  margin-bottom: 0.5rem;
                }
              `}</style>
              {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                <img
                  className="mt-8 rounded shadow-[0_0_15px_rgba(251,191,36,0.3)]"
                  src={post._embedded["wp:featuredmedia"][0].source_url}
                  alt={post.title.rendered}
                />
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </PageTransition>
  );
}
