import styles from "./selected-color.module.css";

export default function SelectedColor({ color = "", updateColors = () => {} }) {
  return (
    <div className={styles.container}>
      <label className={styles.label}>
        <span
          className={styles.color}
          style={{
            backgroundColor: color,
          }}
        />
        <span>Selected color</span>
      </label>
      <input
        type="text"
        name={`color-`}
        id={`color-}`}
        placeholder="select color"
        value={color}
        onChange={(event) => updateColors(event.target.value)}
        className={styles.input}
      />
    </div>
  );
}
