import React from "react";

type Props = {
  message: string;
  position?: "top" | "bottom" | "left" | "right";
  show: boolean;
};

const ToolTip = ({ message, position = "top", show }: Props) => {
  const totalTipPosition = {
    top: "translate-x-10 bottom-full mb-2 left-0",
    bottom: "-translate-x-10 top-full mt-2 left-1/2",
    left: "-translate-y-10 top-1/2 mr-2 right-full",
    right: "-translate-y-10 top-1/2 ml-2 left-full",
  }[position];

  const trianglePosition = {
    bottom: "bottom-full left-6 -translate-x-10 border-b-black",
    top: "top-full left-12 -translate-x-10 border-t-slate-800",
    left: "top-full right-6 -translate-y-10 border-l-black",
    right: "top-full left-6 -translate-y-10 border-r-black",
  }[position];

  return show ? (
    <div
      className={`absolute w-fit  z-50 text-xs bg-slate-800 text-white px-3 py-2 rounded shadow-md ${totalTipPosition} whitespace-pre-line`}
    >
      {message}
      <div
        className={`absolute w-0 h-0 border-8 border-transparent ${trianglePosition}`}
      />
    </div>
  ) : null;
};

export default ToolTip;
