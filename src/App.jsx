import Footer from "./components/Footer";
import Header from "./components/Header";
import ColorPicker from "./components/ColorPicker";
import { useState } from "react";

function App() {
  const [selectedColor, setSelectedColor] = useState("");

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  return (
    <>
      <Header />
      <h1>Hello I'm a test app</h1>
      <ColorPicker onColorChange={handleColorChange} />
      <Footer />
    </>
  );
}

export default App;
