import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageTransition from "../components/PageTransition";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
        <Header contentRef={contentRef} lightMode={false} />

        {/* Content */}
        <div ref={contentWrapperRef} className="pt-32 pb-20 min-h-screen">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h1 className="about-title text-5xl md:text-6xl font-serif mb-6 text-amber-400">
                About Al Makān
              </h1>
              <p className="about-subtitle text-xl md:text-2xl mb-12 text-amber-200">
                Making Place in the Anthropocene
              </p>

              <div className="space-y-8">
                <p className="about-paragraph text-lg text-gray-300">
                  Al Makān explores the ways in which humans have inhabited,
                  shaped and damaged the planet. Our project is anchored in an
                  unexpected juxtaposition of Anghiari, a mediaeval town in
                  southern Tuscany where there has been human settlement since
                  prehistoric times, and millennia-old sites in Uzbekistan in
                  the desert-steppe region at the interface of the Qyzylqum and
                  Bukhara oasis. Combining anthropology, archaeology and
                  history, our project aims to synthesise the longue durée,
                  modern history and present-day ethnography in order to develop
                  new understandings of and approaches to the Anthropocene.
                </p>

                <p className="about-paragraph text-lg text-gray-300">
                  Our project examines four key themes that define our
                  interaction with the world around us:
                </p>

                <div className="about-paragraph grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                  <div className="bg-gray-900 p-6 rounded-lg shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.5)] transition-all duration-300 border border-gray-800">
                    <h3 className="text-xl font-medium text-amber-400 mb-3">
                      Water
                    </h3>
                    <p className="text-gray-300">
                      Exploring how water shapes landscapes and human
                      settlements, from ancient civilizations to modern cities.
                    </p>
                  </div>

                  <div className="bg-gray-900 p-6 rounded-lg shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.5)] transition-all duration-300 border border-gray-800">
                    <h3 className="text-xl font-medium text-amber-400 mb-3">
                      Materiality
                    </h3>
                    <p className="text-gray-300">
                      Examining the physical substances that define our built
                      environment and their cultural significance.
                    </p>
                  </div>

                  <div className="bg-gray-900 p-6 rounded-lg shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.5)] transition-all duration-300 border border-gray-800">
                    <h3 className="text-xl font-medium text-amber-400 mb-3">
                      Time
                    </h3>
                    <p className="text-gray-300">
                      Investigating how the passage of time transforms places
                      and our perception of them.
                    </p>
                  </div>

                  <div className="bg-gray-900 p-6 rounded-lg shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.5)] transition-all duration-300 border border-gray-800">
                    <h3 className="text-xl font-medium text-amber-400 mb-3">
                      Mobility
                    </h3>
                    <p className="text-gray-300">
                      Understanding how movement and transportation connect us
                      to different places and experiences.
                    </p>
                  </div>
                </div>

                <p className="about-paragraph text-lg text-gray-300">
                  Our project title, al Makān, is taken from the Arabic word for
                  'place' and was chosen in recognition of our institutional
                  location at New York University Abu Dhabi (NYUAD) in the
                  United Arab Emirates. We have been supported in our work by
                  the Arts and Humanities Division at NYUAD. In particular, we
                  wish to thank the dean of the Division, Awam Amkpa, for
                  establishing and funding interdisciplinary research groups and
                  encouraging faculty to work collaboratively across
                  disciplinary boundaries and beyond confines of individual
                  research areas. The opportunities made available by this
                  research initiative have allowed us to discover many
                  unexpected and overlapping research interests and methods in
                  our work as we have explored each other's field sites in Italy
                  and Uzbekistan.
                </p>

                <p className="about-paragraph text-lg text-gray-300">
                  We hope you will enjoy exploring our website and sharing with
                  us some of the sights, sounds, people, stories and histories
                  that we encountered and recorded.
                </p>

                <div>
                  <p className="about-paragraph text-lg text-gray-300">
                    Marzia Balzani, anthropologist
                  </p>
                  <p className="about-paragraph text-lg text-gray-300">
                    Fiona Kidd, archaeologist
                  </p>
                </div>

                <div className="about-paragraph mt-12 text-center">
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

export default AboutPage;
