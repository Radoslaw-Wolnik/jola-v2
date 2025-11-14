import React, { useId } from "react";

type Props = React.SVGProps<SVGSVGElement> & {
  /** URL / imported image to show inside the wave shape */
  imageSrc?: string;
  /** how the image fits (acts like background-size): 'xMidYMid slice' ~ cover */
  imagePreserveAspectRatio?: string;
  /** decorative if null */
  title?: string | null;
};

/**
 * SVG wave component that can optionally show an image clipped to the wave path.
 * Replaces the implicit-any `props` with typed props and adds `imageSrc`.
 * 
 * 
 * 
 * 
 * npx @svgr/cli -- src/assets/wave-haikei.svg > src/components/WaveHaikei.tsx
 * npx @svgr/cli -- src/assets/wave-haikei.svg > src/components/Temp.tsx
 */
export default function SvgWaveHaikei({
  imageSrc,
  imagePreserveAspectRatio = "xMidYMid slice",
  title = null,
  ...svgProps
}: Props) {
  const uid = useId();
  const clipId = `wave-clip-${uid}`;

  // the 'd' for the second path from your original SVG (the blue shape).
  // keep exact path so clip matches the visible wave shape.
  const wavePathD =
    "M664.895 802.285C567.377 464.807 713.838 1.308 1023.25 0h179.177v802.284z" // 1200 x 800
    /* "M900 600c-186.923 9.455-412.817 3.117-412.817 3.117-.1-76.052-1.241-75.757-1.241-75.757C489.08 451.164 434.575-2.058 787.327-.498L900 0" // 900x600 */
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={1200}
      height={800}
      viewBox="0 0 1200 800" /* 900 600 */
      preserveAspectRatio="xMidYMid slice"
      role={title ? "img" : undefined}
      aria-label={title ?? undefined}
      aria-hidden={title ? undefined : true}
      {...svgProps}
    >
        
      <title>{title ?? ""}</title>

      <defs>
        {/* Clip path that uses the same wave path geometry */}
        <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
          <path d={wavePathD} />
        </clipPath>
      </defs>

      {/* background rect (original) with size 0h900v600H0z */}
      <path fill="#023" d="M0 0h1200v800H0z" /> 
      {/* use transparent base 
      <rect x="0" y="0" width="900" height="600" fill="transparent" />
      */}
      {/* If an imageSrc is provided, draw the image and clip it to the wave shape */}
      {imageSrc ? (
        <g clipPath={`url(#${clipId})`}>
          {/* Image fills the whole SVG viewport; adjust width/height/x/y to reposition */}
          <image
            href={String(imageSrc)}
            x="0"
            y="0"
            width="1200"
            height="800"
            preserveAspectRatio={imagePreserveAspectRatio}
            style={{ pointerEvents: "none", display: "block" }}
          />
        </g>
      ) : (
        // fallback: original filled wave (keeps original visual if no image)
        <path fill="#06F" d={wavePathD} />
      )}

      {/* optional subtle outline/overlay of the wave */}
      <path
        d={wavePathD}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={1}
        pointerEvents="none"
      />
    </svg>
  );
}
