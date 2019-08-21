import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import "./styles.css";
import Games from "./components/Games";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import Header from "./components/Header";
import Streams from "./components/Streams";
import GamesStreams from "./components/GamesStreams";
function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Route path="/" exact component={Games} />
        <Route path="/top-streams" exact component={Streams} />
        <Route path="/game/:id" exact component={GamesStreams} />
      </div>
    </BrowserRouter>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
