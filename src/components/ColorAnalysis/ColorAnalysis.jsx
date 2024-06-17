import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import classes from "./coloranalysis.module.css";

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

  let dropdownOptionClass = classes.dropdown_options;
  let dropdownIconClass = classes.dropdown_icon;
  let dropdownTitleClass = classes.dropdown_title;

  if (showOptions) {
    dropdownOptionClass = `${classes.dropdown_options} ${classes.active_options}`;
    dropdownIconClass = `${classes.dropdown_icon} ${classes.active_icon}`;
    dropdownTitleClass = `${classes.dropdown_title} ${classes.active_title}`;
  }

  return (
    <div>
      <h3 className={"label"}>Number of colors</h3>

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
              <p
                key={option}
                onClick={() => clickHandler(i)}
                className={classes.dropdown_options_p}
              >
                {option}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorAnalysis;
