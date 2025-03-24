import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Link } from "react-router";

function SpinningIndex() {
  const circlesRef = useRef([]);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const addToRefs = (el) => {
    if (el && !circlesRef.current.includes(el)) {
      circlesRef.current.push(el);
    }
  };

  useEffect(() => {
    // Clear refs on unmount
    return () => {
      circlesRef.current = [];
    };
  }, []);

  useEffect(() => {
    const circles = circlesRef.current;
    const container = containerRef.current;
    if (circles.length !== 4 || !container) return;

    const radius = 250; // Orbit radius
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const centerX = containerWidth / 2;
    const centerY = containerHeight / 2;

    // Set initial positions in a square formation
    const startAngles = [225, 315, 45, 135]; // in degrees (starting from bottom-left, going clockwise)

    circles.forEach((circle, i) => {
      const angle = (startAngles[i] * Math.PI) / 180; // Convert to radians
      const x = centerX / 4 + radius * Math.cos(angle);
      const y = centerY / 4 + radius * Math.sin(angle);

      gsap.set(circle, {
        x,
        y,
        xPercent: -50, // Center the circle (offsetting the element's own dimensions)
        yPercent: -50,
      });
    });

    // Create the rotating animation
    const duration = 25; // seconds for a full revolution (slower for more elegant motion)

    const tl = gsap.timeline({ paused: true });

    circles.forEach((circle, i) => {
      const startAngle = (startAngles[i] * Math.PI) / 180;

      tl.to(
        circle,
        {
          duration,
          repeat: -1,
          ease: "none",
          onUpdate: function () {
            const progress = this.progress();
            const currentAngle = startAngle + progress * Math.PI * 2;
            const x = centerX / 4 + radius * Math.cos(currentAngle);
            const y = centerY / 4 + radius * Math.sin(currentAngle);

            gsap.set(circle, {
              x,
              y,
              rotation: 0, // Keep text upright
            });
          },
        },
        0
      ); // Start at the same time
    });

    // Play the animation initially
    tl.play();
    animationRef.current = tl;

    return () => {
      tl.kill();
    };
  }, [circlesRef.current.length]);

  // Handle hover pause/play
  const handleMouseEnter = (index) => {
    if (animationRef.current) {
      // Pause the animation
      animationRef.current.pause();
      setIsPaused(true);

      // Scale up the hovered circle
      gsap.to(circlesRef.current[index], {
        scale: 1.3,
        duration: 0.3,
        boxShadow: "0 0 60px rgba(255, 255, 255, 0.3)",
      });

      // Slightly scale down the other circles
      circlesRef.current.forEach((circle, i) => {
        if (i !== index) {
          gsap.to(circle, {
            scale: 0.9,
            opacity: 0.5,
            duration: 0.3,
          });
        }
      });
    }
  };

  const handleMouseLeave = (index) => {
    if (animationRef.current && isPaused) {
      // Resume the animation
      animationRef.current.play();
      setIsPaused(false);

      // Reset all circles
      circlesRef.current.forEach((circle) => {
        gsap.to(circle, {
          scale: 1,
          opacity: 1,
          boxShadow: "0 0 0px rgba(255, 255, 255, 0)",
          duration: 0.3,
        });
      });
    }
  };

  // Button data
  const buttons = [
    {
      label: "Water",
      path: "/parallax",
      color: "bg-cyan-600",
      gradient: "from-cyan-600 via-cyan-500 to-cyan-600",
      border: "border-cyan-400",
    },
    {
      label: "Materiality",
      path: "/parallax",
      color: "bg-amber-700",
      gradient: "from-amber-700 via-amber-600 to-amber-700",
      border: "border-amber-500",
    },
    {
      label: "Time",
      path: "/parallax",
      color: "bg-emerald-700",
      gradient: "from-emerald-700 via-emerald-600 to-emerald-700",
      border: "border-emerald-500",
    },
    {
      label: "Mobility",
      path: "/parallax",
      color: "bg-slate-600",
      gradient: "from-slate-600 via-slate-500 to-slate-600",
      border: "border-slate-400",
    },
  ];

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center overflow-hidden">
      {/* Background ambient circles */}
      <div className="fixed inset-0 overflow-hidden opacity-20">
        <div
          className="absolute w-[100vh] h-[100vh] rounded-full border border-white/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ animation: "var(--animate-circle-border)" }}
        />
        <div
          className="absolute w-[80vh] h-[80vh] rounded-full border border-white/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            animation: "var(--animate-circle-border)",
            animationDirection: "reverse",
          }}
        />
        <div
          className="absolute w-[60vh] h-[60vh] rounded-full border border-white/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ animation: "var(--animate-circle-border)" }}
        />
      </div>

      <div
        ref={containerRef}
        className="relative w-[600px] h-[600px] flex items-center justify-center"
      >
        {buttons.map((button, index) => (
          <Link
            to={button.path}
            key={index}
            ref={addToRefs}
            className={`absolute w-52 h-52 rounded-full flex items-center justify-center
                       cursor-pointer transform text-white font-montserrat text-xl z-10
                       border-2 ${button.border} backdrop-blur-sm
                       before:content-[''] before:absolute before:inset-0 before:rounded-full 
                       before:bg-gradient-to-r before:${button.gradient}
                       before:[animation:var(--animate-pulse-glow)]
                       after:content-[''] after:absolute after:inset-[2px] after:rounded-full 
                       after:bg-gradient-to-r after:${button.gradient}
                       after:opacity-90 after:backdrop-blur-sm
                       group transition-all duration-300`}
            style={{
              background: `linear-gradient(45deg, ${button.color}33, ${button.color}66)`,
              boxShadow: `0 0 30px ${button.color}33`,
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <span className="relative z-20 font-semibold tracking-wider group-hover:scale-110 transition-transform duration-300">
              {button.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SpinningIndex;
