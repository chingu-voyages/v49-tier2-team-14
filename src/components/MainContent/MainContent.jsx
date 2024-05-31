import { useState } from "react";
import ColorPicker from "../ColorPicker/ColorPicker";
import SelectedColor from "../SelectedColor/SelectedColor";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { useRef } from "react";
import styles from "./main.module.css";

export default function MainContent() {
  const [colors, setColors] = useState(["#ff0000"]);
  let colorPicker = useRef(null);

  return (
    <main>
      <ColorPicker
        colorPicker={colorPicker}
        setColors={setColors}
        colors={colors}
      />
      <DropdownMenu colorPicker={colorPicker} setColors={setColors} />
      <SelectedColor
        colorPicker={colorPicker}
        colors={colors}
        setColors={setColors}
      />
    </main>
  );
}
