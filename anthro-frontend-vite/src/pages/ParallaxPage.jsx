import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Link, useLocation, useParams } from "react-router";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageTransition from "../components/PageTransition";

import image1 from "../assets/img1.jpg";
import image2 from "../assets/img2.jpg";
import image3 from "../assets/img3.jpg";
import Header from "../components/Header";
import { useQuery } from "@tanstack/react-query";
import { getTopicPage, getPageImages } from "../utils/wp";

const FRAME_COUNTS = {
  water: 90,
  materiality: 0,
  time: 79,
  mobility: 86,
};

// Sample topics
const topics = [
  {
    id: "water",
    title: "Water",
    description: "Explore the vital role of water in our ecosystems.",
    // Optionally add other data such as an image URL if different from the parallax background
    link: "/post/water",
  },
  {
    id: "materiality",
    title: "Materiality",
    description: "Dive into the essence of materiality in design and nature.",
    link: "/post/materiality",
  },
  {
    id: "time",
    title: "Time",
    description: "Discover how time shapes our understanding of the world.",
    link: "/post/time",
  },
  {
    id: "mobility",
    title: "Mobility",
    description: "Learn about the shifts in mobility and social movement.",
    link: "/post/mobility",
  },
];

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Constants for frame animation
// const TOTAL_FRAMES = 96; // Total number of frames (96 frames from 001 to 096)
// const FRAME_PATH = "/mountain_8s_frames/frame_"; // Path to frames in public folder

