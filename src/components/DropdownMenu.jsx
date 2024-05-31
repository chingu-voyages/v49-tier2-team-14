import classes from "./DropdownMenu.module.css";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";

const DropdownMenu = ({ setColors, colorPicker }) => {
  const [showOptions, setShowOptions] = useState(false);
  const optionsForAnalysis = ["One", "Two", "Three"];
  const options = { One: 1, Two: 2, Three: 3 };

  const clickHandler = (option) => {
    const value = options[option];
    setColors((prevColors) => {
      let newColors = [...prevColors];

      if (prevColors.length < value) {
        const additionalColors = ["#00ff00", "#0000ff"];
        additionalColors.forEach((color) => {
          let isDuplicate = prevColors.some((prevColor) => prevColor === color);
          if (!isDuplicate) {
            newColors.push(color);
          }
        });
      }
      const finalColors = newColors.slice(0, value);
      colorPicker.current.setColors(finalColors);
      return finalColors;
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
    <>
      <div
        onClick={() => setShowOptions(!showOptions)}
        className={classes.dropdown}
      >
        <div className={dropdownTitleClass}>
          <h3>Colors for analysis</h3>
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
    </>
  );
};

export default DropdownMenu;