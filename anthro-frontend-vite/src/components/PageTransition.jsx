import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

function PageTransition({ children }) {
  const pageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const content = contentRef.current;

    // Set initial state for content only
    gsap.set(content, {
      opacity: 0,
      scale: 1.1,
    });

    // Animate in the content
    gsap.to(content, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "power2.out",
      delay: 0.2, // Small delay to ensure smooth transition
    });
  }, []);

  return (
    <div ref={pageRef} className="w-full h-full">
      {/* Background elements will be rendered normally */}
      {React.Children.map(children, (child) => {
        // Check if this is the background container
        if (child.props.className?.includes("bg-black")) {
          const { children: bgChildren, ...rest } = child.props;
          return React.cloneElement(child, {
            ...rest,
            children: React.Children.map(bgChildren, (bgChild) => {
              // Apply transition only to content with z-20
              if (bgChild.props.className?.includes("z-20")) {
                return <div ref={contentRef}>{bgChild}</div>;
              }
              return bgChild;
            }),
          });
        }
        return child;
      })}
    </div>
  );
}

export default PageTransition;
