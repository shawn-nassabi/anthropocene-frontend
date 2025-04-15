import { useRef, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function Header({ contentRef }) {
  const headerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // Header animation on scroll
    const header = headerRef.current;
    if (header && contentRef && contentRef.current) {
      // Set initial background
      gsap.set(header, {
        backgroundColor: "rgba(0, 0, 0, 0)",
      });

      // Create the scroll animation
      ScrollTrigger.create({
        trigger: contentRef.current,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(header, {
            backgroundColor: `rgba(0, 0, 0, ${progress * 0.8})`,
            duration: 0.1,
          });
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [contentRef]);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center text-white">
        <Link to="/" className="text-2xl font-serif">
          Al Makan
        </Link>
        <nav>
          <ul className="flex space-x-8">
            <li>
              <Link
                to="/about"
                className={`transition-colors duration-300 ${
                  location.pathname === "/about"
                    ? "text-amber-400 hover:text-amber-300"
                    : "text-white hover:text-amber-400"
                }`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/team"
                className={`transition-colors duration-300 ${
                  location.pathname === "/team"
                    ? "text-amber-400 hover:text-amber-300"
                    : "text-white hover:text-amber-400"
                }`}
              >
                About the Team
              </Link>
            </li>
            <li>
              <Link
                to="/spinningindex"
                className={`transition-colors duration-300 ${
                  location.pathname === "/spinningindex"
                    ? "text-amber-400 hover:text-amber-300"
                    : "text-white hover:text-amber-400"
                }`}
              >
                Explore
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
