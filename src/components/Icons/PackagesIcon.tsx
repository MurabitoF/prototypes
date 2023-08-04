import { SVGProps } from "react";

const PackagesIcon: React.FC<SVGProps<SVGSVGElement>> = ({
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
      strokeWidth={stroke}
      stroke={color}
      fill={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5"></path>
      <path d="M12 12l8 -4.5"></path>
      <path d="M12 12l0 9"></path>
      <path d="M12 12l-8 -4.5"></path>
      <path d="M16 5.25l-8 4.5"></path>
    </svg>
  );
};

export default PackagesIcon;
