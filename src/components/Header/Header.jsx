import styles from "./header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.heading}>GlowGuide</h1>
      <h2 className={styles.subheading}>Your color matching friend</h2>

      <p className={styles.description}>
        Whether you’re restyling your wardrobe or painting your apartment,
        GlowGuide’s AI technology acts as a smart assistant to give you
        complementary colors for any situation.
      </p>
    </header>
  );
}

export default Header;