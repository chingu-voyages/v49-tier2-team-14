import { useState, useRef } from "react";
import ColorPicker from "../ColorPicker/ColorPicker";
import SelectedColor from "../SelectedColor/SelectedColor";
import ColorHarmony from "../ColorHarmony/ColorHarmony";
import ColorContext from "../ColorContext/ColorContext";
import ColorAnalysis from '../ColorAnalysis/ColorAnalysis';
import styles  from './main.module.css';

export default function MainContent() {
  let colorPicker = useRef(null);
  const [colors, setColors] = useState(["#ff0"]);
  // const [harmonyColors, setHarmonyColors] = useState([]);


  // const updateHarmonyColors = (colors) => {
  //   setHarmonyColors(colors);
  // }
  return (
    <main className={styles.main}>
    <div className={styles.container}>
      <ColorPicker
        colorPicker={colorPicker}
        setColors={setColors}
          colors={colors}
         
      />
      <div  className={styles.container1}>
        <div className={styles.item1}>
        <SelectedColor
        colorPicker={colorPicker}
        colors={colors}
        setColors={setColors}
        />
     </div >
      <div className={styles.item2}>
          <ColorContext />
      </div>
          </div>
       
      <div className={styles.item3} >
       
        <ColorAnalysis colorPicker={colorPicker} setColors={setColors} />
      
      <ColorHarmony />
      </div>
          
        </div>
    </main>
  
      );
}

