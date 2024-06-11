import classes from "./coloranalysis.module.css";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";

const ColorAnalysis = ({ setNumberOfColors, setColors, colorPickerRef }) => {
  const [showOptions, setShowOptions] = useState(false);
  const optionsForAnalysis = ["One", "Two", "Three"];

  const clickHandler = (index) => {
    setShowOptions(false);
    const colorRows = index + 1;
    setNumberOfColors(colorRows);

    const colorToAdd = ["#ff0000"];
    if (colorRows >= 2) colorToAdd.push("#00ff00");
    if (colorRows >= 3) colorToAdd.push("#0000ff");

    setColors(colorToAdd.slice(0, colorRows));
    colorPickerRef.current.setColors(colorToAdd.slice(0, colorRows));
  };

  let dropdownOptionClass = classes["dropdown__options"];
  let dropdownIconClass = classes["dropdown__icon"];
  let dropdownTitleClass = classes["dropdown__title"];

  if (showOptions) {
    dropdownOptionClass = `${classes["dropdown__options"]} ${classes["active-options"]}`;
    dropdownIconClass = `${classes["dropdown__icon"]} ${classes["active-icon"]}`;
    dropdownTitleClass = `${classes["dropdown__title"]} ${classes["active-title"]}`;
  }

  return (
    <div className={classes.dropdown}>
      <div
        onClick={() => setShowOptions(!showOptions)}
        className={dropdownTitleClass}
      >
        <span>Color for analysis</span>
        <span className={dropdownIconClass}>
          <FaChevronDown />
        </span>
      </div>
      {showOptions && (
        <div className={dropdownOptionClass}>
          {optionsForAnalysis.map((option, i) => (
            <p key={option} onClick={() => clickHandler(i)}>
              {option}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorAnalysis;
