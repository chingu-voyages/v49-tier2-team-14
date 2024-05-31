import iro from "@jaames/iro";
import { useEffect, useRef } from "react";
import styles from "./color-picker.module.css";

<<<<<<< HEAD
export default function ColorPicker({ value = "#f00", harmonyColors=[], onChange = () => {} }) {
=======
export default function ColorPicker({ colorPicker, setColors, colors }) {
>>>>>>> f65d6713c8f1a301e2e12a52168c3fabf9e24544
  const ref = useRef(null);

  useEffect(() => {
    if (!colorPicker.current) {
      colorPicker.current = new iro.ColorPicker(ref.current, {
        width: 400,
        colors: colors,
        handleRadius: 10,
        activeHandleRadius: 13,
        borderWidth: 1,
        borderColor: "#000",
      });

      colorPicker.current.on("color:change", () => {
        const updatedColors = colorPicker.current.colors.map(
          (c) => c.hexString
        );
        setColors(updatedColors);
      });
    }
<<<<<<< HEAD
    if (harmonyColors.length > 0) {
      colorPicker.current.setColors(harmonyColors);
    }
  }, [value,harmonyColors]);
=======
  }, [colors]);
>>>>>>> f65d6713c8f1a301e2e12a52168c3fabf9e24544

  return (
    <section className={styles.container}>
      <div ref={ref} />
      <p className={styles.text}>
        Fill out the form below to get advice on glowing color combinations for
        your chosen context.
      </p>
    </section>
  );
}
