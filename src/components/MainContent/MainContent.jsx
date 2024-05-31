import { useState } from "react";
import ColorPicker from "../ColorPicker/ColorPicker";
import SelectedColor from "../SelectedColor/SelectedColor";
import ColorHarmony from "../ColorHarmony/ColorHarmony";
import ColorContext from "../ColorHarmony/ColorContext";

export default function MainContent() {
  const [color, setColor] = useState("#ff0");
  const [harmonyColors, setHarmonyColors] = useState([]);

  const updateColors = (value) => {
    setColor(value);
  };
  const updateHarmonyColors = (colors) => {
    setHarmonyColors(colors);
  }
  
  return (
    <main>
      <ColorPicker value={color}  onChange={updateColors} />
      <SelectedColor color={color} updateColors={updateColors} />
      <ColorHarmony baseColor={color} setHarmonyColors={updateHarmonyColors} harmonyColors ={harmonyColors} />
    <ColorContext />
    </main>
  );
}