function ParallaxPage() {
  const containerRef = useRef(null);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [parsedImageMetadata, setParsedImageMetadata] = useState([]);
  const frameImageRef = useRef(null);
  const preloadedImagesRef = useRef({});
  const { topic } = useParams();
  const FRAME_PATH = `/frames/${topic}/frame_`; // Path to frames in public folder
  const TOTAL_FRAMES = FRAME_COUNTS[topic] || 96; // fallback if topic is unknown

  const { data: topicPage } = useQuery({
    queryKey: ["topicPage", topic],
    queryFn: () => getTopicPage(topic),
  });

  const { data: subtopicImages } = useQuery({
    queryKey: ["subtopicImages", topicPage?.id],
    queryFn: () => getPageImages(topicPage.id),
    enabled: Boolean(topicPage?.id),
  });

  // Preload images for smoother scrolling
  useEffect(() => {
    // Preload the first 20 frames immediately
    const initialFramesToPreload = 20;
    for (let i = 1; i <= initialFramesToPreload; i++) {
      preloadImage(i);
    }

    // Then preload the rest in the background
    setTimeout(() => {
      for (let i = initialFramesToPreload + 1; i <= TOTAL_FRAMES; i++) {
        preloadImage(i);
      }
    }, 1000);

    function preloadImage(frameNumber) {
      const paddedNumber = String(frameNumber).padStart(3, "0");
      const img = new Image();
      img.src = `${FRAME_PATH}${paddedNumber}.webp`;
      preloadedImagesRef.current[frameNumber] = img;
    }
  }, []);

  // Helper function to extract and parse JSON from data-image-json attribute
  function extractJsonFromDataAttribute(renderedHtml) {
    if (!renderedHtml) return null;
    const parser = new DOMParser();
    const doc = parser.parseFromString(renderedHtml, "text/html");
    const dataElement = doc.querySelector("[data-image-json]");
    if (dataElement) {
      const jsonString = dataElement.getAttribute("data-image-json");
      try {
        return JSON.parse(jsonString);
      } catch (e) {
        console.error(
          "Failed to parse JSON from data attribute:",
          e,
          "\nString was:",
          jsonString
        );
        return null;
      }
    }
    // console.warn("Could not find data-image-json attribute in the provided HTML description.");
    return null;
  }

  // Effect to parse metadata when subtopicImages are available
  useEffect(() => {
    if (subtopicImages && subtopicImages.length > 0) {
      console.log("Subtopic images received:", subtopicImages); // Debug log
      const allMetadata = subtopicImages.map((img) => {
        let jsonData = null;
        if (img.description && img.description.rendered) {
          jsonData = extractJsonFromDataAttribute(img.description.rendered);
          console.log("Parsed JSON data for image:", img.id, jsonData); // Debug log
        }
        return {
          id: img.id,
          data: {
            title: jsonData?.title || "N/A",
            description: jsonData?.description || "N/A",
            date: jsonData?.date || "N/A",
            artist: jsonData?.artist || "N/A",
            credit: jsonData?.credit || "N/A",
          },
        };
      });
      console.log("Final metadata array:", allMetadata); // Debug log
      setParsedImageMetadata(allMetadata);
    } else {
      setParsedImageMetadata([]); // Clear if no images or subtopicImages is null
    }
  }, [subtopicImages]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create a scroll trigger for the frame animation
    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => {
        // Calculate which frame to show based on scroll progress
        const frameNumber = Math.max(
          1,
          Math.min(TOTAL_FRAMES, Math.ceil(self.progress * TOTAL_FRAMES))
        );

        if (frameNumber !== currentFrame) {
          setCurrentFrame(frameNumber);
        }
      },
    });

    // Create sections for each image
    const sections = gsap.utils.toArray(".parallax-section");

    sections.forEach((section) => {
      const image = section.querySelector(".parallax-image");

      // Create a timeline for each image
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top center", // Start when top of section reaches center of viewport
          end: "bottom center", // End when bottom of section reaches center of viewport
          scrub: 1.5, // Smoother scrubbing
          markers: false,
        },
      });

      // Timeline animation sequence for centered scaling
      tl.fromTo(
        image,
        {
          scale: 0.2,
          opacity: 0,
          transformOrigin: "center center",
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
        }
      ).to(image, {
        scale: 2.5,
        opacity: 0,
        duration: 0.6,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [currentFrame]);

  // Get the path for the current frame
  const getCurrentFramePath = () => {
    const paddedNumber = String(currentFrame).padStart(3, "0");
    return `${FRAME_PATH}${paddedNumber}.webp`;
  };

  // Helps remove the <p> tags from the caption string of an image
  function cleanCaptionSlug(captionRendered) {
    if (!captionRendered) return "";
    const doc = new DOMParser().parseFromString(captionRendered, "text/html");
    return doc.body.textContent.trim(); // removes <p> tags and whitespace
  }

  return (
    <PageTransition>
      {/* Header */}
      <Header lightMode={false} />
      <div ref={containerRef} className="relative w-full bg-black">
        {/* Background Frame */}
        <div className="fixed inset-0 w-full h-full z-0">
          <img
            ref={frameImageRef}
            src={getCurrentFramePath()}
            alt="Mountain background"
            className="w-full h-full object-cover"
            style={{ transform: "none" }} // Ensure no transform is applied
          />
        </div>

        {/* Add overlay to make images stand out more against background */}
        <div className="fixed inset-0 w-full h-full z-0 bg-black opacity-40"></div>

        {/* Content sections with z-index to appear above background */}
        <div className="relative z-200">
          <section className="h-screen w-full flex items-center justify-center">
            <div className="block text-center">
              <h1 className="text-white text-2xl font-montserrat"></h1>
              <h1 className="text-amber-400 text-[250px] font-serif">
                {topic.charAt(0).toUpperCase() + topic.slice(1)}
              </h1>
              <div className="flex flex-col items-center mt-10 animate-bounce">
                <span className="text-white text-lg mb-2">Scroll down</span>
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </section>

          <section className="h-[50vh] w-full"></section>

          {subtopicImages?.map((img, index) => (
            <section
              key={img.id}
              className="parallax-section h-screen w-full relative"
            >
              <div className="parallax-image absolute inset-0 w-full h-full flex items-center justify-center">
                <img
                  src={img.source_url}
                  alt={img.alt_text || ""}
                  className="max-w-[80%] max-h-[80%] object-contain"
                />
              </div>
              <div className="relative z-10 flex flex-col items-center justify-start h-full pt-24">
                <h2 className="text-6xl text-white font-serif mb-4">
                  {img.alt_text}
                </h2>

                <Link
                  to={`/subtopic/${cleanCaptionSlug(img.caption?.rendered)}`}
                  className="px-5 py-2 bg-amber-500 text-white font-semibold rounded-full hover:bg-amber-600 transition"
                >
                  Read More
                </Link>
              </div>
            </section>
          ))}

          {/* Section 1 */}
          {/* <section className="parallax-section h-screen w-full relative">
            <div className="parallax-image absolute inset-0 w-full h-full flex items-center justify-center">
              <img
                src={image1}
                alt="Parallax 1"
                className="max-w-[80%] max-h-[80%] object-contain"
              />
            </div>
          </section>

          <section className="h-[50vh] w-full"></section> */}

          {/* Section 2 */}
          {/* <section className="parallax-section h-screen w-full relative">
            <div className="parallax-image absolute inset-0 w-full h-full flex items-center justify-center">
              <img
                src={image2}
                alt="Parallax 2"
                className="max-w-[80%] max-h-[80%] object-contain"
              />
            </div>
          </section>

          <section className="h-[50vh] w-full"></section> */}

          {/* Section 3 */}
          {/* <section className="parallax-section h-screen w-full relative">
            <div className="parallax-image absolute inset-0 w-full h-full flex items-center justify-center">
              <img
                src={image3}
                alt="Parallax 3"
                className="max-w-[80%] max-h-[80%] object-contain"
              />
            </div>
          </section> */}

          <section className="h-screen w-full items-center justify-center">
            {/* Metadata Table Section */}
            {parsedImageMetadata.length > 0 && (
              <div className="container mx-auto px-6 py-16">
                <h2 className="text-4xl font-serif text-amber-400 mb-12 text-center">
                  Image Details
                </h2>
                <div className="overflow-x-auto backdrop-blur-md rounded-lg p-2 shadow-2xl shadow-amber-500/10 border border-white/10">
                  <table className="w-full min-w-max text-left">
                    <thead className="text-amber-400 uppercase text-xs tracking-wider">
                      <tr>
                        <th className="py-3 px-6 font-bold">Title</th>
                        <th className="py-3 px-6 font-bold">Description</th>
                        <th className="py-3 px-6 font-bold">Date</th>
                        <th className="py-3 px-6 font-bold">Artist</th>
                        <th className="py-3 px-6 font-bold">Credit</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-300 text-sm">
                      {parsedImageMetadata.map((meta) => (
                        <tr
                          key={meta.id}
                          className="border-t border-slate-700 border-opacity-50 hover:bg-opacity-5 transition-colors duration-200 ease-in-out"
                        >
                          <td className="py-4 px-6">{meta.data.title}</td>
                          <td className="py-4 px-6">{meta.data.description}</td>
                          <td className="py-4 px-6">{meta.data.date}</td>
                          <td className="py-4 px-6">{meta.data.artist}</td>
                          <td className="py-4 px-6">{meta.data.credit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            <div className="flex flex-col items-center justify-center pt-12">
              <h1 className="text-white text-2xl font-montserrat">
                End of Journey
              </h1>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
}

export default ParallaxPage;
