import React, { useRef } from "react";

const VideoBanner = () => {
  const videoRef = useRef(null);

  const handleHover = () => {
    videoRef.current.paused
      ? videoRef.current.play()
      : videoRef.current.pause();
  };

  return (
    <div className="relative h-screen">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src="https://www.youtube.com/watch?v=fzKgRDDDQy8"
        autoPlay
        muted
        loop
      ></video>
      <iframe
        className="h-full w-full object-cover"
        src="https://www.youtube.com/embed/fzKgRDDDQy8?si=n32muGOZlLbIE4qt"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
      <div
        className="absolute left-0 top-0 flex h-full w-full items-center justify-center"
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
      >
        {videoRef.current && videoRef.current.paused && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default VideoBanner;
