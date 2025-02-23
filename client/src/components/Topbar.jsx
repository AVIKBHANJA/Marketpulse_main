import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TopBar = ({
  data,
  visibleItems = 5,
  speed = 50, // Adjust scrolling speed (lower = faster)
  onSelectStock,
}) => {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!scrollRef.current) return;

    let animationFrame;
    const scroll = () => {
      if (scrollRef.current && !isHovered) {
        scrollRef.current.scrollLeft += 1; // Move 1px per frame
        if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
          scrollRef.current.scrollLeft = 0; // Reset to prevent jumps
        }
      }
      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrame);
  }, [isHovered]);

  return (
    <div
      className="dark:bg-gray-800 bg-slate-500 py-2 px-4 flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={scrollRef}
        className="overflow-hidden whitespace-nowrap flex-1 relative"
        style={{ scrollBehavior: "smooth" }}
      >
        <div className="flex w-max gap-8">
          {[...data, ...data].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 cursor-pointer dark:hover:bg-gray-700 hover:bg-slate-800 px-4 py-2"
              onClick={() => onSelectStock(item)} // Clicking won't remove it
            >
              <span className="text-sm font-medium text-gray-100">
                {item.symbol}
              </span>
              <span className="text-sm text-gray-300">${item.price}</span>
              <span
                className={`text-sm font-medium ${
                  parseFloat(item.changePercent) >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {parseFloat(item.changePercent) >= 0 ? "+" : ""}
                {item.changePercent}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
