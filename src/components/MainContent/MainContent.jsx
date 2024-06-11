import { useState, useRef, useEffect } from "react";
import ColorPicker from "../ColorPicker/ColorPicker";
import SelectedColor from "../SelectedColor/SelectedColor";
import ColorHarmony from "../ColorHarmony/ColorHarmony";
import ColorContext from "../ColorContext/ColorContext";
import ColorAnalysis from "../ColorAnalysis/ColorAnalysis";
import MatchedColors from "../MatchedColors/MatchedColors";
import styles from "./main.module.css";
import Groq from "groq-sdk";

export default function MainContent() {
  let colorPicker = useRef(null);
  const [colors, setColors] = useState(["#ffff00"]);
  const [context, setContext] = useState("");
  const [selectedColorHarmony, setSelectedColorHarmony] = useState("");
  const [matchedColors, setMatchedColors] = useState([]);
  const [numberOfColors, setNumberOfColors] = useState(1);
  const [response, setResponse] = useState("");
  const apiKey = "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";

  const groq = new Groq({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  });

  const triggerApiCall = async (e) => {
    e.preventDefault();
    try {
      setMatchedColors([]);
      colorPicker.current.setColors(colors);
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are a color coordinating expert who provides responses in two sections. First for hex strings of matched colors and second for an overall description.",
          },
          {
            role: "user",
            content: `Advise me on the best matching color for each color from ${colors}. It needs to be like 'Best matching color for #000000 is #ffffff' with a short explanation of how and why these colors go together for ${context}. Hex codes of colors can only be used in the first section. In the overall description, give appropriate text and use color names only!`,
          },
        ],
        model: "llama3-8b-8192",
        temperature: 1,
        max_tokens: 1024,
        top_p: 1,
        stop: null,
      });

      const messageContent = chatCompletion.choices[0].message.content;
      setResponse(messageContent);

      let words = messageContent.split(/\s+/);

      const charsToCheck = [",", "*", ":", ")", "\n", "."];

      const removeTrailingChars = (word, charsToRemove) => {
        if (charsToRemove.some((char) => word.endsWith(char))) {
          return removeTrailingChars(word.slice(0, -1), charsToRemove);
        }
        return word;
      };

      words = words.map((word) => removeTrailingChars(word, charsToCheck));

      const onlyMatchedColors = (word) => {
        if (word[0] !== "#") return false;
        if (colors.includes(word)) return false;
        if (word.length !== 7) return false;

        return word;
      };

      const matchedColors = words.filter(onlyMatchedColors);

      setMatchedColors((prevMatchedColors) => {
        const updatedColors = [...prevMatchedColors];
        matchedColors.forEach((color) => {
          if (!updatedColors.includes(color)) {
            updatedColors.push(color);
          }
        });
        updatedColors.forEach((color) => {
          if (!colorPicker.current.colors.includes(color)) {
            colorPicker.current.addColor(color);
          }
        });
        return updatedColors;
      });
    } catch (error) {
      console.error("Error fetching completion:", error);
    }
  };

  return (
    <form className={styles["main-content"]} onSubmit={triggerApiCall}>
      <ColorPicker
        colorPicker={colorPicker}
        setColors={setColors}
        colors={colors}
        description={response}
      />
      <div>
        <div className={styles.row}>
          <div>
            <SelectedColor
              numberOfColors={numberOfColors}
              colorPicker={colorPicker}
              colors={colors}
              setColors={setColors}
            />
            <ColorContext context={context} setContext={setContext} />
          </div>
          <div>
            <MatchedColors
              matchedColors={matchedColors}
              setMatchedColors={setMatchedColors}
            />
          </div>
        </div>
        <div className={styles.row}>
          <ColorHarmony
            selectedColorHarmony={selectedColorHarmony}
            setSelectedColorHarmony={setSelectedColorHarmony}
          />
          <ColorAnalysis
            setNumberOfColors={setNumberOfColors}
            colorPickerRef={colorPicker}
            setColors={setColors}
          />
        </div>
      </div>
      <button className={styles["submit-button"]} type="submit">
        Let's Glow!
      </button>
    </form>
  );
}
