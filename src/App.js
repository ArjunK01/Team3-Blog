import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./components/HomePage";
import "./App.css";
import ContextWrapper from "./components/ContextWrapper";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <ContextWrapper>
        <Navigation />
      </ContextWrapper>
      <Footer />
    </div>
  );
}

export default App;
