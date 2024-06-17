import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";

function App() {
  return (
    <>
      <Toaster position="top-left" />
      <Header />
      <MainContent />
      <Footer />
    </>
  );
}

export default App;
