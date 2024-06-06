import { useState, useRef } from "react";
import ColorPicker from "../ColorPicker/ColorPicker";
import SelectedColor from "../SelectedColor/SelectedColor";
import ColorHarmony from "../ColorHarmony/ColorHarmony";
import ColorContext from "../ColorContext/ColorContext";
import ColorAnalysis from "../ColorAnalysis/ColorAnalysis";
import styles from "./main.module.css";

export default function MainContent() {
  let colorPicker = useRef(null);
  const [colors, setColors] = useState(["#ff0"]);
  // const [harmonyColors, setHarmonyColors] = useState([]);

  // const updateHarmonyColors = (colors) => {
  //   setHarmonyColors(colors);
  // }
  return (
    <>
      <ColorPicker
        colorPicker={colorPicker}
        setColors={setColors}
        colors={colors}
      />
      <div className={styles.row}>
        <div>
          <SelectedColor
            colorPicker={colorPicker}
            colors={colors}
            setColors={setColors}
          />
          <ColorAnalysis colorPicker={colorPicker} setColors={setColors} />
        </div>
        <div>
          <ColorContext />
          <ColorHarmony />
        </div>
      </div>
    </>
  );
}
