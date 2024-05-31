import iro from "@jaames/iro";
import { useEffect, useRef } from "react";
import styles from "./color-picker.module.css";

export default function ColorPicker({ colorPicker, setColors, colors }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    if (!colorPicker.current) {
      colorPicker.current = new iro.ColorPicker(ref.current, {
        width: 250,
        colors: colors,
        handleRadius: 9,
        borderWidth: 1,
        borderColor: "#fff"
      });

      colorPicker.current.on("color:change", () => {
        const updatedColors = colorPicker.current.colors.map(
          (c) => c.hexString
        );
        setColors(updatedColors);
      });
    }
  }, [colors]);

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