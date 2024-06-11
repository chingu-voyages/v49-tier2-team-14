import styles from "../SelectedColor/selected-color.module.css";

const MatchedColors = ({ matchedColors }) => {
  return (
    <div>
      {matchedColors.map((color, i) => (
        <div key={i} className={styles["selected-color"]}>
          <label className={styles.label}>
            <span
              className={styles.color}
              style={{
                backgroundColor: color,
              }}
            />
            <h1>{`${i + 1} Matched color`}</h1>
          </label>
          <p
            style={{ paddingTop: "8px" }}
            className={styles["color-hex-field"]}
          >
            {color}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MatchedColors;
