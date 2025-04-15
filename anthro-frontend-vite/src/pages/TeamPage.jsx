import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageTransition from "../components/PageTransition";
import Header from "../components/Header";
import Footer from "../components/Footer";

import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function TeamPage() {
  const contentRef = useRef(null);
  const contentWrapperRef = useRef(null);

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

  return (
    <PageTransition>
      <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
        {/* Header */}
        <Header contentRef={contentRef} />

        {/* Content */}
        <div ref={contentWrapperRef} className="pt-32 pb-20 min-h-screen">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h1 className="team-title text-5xl md:text-6xl font-serif mb-6 text-amber-200">
                About the Team
              </h1>
              <p className="team-subtitle text-xl md:text-2xl mb-12 text-gray-300">
                Meet the creators behind Al Makān
              </p>

              <div className="space-y-12">
                <p className="text-lg text-gray-300">
                  Al Makān was created by a team of interdisciplinary
                  researchers, designers, and developers passionate about
                  exploring the relationship between humans and their
                  environment. Our diverse backgrounds in architecture,
                  environmental studies, digital humanities, and interactive
                  design inform our approach to this project.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Team Member 1 */}
                  <div className="team-member bg-gray-900 rounded-lg overflow-hidden shadow-xl">
                    <div className="h-64 overflow-hidden">
                      <img
                        src={img3}
                        alt="Team Member 1"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-medium text-amber-300 mb-2">
                        Marzia Balzani
                      </h3>
                      <p className="text-amber-200 mb-3">Project Lead</p>
                      <p className="text-gray-300">
                        Marzia Balzani is a social anthropologist. Her
                        publications have focused in particular on ritual and
                        kingship among the social and political elites of
                        Rajasthan in northern India, and she is currently
                        working on diasporic Islam in the UK and Pakistan.
                        Balzani’s work combines ethnography and history and is
                        at present extending into considerations of
                        globalization and urban space.
                      </p>
                    </div>
                  </div>

                  {/* Team Member 2 */}
                  <div className="team-member bg-gray-900 rounded-lg overflow-hidden shadow-xl">
                    <div className="h-64 overflow-hidden">
                      <img
                        src={img4}
                        alt="Team Member 2"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-medium text-amber-300 mb-2">
                        Fiona Kidd
                      </h3>
                      <p className="text-amber-200 mb-3">Project Lead</p>
                      <p className="text-gray-300">
                        Fiona Kidd is an Assistant Professor of History and Art
                        and Art History at New York University Abu Dhabi. She
                        teaches in the history, art and art history, and ancient
                        world programs, with a special focus on Central Asia.
                        She has been involved in archaeological, museum-based,
                        and archival research in Central Asia for almost 20
                        years.
                      </p>
                    </div>
                  </div>

                  {/* Team Member 3 */}
                  {/* <div className="team-member bg-gray-900 rounded-lg overflow-hidden shadow-xl">
                    <div className="h-64 overflow-hidden">
                      <img
                        src="/src/assets/img5.jpg"
                        alt="Team Member 3"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-medium text-amber-300 mb-2">
                        Aisha Hassan
                      </h3>
                      <p className="text-amber-200 mb-3">
                        Cultural Anthropologist
                      </p>
                      <p className="text-gray-300">
                        Aisha's work explores how cultural practices and beliefs
                        shape our relationship with the environment. Her
                        fieldwork in various regions has provided valuable
                        insights for this project.
                      </p>
                    </div>
                  </div> */}

                  {/* Team Member 4 */}
                  {/* <div className="team-member bg-gray-900 rounded-lg overflow-hidden shadow-xl">
                    <div className="h-64 overflow-hidden">
                      <img
                        src="/src/assets/img6.jpg"
                        alt="Team Member 4"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-medium text-amber-300 mb-2">
                        Michael Rodriguez
                      </h3>
                      <p className="text-amber-200 mb-3">
                        Visual Artist & Photographer
                      </p>
                      <p className="text-gray-300">
                        Michael's stunning visual work captures the essence of
                        places and their transformation over time. His
                        photography and video work form the visual backbone of
                        the Al Makan experience.
                      </p>
                    </div>
                  </div> */}
                </div>

                <div className="mt-12 text-center">
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
        <Footer />
      </div>
    </PageTransition>
  );
}

export default TeamPage;
