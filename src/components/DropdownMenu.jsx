import classes from "./DropdownMenu.module.css";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";

const DropdownMenu = ({ setColors, colorPickerRef }) => {
  const [numberOfColor, setNumberOfColor] = useState("Color for analysis");
  const [showOptions, setShowOptions] = useState(false);
  const optionsForAnalysis = ["Color for analysis", "One", "Two", "Three"];

  const clickHandler = (color, index) => {
    setNumberOfColor(color);

    if (index === 0) index = 1;
    const colorsOnWheel = colorPickerRef.current.iroInstance.colors.map(
      (c) => c.hexString
    );
    const colorToAdd = ["#ff0000"];
    if (index === 2) colorToAdd.push("#00ff00");
    if (index === 3) colorToAdd.push("#0000ff");

    // Add missing colors if they are not already present
    colorToAdd.forEach((col) => {
      if (!colorsOnWheel.includes(col)) {
        colorsOnWheel.push(col);
        colorPickerRef.current.iroInstance.addColor(col);
      }
    });

    colorPickerRef.current.iroInstance.setColors(colorsOnWheel.slice(0, index));
    setColors(colorsOnWheel.slice(0, index));
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
          <span>{numberOfColor}</span>
          <span className={dropdownIconClass}>
            <FaChevronDown />
          </span>
        </div>
        <div className={dropdownOptionClass}>
          {optionsForAnalysis.map((color, i) => (
            <p key={color} onClick={() => clickHandler(color, i)}>
              {color}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default DropdownMenu;
