import React, { useEffect, useState, useRef } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      setProgress(pct);
      setVisible(true);

      clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => setVisible(false), 1500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(hideTimer.current);
    };
  }, []);

  const size = 48;
  const waterLevel = 100 - progress; // 100% = empty (top), 0% = full (bottom)

  return (
    <div
      className={`fixed bottom-[5%] right-6 z-50 transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <div className="relative w-12 h-12">
        <svg width={size} height={size} viewBox="0 0 48 48" className="absolute inset-0">
          <defs>
            <clipPath id="ball-clip">
              <circle cx="24" cy="24" r="22" />
            </clipPath>
            <linearGradient id="water-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9B4DDB" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#670FC5" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Outer ring */}
          <circle cx="24" cy="24" r="23" fill="none" stroke="rgba(103,15,197,0.15)" strokeWidth="1.5" />

          {/* Glass ball background */}
          <circle cx="24" cy="24" r="22" fill="white" fillOpacity="0.85" />

          {/* Water fill with wave */}
          <g clipPath="url(#ball-clip)">
            <rect
              x="0"
              y={waterLevel * 0.44}
              width="48"
              height="48"
              fill="url(#water-gradient)"
              className="transition-[y] duration-300 ease-out"
            />
            {/* Wave on top of water */}
            <path
              d={`M0 ${waterLevel * 0.44} Q12 ${waterLevel * 0.44 - 3} 24 ${waterLevel * 0.44} T48 ${waterLevel * 0.44} V48 H0 Z`}
              fill="url(#water-gradient)"
              className="transition-[d] duration-300 ease-out"
            >
              <animate
                attributeName="d"
                dur="2.5s"
                repeatCount="indefinite"
                values={`
                  M0 ${waterLevel * 0.44} Q12 ${waterLevel * 0.44 - 3} 24 ${waterLevel * 0.44} T48 ${waterLevel * 0.44} V48 H0 Z;
                  M0 ${waterLevel * 0.44} Q12 ${waterLevel * 0.44 + 3} 24 ${waterLevel * 0.44} T48 ${waterLevel * 0.44} V48 H0 Z;
                  M0 ${waterLevel * 0.44} Q12 ${waterLevel * 0.44 - 3} 24 ${waterLevel * 0.44} T48 ${waterLevel * 0.44} V48 H0 Z
                `}
              />
            </path>
            {/* Second wave layer for depth */}
            <path
              d={`M0 ${waterLevel * 0.44 + 2} Q12 ${waterLevel * 0.44 + 5} 24 ${waterLevel * 0.44 + 2} T48 ${waterLevel * 0.44 + 2} V48 H0 Z`}
              fill="#670FC5"
              fillOpacity="0.3"
            >
              <animate
                attributeName="d"
                dur="3s"
                repeatCount="indefinite"
                values={`
                  M0 ${waterLevel * 0.44 + 2} Q12 ${waterLevel * 0.44 + 5} 24 ${waterLevel * 0.44 + 2} T48 ${waterLevel * 0.44 + 2} V48 H0 Z;
                  M0 ${waterLevel * 0.44 + 2} Q12 ${waterLevel * 0.44 - 1} 24 ${waterLevel * 0.44 + 2} T48 ${waterLevel * 0.44 + 2} V48 H0 Z;
                  M0 ${waterLevel * 0.44 + 2} Q12 ${waterLevel * 0.44 + 5} 24 ${waterLevel * 0.44 + 2} T48 ${waterLevel * 0.44 + 2} V48 H0 Z
                `}
              />
            </path>
          </g>

        </svg>

        {/* Percentage text - dark when empty, light when filled */}
        <span className={`absolute inset-0 flex items-center justify-center text-[10px] font-black transition-colors duration-300 ${progress > 50 ? "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]" : "text-slate-700"}`}>
          {progress}%
        </span>
      </div>
    </div>
  );
}
