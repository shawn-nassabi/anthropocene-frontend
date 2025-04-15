import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageTransition from "../components/PageTransition";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Hero section animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      titleRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2 }
    )
      .fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.8"
      )
      .fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      )
      .fromTo(
        scrollIndicatorRef.current,
        { y: 0, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.4"
      );

    // Scroll indicator animation
    gsap.to(scrollIndicatorRef.current, {
      y: 10,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "power1.inOut",
    });

    // About section animations
    const aboutTl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    aboutTl
      .fromTo(
        ".about-image",
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2 }
      )
      .fromTo(
        ".about-text",
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2 },
        "-=0.8"
      );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <PageTransition>
      <div
        ref={contentRef}
        className="relative w-full min-h-screen bg-black text-white overflow-auto"
      >
        {/* Header */}
        <Header contentRef={contentRef} />

        {/* Hero Section */}
        <section
          ref={heroRef}
          className="h-screen w-full flex items-center justify-center relative"
        >
          <div className="absolute inset-0 z-0">
            <img
              className="w-full h-full object-cover opacity-50"
              src="/src/assets/davinci.png"
              alt="Al Makan Background"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30"></div>
          </div>

          <div className="container mx-auto px-6 text-center z-10">
            <h1
              ref={titleRef}
              className="text-7xl md:text-9xl font-serif mb-6 text-white"
            >
              المكان
            </h1>
            <h1
              ref={titleRef}
              className="text-7xl md:text-9xl font-serif mb-6 text-white"
            >
              Al Makān
            </h1>
            <p
              ref={subtitleRef}
              className="text-xl md:text-2xl mb-12 text-amber-400 max-w-2xl mx-auto"
            >
              Making Place in the Anthropocene
            </p>
            <Link
              ref={ctaRef}
              to="/spinningindex"
              className="inline-block px-5 py-2 bg-transparent outline-1 text-white text-lg font-medium rounded-4xl hover:bg-amber-700 transition-colors duration-300 transform"
            >
              Enter
            </Link>
          </div>

          {/* <div
            ref={scrollIndicatorRef}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
          >
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
            </div>
          </div> */}
        </section>

        {/* About Section */}
        {/* <section
          ref={aboutRef}
          className="py-20 bg-black relative overflow-hidden"
        >
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="about-image">
                <img
                  src="/src/assets/italytower.jpg"
                  alt="About Al Makan"
                  className="w-full h-auto rounded-lg shadow-xl"
                />
              </div>
              <div className="about-text">
                <h2 className="text-4xl font-serif mb-6 text-amber-200">
                  About Al Makan
                </h2>
                <p className="text-lg mb-6 text-gray-300">
                  Al Makan is an immersive exploration of place and its profound
                  impact on human experience. Through a series of interactive
                  experiences, we invite you to journey through different
                  landscapes, each representing a unique aspect of our
                  relationship with the environment.
                </p>
                <p className="text-lg mb-6 text-gray-300">
                  From the flowing waters that shape our landscapes to the
                  materials that define our built environment, from the passage
                  of time that transforms our surroundings to the mobility that
                  connects us to new places—each element offers a window into
                  the complex interplay between humans and their environment.
                </p>
                <p className="text-lg text-gray-300">
                  Join us on this journey of discovery, where each interaction
                  reveals new perspectives on the places we inhabit and the
                  stories they tell.
                </p>
              </div>
            </div>
          </div>
        </section> */}

        {/* Footer */}
        <Footer />
      </div>
    </PageTransition>
  );
}

export default HomePage;
