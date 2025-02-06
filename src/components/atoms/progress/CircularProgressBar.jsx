import React from "react";

const CircularProgressBar = ({ percent }) => {
  const radius = 16; // Radius of the circle
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const offset = circumference - (percent / 100) * circumference; // Calculate dynamic offset

  return (
    <div className=" flex justify-center my-[20px] lg:absolute lg:right-[40px] lg:bottom-[40px]  " >

      <div data-aos="zoom-in"  className="  relative max-sm:w-[80px] max-sm:h-[80px]  w-[140px] h-[140px]">
        {/* SVG with two circles */}
        <svg
          className="size-full -rotate-90"
          viewBox="0 0 36 36"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Circle */}
          <circle
            cx="18"
            cy="18"
            r={radius}
            fill="none"
            className="stroke-current text-primary3"
            strokeWidth="2"
          />
          {/* Progress Circle */}
          <circle
            cx="18"
            cy="18"
            r={radius}
            fill="none"
            className=" duration-500 stroke-current text-primary1"
            strokeWidth="2"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>

        {/* Percentage Text */}
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] h4 text-primary1 font-[600]">
          {percent}%
        </div>
      </div>

    </div>
  );
};

export default CircularProgressBar;
