import styles from "./selected-color.module.css";

export default function SelectedColor({ colorPicker, colors, setColors }) {
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

  return colors.map((color, i) => (
    <div key={i} className={styles.container}>
      <label className={styles.label}>
        <span
          className={styles.color}
          style={{
            backgroundColor: color,
          }}
        />
        <span>
          {colors.length === 1 ? "Selected color" : `${i + 1} Selected color`}
        </span>
      </label>
      <input
        type="text"
        name={`color-${i + 1}`}
        id={`color-${i + 1}`}
        placeholder="select color"
        value={color}
        onChange={(event) => handleColorInputChange(i, event.target.value)}
        className={styles.input}
      />
    </div>
  ));
}
