import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";

function App() {
  return (
    <div className="container">
      <Header />
      <h1 style={{alignItems:"center",padding:"20px "}}>Hello I am a test app</h1>
     <MainContent />
     
      <Footer />
    </div>
  );
}

export default App;
