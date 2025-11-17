// components/HeroBackground.tsx
import React from "react";
import SvgWaveHaikei from "./WaveHaikei";

type Props = {
  imageSrc?: string;
  className?: string;
  children?: React.ReactNode;
  heightClass?: string; // e.g. 'min-h-screen' or 'h-96'
};

export default function HeroBackground({
  imageSrc,
  className = "",
  children,
  heightClass = "min-h-screen",
}: Props) {
  return (
    <div className={`relative overflow-hidden ${heightClass} ${className}`}>
      {/* background layer (encapsulated) */}
      <div className="absolute inset-0">
        <SvgWaveHaikei
          imageSrc={imageSrc}
          className="w-full h-full block"
          style={{ width: "100%", height: "100%" }}
          imagePreserveAspectRatio="xMidYMid slice"
          title={null}
        />
      </div>

      {/* content layer (no caller z-index needed) */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
