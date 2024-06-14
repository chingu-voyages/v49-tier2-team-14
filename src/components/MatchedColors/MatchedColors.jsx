import styles from "../SelectedColor/selected-color.module.css";

const MatchedColors = ({ matchedColors }) => {
  return (
    <div>
      {matchedColors.map((color, i) => (
        <div key={i} className={styles.selected_color}>
          <label className={styles.label}>
            <span
              className={styles.color}
              style={{
                backgroundColor: color,
              }}
            />
            <span>
              Matched color {matchedColors.length > 1 ? `(${i + 1})` : ""}
            </span>
          </label>
          <p className={styles.color_hex_field}>{color}</p>
        </div>
      ))}
    </div>
  );
};

export default MatchedColors;
