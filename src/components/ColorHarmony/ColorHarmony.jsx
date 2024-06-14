import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import classes from "./colorHarmony.module.css";

const ColorHarmony = ({ selectedColorHarmony, setSelectedColorHarmony }) => {
  const [showOptions, setShowOptions] = useState(false);

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

  // useEffect(() => {
  //   setSelectedColorHarmony("");
  // }, []);

  return (
    <div className="colorharmony">
      <h3 className="label">Color Harmony</h3>
      <div
        onClick={() => setShowOptions(!showOptions)}
        className={classes.colorharmony_dropdownmenu}
      >
        <div className={classes.colorharmony_title}>
          <span>
            {selectedColorHarmony
              ? optionsForHarmony.find(
                  (opt) => opt.value === selectedColorHarmony
                ).label
              : "Color Harmony"}
          </span>
        </div>
        <span
          style={{
            transform: showOptions ? "rotate(180deg)" : "",
          }}
          className={classes.dropdown_icon}
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
};

export default ColorHarmony;
