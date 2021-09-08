import Navbar from "./components/SharedPageComponents/Navbar";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Roulette from "./Pages/Roulette";
import Login from "./Pages/Login";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Switch>
          <Route path="/roulette" component={Roulette} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
