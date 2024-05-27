import { useState } from "react";
import ColorPicker from "../ColorPicker/ColorPicker";
import SelectedColor from "../SelectedColor/SelectedColor";

export default function MainContent() {
  const [color, setColor] = useState("#ff0");

  const updateColors = (value) => {
    setColor(value);
  };
  return (
    <main>
      <ColorPicker value={color} onChange={updateColors} />

      <SelectedColor color={color} updateColors={updateColors} />
    </main>
  );
}
