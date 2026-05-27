// FancyCurveCard.tsx
import React from "react";

export default function FancyCard({
  title = "Title",
  text = "placeholder text that is supposed to be swapped",
  className = "",
}: {
  title: string;
  text: string;
  className?: string;
}) {
  const id = React.useId().replace(/:/g, "-");

  const W = 600; // stretchable width
  const H = 321;

  // Your original curve, turned into a **closed card shape**
  const pathD = `
    M 28.188 0.89209
    C -8.31227 19.3921 -7.81226 308.392 28.188 319.892
    H ${W - 28.188}
    C ${W + 8.31227} 308.392 ${W + 7.81226} 19.3921 ${W - 28.188} 0.89209
    Z
  `;

  return (
    <div className={`w-full ${className}`}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="w-full block"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`grad-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FFFFF1" />
          </linearGradient>
          

          {/* Clip to card shape */}
          <clipPath id={`clip-${id}`} clipPathUnits="userSpaceOnUse">
            <path d={pathD} />
          </clipPath>
        </defs>

        {/* Background card shape */}
        <path
          d={pathD}
          fill={`url(#grad-${id})`}
          filter={`url(#shadow-${id})`}
        />

        {/* Content rendered within that shape */}
        <foreignObject x="0" y="0" width={W} height={H} clipPath={`url(#clip-${id})`}>
          <div className="w-full h-full p-6 text-blue gap-2 justify-evenly flex flex-col items-center text-center box-border">
            <h3 className="text-4xl font-montserrat font-bold text-blue">{title}</h3>
            <p className="text-2xl ">{text}</p>
          </div>
        </foreignObject>
      </svg>
    </div>
  );
}
