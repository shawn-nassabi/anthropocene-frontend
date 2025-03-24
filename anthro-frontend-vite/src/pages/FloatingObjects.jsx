import { useState } from "react";
import FloatingImage from "../components/FloatingImage";

// Import images explicitly
import image1 from "../assets/bee.png";
import image2 from "../assets/cattle.png";
import image3 from "../assets/ghostwater.png";
import image4 from "../assets/toxicfog.png";

const images = [image1, image2, image3, image4];

function FloatingObjects() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="relative w-screen h-screen overflow-hidden bg-black">
        {images.map((src, index) => (
          <FloatingImage key={index} src={src} />
        ))}
      </div>
    </>
  );
}

export default FloatingObjects;
