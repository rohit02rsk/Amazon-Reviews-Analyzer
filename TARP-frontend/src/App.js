import "./App.css";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResultPage from "./pages/ResultPage";
import SamplePage from "./pages/SamplePage";
// import AboutPage from "./pages/AboutPage"

// import data from "./response.json";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/sample" element={<SamplePage />} />
          {/* <Route path="/about" element={<AboutPage />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
