import LogoIcon from "components/LogoIcon";
import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LogoIcon scale="50%" />
        <h1>NUSMentors</h1>
        <span>This is a placeholder homepage.</span>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </header>
    </div>
  );
}

export default App;
