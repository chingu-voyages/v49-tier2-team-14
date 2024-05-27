import React, { useEffect, useRef, useState } from "react";
import iro from "@jaames/iro";
import classes from "./ColorPicker.module.css";
import DropdownMenu from "./DropdownMenu";

const ColorPicker = ({ onColorChange }) => {
  const [colors, setColors] = useState(["#ff0000"]);
  const colorPickerRef = useRef(null);

  useEffect(() => {
    if (!colorPickerRef.current.iroInstance) {
      colorPickerRef.current.iroInstance = new iro.ColorPicker(
        colorPickerRef.current,
        {
          width: 250,
          colors: colors,
          handleRadius: 9,
          borderWidth: 1,
          borderColor: "#fff",
        }
      );

      colorPickerRef.current.iroInstance.on("color:change", (color) => {
        onColorChange(color.hexString);
        const updatedColors = colorPickerRef.current.iroInstance.colors.map(
          (c) => c.hexString
        );
        setColors(updatedColors);
      });
    }
  }, [onColorChange]);

  return (
    <>
      <div ref={colorPickerRef}></div>
      <DropdownMenu
        colors={colors}
        setColors={setColors}
        colorPickerRef={colorPickerRef}
      />
      <div>
        {colors.map((color, i) => (
          <div key={i} className={classes.row}>
            <div
              style={{ backgroundColor: color }}
              className={classes.circle}
            ></div>
            <p>
              {i + 1} Selected color {color}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ColorPicker;
