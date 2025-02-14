import { ReactNode } from "react";

const CommonButton = ({
  text,
  btnIcon,
}: {
  text: string;
  btnIcon?: ReactNode;
}) => (
  <div
    style={{ boxShadow: "1px 1px 10px", borderRadius: "12px" }}
    className="px-5 py-2  rounded-md text-white bg-cyan-900 transition-all hover:bg-cyan-800 flex items-center gap-2"
  >
    {text}
    <span className="text-xl pl-1 text-white"> {btnIcon}</span>
  </div>
);

export default CommonButton;
