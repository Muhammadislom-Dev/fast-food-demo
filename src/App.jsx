import "./App.css";
import Homepage from "./Page/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/">
          <Homepage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
