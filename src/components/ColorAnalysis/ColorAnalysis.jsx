import classes from "./coloranalysis.module.css";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";

const ColorAnalysis = ({ setColors, colorPicker }) => {
  const [showOptions, setShowOptions] = useState(false);
  const optionsForAnalysis = ["One", "Two", "Three"];
  const options = { One: 1, Two: 2, Three: 3 };

  const clickHandler = (option) => {
    const value = options[option];
    setColors((prevColors) => {
      let newColors = [...prevColors];
      const additionalColors = ["#00ff00", "#0000ff"];

      if (newColors.length > value) {
        newColors = newColors.slice(0, value);
      }
      if (newColors.length < value) {
        additionalColors.forEach((color) => {
          if (newColors.length < value && !newColors.includes(color)) {
            newColors.push(color);
          }
        });
      }
      colorPicker.current.setColors(newColors);
      return newColors;
    });
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
    <div className={classes.analysis}>
      <div
        onClick={() => setShowOptions(!showOptions)}
        className={classes.dropdown}
        // style={{ height: showOptions ? "" : "40px" }}
      >
        <div className={dropdownTitleClass}>
          <h3>Number of colors</h3>
          <span className={dropdownIconClass}>
            <FaChevronDown />
          </span>
        </div>
        <div className={dropdownOptionClass}>
          {optionsForAnalysis.map((option) => (
            <p key={option} onClick={() => clickHandler(option)}>
              {option}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorAnalysis;
