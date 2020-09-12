import React from "react";

export default function LogoIcon({ scale }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 368 319"
      width={scale}
      height={scale}
    >
      <defs>
        <style>{".cls-3{fill:#fff}"}</style>
      </defs>
      <path
        fill="#1faaff"
        d="M276 0H92L-.3 159.5 92 319h184.2l92-159.5L276.2 0z"
      />
      <path
        stroke="#fff"
        strokeMiterlimit="10"
        strokeWidth="14"
        fill="#1faaff"
        d="M263.4 22H104.6L25.3 159.5 104.6 297h158.8l79.3-137.5L263.4 22z"
      />
      <path
        className="cls-3"
        d="M95.2 102h13.5l42.8 69.3h.2V102H166v97.5h-13.5l-42.7-69.3h-.3v69.3H95.2zM189 102h13.4l27 63.6 26.7-63.6h13.5v97.5h-14.3v-60.8h-.3l-19.8 46.9h-12l-19.7-46.9h-.3v60.8H189z"
      />
    </svg>
  );
}
