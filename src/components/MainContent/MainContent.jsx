import Groq from "groq-sdk";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import ColorAnalysis from "../ColorAnalysis/ColorAnalysis";
import ColorContext from "../ColorContext/ColorContext";
import ColorHarmony from "../ColorHarmony/ColorHarmony";
import ColorPicker from "../ColorPicker/ColorPicker";
import MatchedColors from "../MatchedColors/MatchedColors";
import SelectedColor from "../SelectedColor/SelectedColor";
import styles from "./main.module.css";

const apiKey = import.meta.env.VITE_GROQ_API_KEY;

const groq = new Groq({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true,
});

const hexRegex = /#[0-9a-f]{6}\b/gi;

export default function MainContent() {
  let colorPicker = useRef(null);
  const ref = useRef(null);
  const [colors, setColors] = useState(["#ff0000"]);
  const [context, setContext] = useState("");
  const [selectedColorHarmony, setSelectedColorHarmony] = useState("");
  const [matchedColors, setMatchedColors] = useState([]);
  const [numberOfColors, setNumberOfColors] = useState(1);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const triggerApiCall = async (e) => {
    e.preventDefault();
    try {
      setError(false);
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
            content: `In 100 to 150 words, advise me on the best matching colors that are ${selectedColorHarmony} harmony to the color(s) ${colors
              .slice(0, numberOfColors)
              .toString()}. Format your response for each received color as: 'The best matching color(s) for #value(s) is/are #value(s)' with a brief explanation of how and why these colors complement each other in the context of ${context}.`,
          },
        ],
        model: "llama3-8b-8192",
        temperature: 1,
        max_tokens: 1024,
        top_p: 1,
        stop: null,
      });

      const messageContent = chatCompletion.choices[0].message.content;

      if (messageContent.length < 400) {
        setError("The description is too short. Please try again.");
        setLoading(false);
        window.scrollTo({ top: 200, behavior: "smooth" });
        return;
      }
      setResponse(messageContent);
      const allHexCodes = messageContent.match(hexRegex);

      const uniqueMatchedColors = allHexCodes.filter(onlyMatchedColors);

      window.scrollTo({ top: 200, behavior: "smooth" });

      setMatchedColors((prevMatchedColors) => {
        const newMatchedColors = [...prevMatchedColors];

        uniqueMatchedColors.forEach((color) => {
          if (!newMatchedColors.includes(color)) {
            newMatchedColors.push(color);
          }
        });
        return newMatchedColors;
      });

      const updatedColors = colors.slice(0, numberOfColors);
      uniqueMatchedColors.forEach((color) => {
        if (!updatedColors.includes(color)) {
          updatedColors.push(color);
        }
      });

      colorPicker.current.setColors(updatedColors);
    } catch (error) {
      setError(true);
      if (error.response && error.response.status === 429) {
        setError("You have exceeded the rate limit. Please try again later.");
        toast.error(
          "You have exceeded the rate limit. Please try again later."
        );
      } else {
        setError(error.message);
        toast.error(`Error fetching completion: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const onlyMatchedColors = (word) => {
    if (word[0] !== "#") return false;
    if (word.length !== 7) return false;
    if (colors.includes(word)) return false;

    return word;
  };

  return (
    <form onSubmit={triggerApiCall} className={styles.main_content}>
      <ColorPicker
        colorPicker={colorPicker}
        setColors={setColors}
        colors={colors}
        description={response}
        error={error}
      />
      <div className={styles.main_section} ref={ref}>
        <div className={styles.row_color}>
          <SelectedColor
            numberOfColors={numberOfColors}
            colorPicker={colorPicker}
            colors={colors}
            setColors={setColors}
          />

          <MatchedColors
            matchedColors={matchedColors}
            setMatchedColors={setMatchedColors}
          />
        </div>
        <div className={styles.row}>
          <ColorAnalysis
            setNumberOfColors={setNumberOfColors}
            colorPickerRef={colorPicker}
            setColors={setColors}
          />

          <ColorContext context={context} setContext={setContext} />
        </div>
        <ColorHarmony
          selectedColorHarmony={selectedColorHarmony}
          setSelectedColorHarmony={setSelectedColorHarmony}
        />
        <button
          disabled={loading}
          className={styles.submit_button}
          type="submit"
        >
          {loading ? "Finding colors..." : "Let's Glow!"}
        </button>
      </div>
    </form>
  );
}
