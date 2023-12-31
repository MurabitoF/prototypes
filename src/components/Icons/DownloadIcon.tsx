import { SVGProps } from "react";

const DownloadIcon: React.FC<SVGProps<SVGSVGElement>> = ({
  fill = "none",
  stroke = "1.5",
  width = 24,
  height = 24,
  color = "currentColor",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      stroke-width={stroke}
      stroke={color}
      fill={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M6 20.735a2 2 0 0 1 -1 -1.735v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2h-1"></path>
      <path d="M11 17a2 2 0 0 1 2 2v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-2a2 2 0 0 1 2 -2z"></path>
      <path d="M11 5l-1 0"></path>
      <path d="M13 7l-1 0"></path>
      <path d="M11 9l-1 0"></path>
      <path d="M13 11l-1 0"></path>
      <path d="M11 13l-1 0"></path>
      <path d="M13 15l-1 0"></path>
    </svg>
  );
};

export default DownloadIcon;
