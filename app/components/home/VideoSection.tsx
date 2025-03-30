"use client";
import Image from "next/image";
import React, { useState } from "react";
import backdrop from "../../../public/assets/video-backdrop.jpg";
import { PlayArrowOutlinedIcon } from "../../../app/icons/icons";
import RevealWrapper from "../global/RevealWrapper";

type Props = {};

const VideoSection = (props: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };
  return (
    <RevealWrapper>
      <section id="video-section" className={` w-full my-20 `}>
        <div className="w-[95%] mx-auto  flex flex-col items-center justify-center">
          {/* Responsive iframe */}
          <div className="w-full relative pb-[56.25%] h-0 mb-8">
            {!isPlaying && (
              <div>
                <Image
                  src={backdrop}
                  alt="video_backdrop_image"
                  fill
                  className=" absolute left-0 top-0 w-full h-full"
                />
                {/* // overlay */}
                <div
                  onClick={handlePlay}
                  className=" absolute left-0 top-0 w-full h-full bg-black/50 flex justify-center items-center"
                >
                  <div className="flex justify-center items-center bg-white rounded-full w-[80px] h-[80px] hover:scale-110 transition duration-700 cursor-pointer">
                    <PlayArrowOutlinedIcon
                      fontSize="large"
                      className="text-primary"
                    />
                  </div>
                </div>
              </div>
            )}

            {isPlaying && (
              <iframe
                className="absolute top-0 left-0 w-full h-full bg-gray-100 shadow-lg"
                src="https://cdn.pixabay.com/video/2021/01/28/63241-505964153_large.mp4" // Replace with your video URL
                title="Intro Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
      </section>
    </RevealWrapper>
  );
};

export default VideoSection;
