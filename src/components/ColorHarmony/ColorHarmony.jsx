<<<<<<< HEAD
import  { useState, useEffect } from 'react';
=======
import { useState, useEffect } from "react";
>>>>>>> 818d9fa507a8f4d4ffda37435afef3f48c611888
import { FaChevronDown } from "react-icons/fa";
import "./colorHarmony.css";

const ColorHarmony = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedColorHarmony, setSelectedColorHarmony] = useState("");

  const optionsForHarmony = [
    { label: "Complementary", value: "complementary" },
    { label: "Monochromatic", value: "monochromatic" },
    { label: "Analogous", value: "analogous" },
    { label: "Split Complements", value: "splitcomplements" },
    { label: "Triadic", value: "triadic" },
    { label: "Tetradic", value: "tetradic" },
  ];

  const handleColorHarmonyChange = (option) => {
    setSelectedColorHarmony(option);
    setShowOptions(false);
  };
  

  useEffect(() => {
    setSelectedColorHarmony("");
  }, []);

  return (
    <div className="colorharmony">
<<<<<<< HEAD
      <div className="colorharmony-dropdownmenu ">
        <div className={`colorharmony-title ${showOptions ? 'active-title' : "colorharmony-title"}`}>
         <h3 >{selectedColorHarmony ? optionsForHarmony.find(opt => opt.value === selectedColorHarmony).label : 'Color Harmony'}</h3> 
          <span className={`dropdown__icon ${showOptions ? 'active' : 'dropdown_icon'}`}
           onClick={() => setShowOptions(!showOptions)}>
         <FaChevronDown />
        </span> 
      </div>
        {showOptions && (
          <div className="dropdown__options ">
            {optionsForHarmony.map((option) => (
              <p
                key={option.value}
                onClick={() => handleColorHarmonyChange(option.value)}
                className="dropdown__option" >
                {option.label}
              </p>
            ))}
          </div>
        )}
   </div>
   </div>
 
          );
=======
      <div
        onClick={() => setShowOptions(!showOptions)}
        className="colorharmony-dropdownmenu"
      >
        <div className="colorharmony-title">
          {/* <h3>Color Harmony</h3> */}
          {/* this line of code will dispaly the selected color harmony  in box if we don't want display we can remove this and comment out above h3 tag*/}
          <h3>
            {selectedColorHarmony
              ? optionsForHarmony.find(
                  (opt) => opt.value === selectedColorHarmony
                ).label
              : "Color Harmony"}
          </h3>
        </div>
        <span
          style={{
            transform: showOptions ? "rotate(180deg)" : "",
          }}
          className="dropdown__icon"
        >
          <FaChevronDown />
        </span>
      </div>
      {showOptions && (
        <div className="dropdown__options">
          {optionsForHarmony.map((option) => (
            <p
              key={option.value}
              onClick={() => handleColorHarmonyChange(option.value)}
              className="dropdown__option"
            >
              {option.label}
            </p>
          ))}
        </div>
      )}
    </div>
  );
>>>>>>> 818d9fa507a8f4d4ffda37435afef3f48c611888
};

export default ColorHarmony;
