import React, { useEffect, useState } from "react";
import { Range, getTrackBackground } from "react-range";

const TimeSlider = ({ classname }) => {
  const [values, setValues] = useState([600, 1020]);

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = mins < 10 ? `0${mins}` : mins;
    return `${formattedHours}:${formattedMinutes}`;
  };

  const onSliderChange = (newValues) => {
    setValues(newValues);
  };

  return (
    <div className={`${classname} w-[300px] range mb-[20px] mr-[20px] max-w-[430px]`}>
      <p className="flex items-center justify-between">
        <span className="slider-time P-12">{formatTime(values[0])}</span>
        <span className="slider-time2 P-12">{formatTime(values[1])}</span>
      </p>
      <Range
        step={15}
        min={600}
        max={1020}
        values={values}
        onChange={onSliderChange}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "3px",
              width: "100%",
              background: getTrackBackground({
                values: values,
                colors: ["#CDCDCD", "#29963e", "#CDCDCD"],
                min: 600,
                max: 1020,
              }),
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props, isDragged, index }) => (
          <div
            {...props} // Ensure props are passed correctly to avoid overwriting styles
            key={index} // Ensure each thumb has a unique key
            style={{
              ...props.style, // Spread props.style to preserve transform and positioning
              height: "28px",
              width: "28px",
              borderRadius: "50%",
              backgroundColor: "#FFF",
              border: "3px solid #CDCDCD",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: isDragged ? "grabbing" : "grab",
              outline: "none",
              boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)", // Optional for better visibility
              zIndex: 1, // Ensure the thumb stays on top of the track
            }}
          />
        )}
      />
    </div>
  );
};

export default TimeSlider;
