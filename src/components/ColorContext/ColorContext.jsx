import { useRef } from "react";
import classes from "./colorcontext.module.css";

const ColorContext = ({ context, setContext }) => {
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }

    setContext(e.target.value);
  };
  return (
    <div className={classes.colorcontext}>
      <h3 className={"label"}>Context</h3>
      <textarea
        ref={textareaRef}
        className={classes.textarea}
        placeholder="Type your purpose to get the best color combination."
        value={context}
        onChange={handleChange}
        rows={2}
        cols={2}
        required
      ></textarea>
    </div>
  );
};

export default ColorContext;
