import { useState, useEffect } from "react";

const getRandom = (min, max) => Math.random() * (max - min) + min;

function FloatingImage({ src }) {
  const [x, setX] = useState(() => getRandom(0, window.innerWidth - 150));
  const [y, setY] = useState(() => getRandom(0, window.innerHeight - 150));

  // Random speed and direction
  const [dx, setDx] = useState(() => getRandom(-1, 1));
  const [dy, setDy] = useState(() => getRandom(-1, 1));

  useEffect(() => {
    const moveImage = () => {
      setX((prevX) => {
        let newX = prevX + dx;
        let newDx = dx;

        // If newX is outside left/right bounds, clamp & reverse dx
        if (newX < 0) {
          newX = 0;
          newDx = -dx;
        } else if (newX > window.innerWidth - 150) {
          newX = window.innerWidth - 150;
          newDx = -dx;
        }

        // Only call setDx if we changed newDx
        if (newDx !== dx) {
          setDx(newDx);
        }

        return newX;
      });

      setY((prevY) => {
        let newY = prevY + dy;
        let newDy = dy;

        // If newY is outside top/bottom bounds, clamp & reverse dy
        if (newY < 0) {
          newY = 0;
          newDy = -dy;
        } else if (newY > window.innerHeight - 150) {
          newY = window.innerHeight - 150;
          newDy = -dy;
        }

        // Only call setDy if we changed newDy
        if (newDy !== dy) {
          setDy(newDy);
        }

        return newY;
      });
    };

    // Move every 20ms (about 50 fps)
    const intervalId = setInterval(moveImage, 20);
    return () => clearInterval(intervalId);
  }, [dx, dy]);

  return (
    <img
      src={src}
      alt="floating"
      className="absolute w-36 h-36"
      style={{
        left: x,
        top: y,
      }}
    />
  );
}

export default FloatingImage;
