import styles from "./selected-color.module.css";

export default function SelectedColor({
  numberOfColors,
  colorPicker,
  colors,
  setColors,
}) {
  const handleColorInputChange = (index, newColor) => {
    if (newColor.length < 1 || newColor.length > 7) return;

    if (newColor.length === 7 && newColor !== colors[index]) {
      colorPicker.current.colors[index].set(newColor);
    } else {
      const tempColors = [...colors];
      tempColors[index] = newColor;
      setColors(tempColors);
    }
  };

  return (
    <div>
      {colors.slice(0, numberOfColors)?.map((color, i) => (
        <div key={i} className={styles.selected_color}>
          <label className={styles.label}>
            <span
              className={styles.color}
              style={{
                backgroundColor: color,
              }}
            />
            <span>
              {colors.length === 1
                ? "Selected color"
                : `Selected color (${i + 1})`}
            </span>
          </label>
          <input
            type="text"
            name={`color-${i + 1}`}
            id={`color-${i + 1}`}
            placeholder="select color"
            value={color}
            onChange={(event) => handleColorInputChange(i, event.target.value)}
            className={styles.color_hex_field}
          />
        </div>
      ))}
    </div>
  );
}
