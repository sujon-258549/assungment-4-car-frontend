import { ReactNode } from "react";

const AddToCart = ({
  text,
  btnIcon,
  border,
}: {
  text?: string;
  btnIcon?: ReactNode;
  border?: string;
}) => (
  <div
    style={{ width: "100%" }}
    className={`px-6 py-3 border  ${border} rounded-xl text-white  transition-all bg-cyan-800 flex items-center gap-2`}
  >
    {text}
    <span className="text-xl pl-1 text-white"> {btnIcon}</span>
  </div>
);

export default AddToCart;
