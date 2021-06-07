import Navigation from "./components/Navigation";
import Home from "./components/HomePage";
import "./App.css";
import ContextWrapper from "./components/ContextWrapper";

function App() {
  return (
    <div className="App">
      <ContextWrapper>
        <Navigation />
      </ContextWrapper>
      <Router>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
