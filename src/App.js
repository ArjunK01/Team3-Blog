import Navigation from "./components/Navigation";
import "./App.css";
import ContextWrapper from "./components/ContextWrapper";

function App() {
  return (
    <div className="App">
      <ContextWrapper>
        <Navigation />
      </ContextWrapper>
    </div>
  );
}

export default App;
