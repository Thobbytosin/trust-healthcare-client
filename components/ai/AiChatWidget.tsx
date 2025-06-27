import { CloseIcon } from "@/icons/icons";
import React, { useEffect, useState } from "react";
import AiIcon from "@/public/assets/gpt.png";
import Image from "next/image";
import ChatPrompt from "./ChatPrompt";

type Props = {};

const AiChatWidget = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [hide, setHide] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {open && (
        <>
          {/* overlay */}
          <div
            onClick={() => setOpen(false)}
            className=" bg-white/70 fixed inset-0 z-50 w-screen h-screen"
          />

          {/* card */}
          <div className=" fixed top-[15%] lg:top-[10%] left-[15%] w-[70%] lg:h-[80%] h-[70%] bg-white shadow-lg shadow-black/30 z-60 rounded-3xl flex flex-col ">
            {/* chat header */}
            <div className=" w-full h-[80px] bg-primary rounded-t-3xl p-6 flex items-center gap-3">
              <h2 className="text-white text-base md:text-lg font-bold font-poppins">
                MediGuide
              </h2>
              <Image src={AiIcon} alt="MediGuide_icon" width={30} height={30} />
            </div>
            {/* chat prompt */}
            <div className=" flex-1 flex flex-col overflow-hidden">
              <ChatPrompt setOpenChat={setOpen} />
            </div>
          </div>
        </>
      )}

      {!hide && (
        <div className="fixed bottom-5 right-10">
          <button
            onClick={() => setOpen(true)}
            className=" rounded-full cursor-pointer text-base md:text-lg px-6 py-2 bg-slate-900  text-white spinning-border font-poppins"
          >
            Interact with AI Assistant
          </button>
          <span
            onClick={() => setHide(true)}
            className="absolute cursor-pointer -top-6  text-slate-500 text-[1px] rounded-full  -right-6 "
          >
            <CloseIcon />
          </span>
        </div>
      )}
    </>
  );
};

export default AiChatWidget;
