import { SVGProps } from "react";

const EditorIcon: React.FC<SVGProps<SVGSVGElement>> = ({
  fill = "none",
  stroke = "1.5",
  width = 24,
  height = 24,
  color = "currentColor"
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
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M15 3v4a1 1 0 0 0 1 1h4"></path>
      <path d="M18 17h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h4l5 5v7a2 2 0 0 1 -2 2z"></path>
      <path d="M16 17v2a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h2"></path>
    </svg>
  );
};

export default EditorIcon;
