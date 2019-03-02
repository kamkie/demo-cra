import logo from "../logo.svg";
import Navbar from "../components/Navbar";
import React, {ReactChild} from "react";

interface HomeProps {
  message?: ReactChild
}

export default (props: HomeProps) => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo"/>
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      {props.message}
      <Navbar/>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  </div>
);
