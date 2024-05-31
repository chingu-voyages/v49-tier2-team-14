import { useState } from "react";
import ColorPicker from "../ColorPicker/ColorPicker";
import SelectedColor from "../SelectedColor/SelectedColor";
import ColorHarmony from "../ColorHarmony/ColorHarmony";
import ColorContext from "../ColorHarmony/ColorContext";

export default function MainContent() {
  let colorPicker = useRef(null);
  const [colors, setColors] = useState("#ff0");
  const [harmonyColors, setHarmonyColors] = useState([]);


  const updateHarmonyColors = (colors) => {
    setHarmonyColors(colors);
  }
  return (
    <main>
      <ColorPicker
        colorPicker={colorPicker}
        setColors={setColors}
        colors={colors}
      />
      <DropdownMenu colorPicker={colorPicker} setColors={setColors} />
      <ColorHarmony setHarmonyColors={updateHarmonyColors} harmonyColors ={harmonyColors} />
      <SelectedColor
        colorPicker={colorPicker}
        colors={colors}
        setColors={setColors}
      />
          <ColorContext />
    </main>
  );
}

