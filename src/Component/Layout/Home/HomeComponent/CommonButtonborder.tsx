import { ReactNode } from "react";

const CommonButtonborder = ({
  text,
  btnIcon,
  border,
}: {
  text: string;
  btnIcon?: ReactNode;
  border: string;
}) => (
  <div
    className={`px-6 py-2 border ${border} rounded-xl text-white  transition-all bg-[#424242] hover:bg-[#424242da] flex items-center gap-2`}
  >
    {text}
    <span className="text-2xl pl-1 text-white"> {btnIcon}</span>
  </div>
);

export default CommonButtonborder;
