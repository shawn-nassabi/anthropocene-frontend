import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

function PageTransition({ children }) {
  const pageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const content = contentRef.current;
    // Ensure contentRef.current is populated before animating
    if (content) {
      // Set initial state for content only
      gsap.set(content, {
        opacity: 0,
        scale: 1.1, // Or your desired initial scale
      });

      // Animate in the content
      gsap.to(content, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        delay: 0.2, // Small delay to ensure smooth transition
      });
    }
  }, []);

  return (
    <div ref={pageRef} className="w-full h-full">
      {React.Children.map(children, (child) => {
        // Ensure child is a valid React element and className is a string before checking it
        if (
          React.isValidElement(child) &&
          typeof child.props.className === "string" &&
          child.props.className.includes("bg-black")
        ) {
          const bgChildren = child.props.children;
          // Keep a flag to ensure we only wrap the first intended content element
          // This is a simple approach; for more complex scenarios, a more robust targeting mechanism might be needed.
          let contentWrapperApplied = false;

          const newBgChildren = React.Children.map(bgChildren, (bgChild) => {
            // Ensure bgChild is a valid React element and className is a string
            if (
              !contentWrapperApplied && // Only apply to the first match
              React.isValidElement(bgChild) &&
              typeof bgChild.props.className === "string" &&
              bgChild.props.className.includes("z-200") // Corrected class name
            ) {
              contentWrapperApplied = true;
              // This div wrapper receives the ref and the animation
              return <div ref={contentRef}>{bgChild}</div>;
            }
            return bgChild; // Return other children of the bg-black div as is
          });
          return React.cloneElement(child, {
            ...child.props,
            children: newBgChildren,
          });
        }
        // Return other top-level children (like Header or non-bg-black sections) or non-elements as is
        return child;
      })}
    </div>
  );
}

export default PageTransition;
