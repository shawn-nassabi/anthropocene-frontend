import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageTransition from "../components/PageTransition";
import Header from "../components/Header";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function AboutPage() {
  const contentRef = useRef(null);
  const contentWrapperRef = useRef(null);

  useEffect(() => {
    // Content animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      ".about-title",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
      .fromTo(
        ".about-subtitle",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      )
      .fromTo(
        ".about-paragraph",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2 },
        "-=0.4"
      );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <PageTransition>
      <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
        {/* Header */}
        <Header contentRef={contentRef} />

        {/* Content */}
        <div ref={contentWrapperRef} className="pt-32 pb-20 min-h-screen">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h1 className="about-title text-5xl md:text-6xl font-serif mb-6 text-amber-400">
                About Al Makan
              </h1>
              <p className="about-subtitle text-xl md:text-2xl mb-12 text-gray-300">
                A journey through place, time, and human experience
              </p>

              <div className="space-y-8">
                <p className="about-paragraph text-lg text-gray-300">
                  Al Makan is an immersive digital experience that explores the
                  profound relationship between humans and their environment.
                  The name "Al Makan" translates to "The Place" in Arabic,
                  reflecting our focus on the significance of location and space
                  in shaping human experience.
                </p>

                <p className="about-paragraph text-lg text-gray-300">
                  Our project examines four key themes that define our
                  interaction with the world around us:
                </p>

                <div className="about-paragraph grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                  <div className="bg-gray-900 p-6 rounded-lg">
                    <h3 className="text-xl font-medium text-amber-300 mb-3">
                      Water
                    </h3>
                    <p className="text-gray-300">
                      Exploring how water shapes landscapes and human
                      settlements, from ancient civilizations to modern cities.
                    </p>
                  </div>

                  <div className="bg-gray-900 p-6 rounded-lg">
                    <h3 className="text-xl font-medium text-amber-300 mb-3">
                      Materiality
                    </h3>
                    <p className="text-gray-300">
                      Examining the physical substances that define our built
                      environment and their cultural significance.
                    </p>
                  </div>

                  <div className="bg-gray-900 p-6 rounded-lg">
                    <h3 className="text-xl font-medium text-amber-300 mb-3">
                      Time
                    </h3>
                    <p className="text-gray-300">
                      Investigating how the passage of time transforms places
                      and our perception of them.
                    </p>
                  </div>

                  <div className="bg-gray-900 p-6 rounded-lg">
                    <h3 className="text-xl font-medium text-amber-300 mb-3">
                      Mobility
                    </h3>
                    <p className="text-gray-300">
                      Understanding how movement and transportation connect us
                      to different places and experiences.
                    </p>
                  </div>
                </div>

                <p className="about-paragraph text-lg text-gray-300">
                  Through interactive experiences and visual storytelling, Al
                  Makan invites visitors to explore these themes and consider
                  their own relationship with the places they inhabit. Each
                  section of our project offers a unique perspective on how
                  environment shapes human experience and vice versa.
                </p>

                <p className="about-paragraph text-lg text-gray-300">
                  We believe that by understanding the complex interplay between
                  humans and their environment, we can develop a deeper
                  appreciation for the places we call home and the stories they
                  tell.
                </p>

                <div className="about-paragraph mt-12 text-center">
                  <Link
                    to="/spinningindex"
                    className="inline-block px-5 py-2 bg-transparent outline-1 text-white text-lg font-medium rounded-4xl hover:bg-amber-700 transition-colors duration-300 transform"
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
        <footer className="py-8 bg-black border-t border-gray-800">
          <div className="container mx-auto px-6 text-center text-gray-500">
            <p>© {new Date().getFullYear()} Al Makan. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
}

export default AboutPage;
