import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageTransition from "../components/PageTransition";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useQuery } from "@tanstack/react-query";
import { getTeamMembers } from "../utils/wp";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function TeamPage() {
  const contentRef = useRef(null);
  const contentWrapperRef = useRef(null);
  const [expandedMember, setExpandedMember] = useState(null);

  const { data: teamMembers, isLoading } = useQuery({
    queryKey: ["teamMembers"],
    queryFn: getTeamMembers,
  });

  useEffect(() => {
    // Content animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      ".team-title",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
      .fromTo(
        ".team-subtitle",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      )
      .fromTo(
        ".team-member",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2 },
        "-=0.4"
      );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Function to get excerpt from content
  const getExcerpt = (content, maxLength = 200) => {
    if (!content) return "";

    // Create a temporary div to parse HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;

    // Get the first paragraph
    const firstParagraph = tempDiv.querySelector("p");
    if (!firstParagraph) return "";

    // Get the text content and remove the period
    return firstParagraph.textContent.replace(/\.$/, "").trim();
  };

  return (
    <PageTransition>
      <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
        {/* Header */}
        <Header contentRef={contentRef} lightMode={false} />

        {/* Content */}
        <div ref={contentWrapperRef} className="pt-32 pb-20 min-h-screen">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h1 className="team-title text-5xl md:text-6xl font-serif mb-6 text-amber-400">
                About the Team
              </h1>
              <p className="team-subtitle text-xl md:text-2xl mb-12 text-amber-200">
                Meet the creators behind Al Makān
              </p>

              <div className="space-y-12">
                <p className="text-lg text-gray-300"></p>

                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mx-auto"></div>
                    <p className="mt-4 text-gray-400">
                      Loading team members...
                    </p>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {teamMembers?.map((member) => (
                      <div
                        key={member.id}
                        className="team-member bg-gray-900 rounded-lg overflow-hidden shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_20px_rgba(251,191,36,0.5)] transition-shadow duration-300 border border-gray-800"
                      >
                        <div className="p-6">
                          <h3 className="text-2xl font-medium text-amber-400 mb-2">
                            {member.title.rendered}
                          </h3>
                          <div className="text-gray-300">
                            {expandedMember === member.id ? (
                              <div
                                className="mb-4"
                                dangerouslySetInnerHTML={{
                                  __html: member.content.rendered,
                                }}
                              />
                            ) : (
                              <p className="mb-4 line-clamp-1 text-amber-200">
                                {getExcerpt(member.content.rendered)}
                              </p>
                            )}
                            <button
                              onClick={() =>
                                setExpandedMember(
                                  expandedMember === member.id
                                    ? null
                                    : member.id
                                )
                              }
                              className="text-amber-400 hover:text-amber-300 transition-colors duration-200"
                            >
                              {expandedMember === member.id
                                ? "Show Less"
                                : "Read More"}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-12 text-center">
                  <Link
                    to="/spinningindex"
                    className="inline-block px-5 py-2 bg-transparent border border-amber-400 text-amber-400 text-lg font-medium rounded-4xl hover:bg-amber-400 hover:text-black transition-colors duration-300 transform"
                  >
                    Explore the Project
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content wrapper for header scroll effect */}
        <div ref={contentRef} className="w-full h-full"></div>

        {/* Footer */}
        <Footer />
      </div>
    </PageTransition>
  );
}

export default TeamPage;
