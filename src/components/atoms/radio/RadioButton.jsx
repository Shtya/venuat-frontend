
import React from 'react';

const RadioButton = ({ name, value, label, checked = false , cn , onChange }) => {
  
  return (
    <label className={`radio flex gap-2 relative cursor-pointer ${cn}`}>
      <input type="radio" name={name} value={value} checked={checked} onChange={() => onChange(value)} className="opacity-0  absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[-1]" />
      <span className="design  w-5 h-5 border border-gray-800 rounded-full relative">
        <span className="absolute  w-full h-full rounded-full scale-0 transform transition-all duration-300 bg-gray-800 opacity-0"></span>
        <span className="absolute  w-full h-full rounded-full scale-0 transform transition-all duration-600 bg-indigo-700 opacity-40"></span>
      </span>
      <span className=" cursor-pointer text-base font-[500] text-gray-700">{label}</span>

      <style jsx>{`
        .radio input:checked + .design span:nth-child(1) {
          opacity: 1;
          transform: scale(0.6);
        }
        .radio input:hover + .design,
        .radio input + .design {
          border-color: #1E328B;
        }
        .radio input:hover + .design span:nth-child(1),
        .radio input + .design span:nth-child(1) {
          background: #1E328B;
        }
        .radio input:hover ~ .text,
        .radio input:focus ~ .text {
          color: #1E328B;
        }
        .radio input:focus + .design span:nth-child(2),
        .radio input:active + .design span:nth-child(2) {
          opacity: 0.1;
          transform: scale(2.6);
        }
      `}</style>
    </label>
  );
};

export default RadioButton;
