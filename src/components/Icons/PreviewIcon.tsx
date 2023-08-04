import { SVGProps } from "react";

const PreviewIcon: React.FC<SVGProps<SVGSVGElement>> = ({
  fill = "none",
  stroke = "1.5",
  width = 24,
  height = 24,
  color = "currentColor",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-external-link"
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
      <path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6"></path>
      <path d="M11 13l9 -9"></path>
      <path d="M15 4h5v5"></path>
    </svg>
  );
};

export default PreviewIcon;
