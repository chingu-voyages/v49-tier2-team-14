<<<<<<< HEAD
import Footer from "./components/Footer";
import Header from "./components/Header";
import ColorPicker from "./components/ColorPicker";
import { useState } from "react";
=======
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
>>>>>>> 07072579de0f9547ebc2fdfdccf74dfbe9cd8c98

function App() {
  const [selectedColor, setSelectedColor] = useState("");

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  return (
    <>
      <Header />
<<<<<<< HEAD
      <h1>Hello I'm a test app</h1>
      <ColorPicker onColorChange={handleColorChange} />
=======
      <MainContent />
>>>>>>> 07072579de0f9547ebc2fdfdccf74dfbe9cd8c98
      <Footer />
    </>
  );
}

export default App;
