import { useState, useRef } from "react";
import "./colorcontext.css";

const ColorContext = () => {
  const [context, setContext] = useState("");
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
    <div className="colorcontext">
      <h1 className="colorcontext-h1">Context</h1>
      <textarea
        ref={textareaRef}
        className="colorcontext-input"
        placeholder="Type your purpose to get the best color combination."
        value={context}
        onChange={handleChange}
        required
      />
    </div>
  );
};

export default ColorContext;
