import { SendIcon } from "@/icons/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import AiIcon from "@/public/assets/gpt.png";
import { useAuthStore } from "@/store/useAuthStore";
import { getInitials } from "@/utils/helpers";

type Message = {
  role: "user" | "assistant";
  content: string;
};

interface Props {
  setOpenChat: (value: boolean) => void;
}

const ChatPrompt = ({ setOpenChat }: Props) => {
  const { user } = useAuthStore((state) => state);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I’m your personal AI Assistant MediGuide.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newUserMessage: Message = { role: "user", content: input };
    const updatedMessages = [...messages, newUserMessage];

    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await res.json();
      setIsTyping(false);

      if (data.function_call === "navigateToDoctors") {
        const location = data.args?.search || "";

        setMessages([
          ...updatedMessages,
          {
            role: "assistant",
            content: `Sure! Redirecting you to doctors in ${
              location.charAt(0).toUpperCase() + location.slice(1)
            }.`,
          },
        ]);

        setTimeout(() => {
          setOpenChat(false);
          router.push(
            `/find-doctors?page=1&search=${encodeURIComponent(location)}`
          );
        }, 2000);
      } else {
        // default messages
        setMessages([
          ...updatedMessages,
          { role: "assistant", content: data.reply },
        ]);
      }
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    sendMessage();
  };

  return (
    <div
      ref={containerRef}
      className=" w-full h-full p-6 flex flex-col  rounded-b-3xl font-comfortaa"
    >
      {/* chats */}
      <div className="  flex-1 pr-3 overflow-y-auto space-y-4 chat-scrollbar">
        {messages?.map((msg, i) => (
          <div
            key={i}
            className={`flex  gap-4 ${
              msg.role === "user" ? " justify-end" : " justify-start"
            }`}
          >
            {msg.role === "assistant" ? (
              <div className=" w-10 h-10 bg-primary rounded-full flex justify-center items-center">
                <Image
                  src={AiIcon}
                  alt="MediGuide_icon"
                  width={30}
                  height={30}
                />
              </div>
            ) : (
              <div className=" w-10 h-10 bg-gray-400 text-white rounded-full flex justify-center items-center">
                {getInitials(user?.name || "T")}
              </div>
            )}
            <div
              className={`max-w-[60%] rounded-xl ${
                msg.role === "user"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-black"
              } p-4`}
            >
              <p className=" text-sm w-full text-wrap">
                {msg.content}

                {msg.role === "assistant" && i === 0 && (
                  <span className="block text-xs text-primary justify-self-end mt-1">
                    Powered by AI
                  </span>
                )}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="text-gray-500 text-sm animate-pulse">
            MediGuide is typing...
          </div>
        )}

        <div ref={bottomRef} className=" w-full" />
      </div>

      {/* submit form */}
      <form
        onSubmit={handleSubmit}
        className=" w-full mt-8  bg-gray-100 rounded-xl flex gap-4  justify-between"
      >
        <textarea
          ref={textareaRef}
          placeholder="Ask MediGuide anything.."
          value={input ?? ""}
          onChange={(e) => handleInputChange(e)}
          onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendMessage();
            }
          }}
          className="textarea-scrollbar w-full pt-8 pb-3 pl-6  focus:outline-0 focus:border-0 min-h-[40px] leading-tight  max-h-[150px] resize-none "
        />
        <button type="submit" className="pr-6 text-primary cursor-pointer">
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

export default ChatPrompt;
