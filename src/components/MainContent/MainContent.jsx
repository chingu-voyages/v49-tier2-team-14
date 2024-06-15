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
            content: `In 100 to 150 words, advise me on the best matching colors that are ${selectedColorHarmony} harmony to the color(s) ${colors.toString()}. Format your response as: 'The best matching color(s) for #value(s) is/are #value(s)' with a brief explanation of how and why these colors complement each other in the context of ${context}.`,
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

      // extract all hexcodes from ai response
      const allHexCodes = messageContent.match(hexRegex);

      const matchedColors = allHexCodes.filter(onlyMatchedColors);

      window.scrollTo({ top: 20, behaviour: "smooth" });

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

      // toast.success("completed!");
    } catch (error) {
      toast.error(`Error fetching completion: ${error?.message}`);
    } finally {
      setLoading(false);
    }
  };

  const onlyMatchedColors = (word) => {
    if (word[0] !== "#") return false;
    if (colors.includes(word)) return false;
    if (word.length !== 7) return false;

    return word;
  };

  return (
    <form onSubmit={triggerApiCall} className={styles.main_content}>
      <ColorPicker
        colorPicker={colorPicker}
        setColors={setColors}
        colors={colors}
        description={response}
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

        <button className={styles.submit_button} type="submit">
          {loading ? "Finding colors..." : "Let's Glow!"}
        </button>
      </div>
    </form>
  );
}
