import iro from "@jaames/iro";
import { useEffect, useRef } from "react";
import styles from "./color-picker.module.css";

export default function ColorPicker({ value = "#f00", onChange = () => {} }) {
  const ref = useRef(null);
  let colorPicker = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    if (!colorPicker.current) {
      colorPicker.current = new iro.ColorPicker(ref.current, {
        width: 320,
        color: value,
      });

      if (!colorPicker.current) return;
      colorPicker.current.on("color:change", (color) => {
        onChange(color.hexString);
      });
    } else if (value !== colorPicker.current.color.hexString) {
      // confirm that user input starts with # and is either this format (#ff0) or (#ffff00)
      if ((value.includes("#") && value.length === 4) || value.length === 7) {
        colorPicker.current.color.set(value);
      }
    }
  }, [value]);

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
