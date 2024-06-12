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
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiKey = "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";

  const groq = new Groq({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  });

  const triggerApiCall = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setMatchedColors([]);
      colorPicker.current.setColors(colors.slice(0, numberOfColors));
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are a color coordinating expert who provides responses in two sections. First for hex strings of matched colors and second for an overall description.",
          },
          {
            role: "user",
            content: `In 100 to 150 words, advise me on the best matching colors that are ${selectedColorHarmony} harmony to the color(s) ${colors.toString()}. Format your response as: 'The best matching color(s) for #000000 is/are #ffffff' with a brief explanation of how and why these colors complement each other in the context of ${context}.`,
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
      setLoading(false);

      let words = messageContent.split(/\s+/);

      const charsToCheck = [",", "*", ":", ")", "\n", "."];

      const removeLeadingAndTrailingChars = (word, charsToRemove) => {
        const startsWithChar = charsToRemove.some((char) =>
          word.startsWith(char)
        );
        const endsWithChar = charsToRemove.some((char) => word.endsWith(char));

        if (startsWithChar || endsWithChar) {
          if (startsWithChar) {
            word = word.slice(1);
          }
          if (endsWithChar) {
            word = word.slice(0, -1);
          }
          return removeLeadingAndTrailingChars(word, charsToRemove);
        }

        return word;
      };

      words = words.map((word) =>
        removeLeadingAndTrailingChars(word, charsToCheck)
      );
      console.log(words);
      const onlyMatchedColors = (word) => {
        if (word[0] !== "#") return false;
        if (colors.includes(word)) return false;
        if (word.length !== 7) return false;

        return word;
      };

      const matchedColors = words.filter(onlyMatchedColors);
      console.log(matchedColors);

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
    <div className={styles["main-content"]}>
      <form onSubmit={triggerApiCall}>
        <ColorPicker
          colorPicker={colorPicker}
          setColors={setColors}
          colors={colors}
          description={response}
        />
        <div className={styles["main-section"]}>
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

          <button className={styles["submit-button"]} type="submit">
            {loading ? "Finding colors..." : "Let's Glow!"}
          </button>
        </div>
      </form>
    </div>
  );
}
