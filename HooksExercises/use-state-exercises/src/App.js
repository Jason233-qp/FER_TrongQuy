import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import CounterComponent from "./components/CounterComponent";        // Exercise 1
import LightSwitchComponent from "./components/LightSwitchComponent"; // Exercise 2
import LoginFormComponent from "./components/LoginFormComponent";     // Exercise 3
import LoginForm2Component from "./components/LoginForm2Component";   // Exercise 4
import RegisterForm from "./components/RegisterForm";                 // Exercise 5
import SearchAccount from "./components/SearchAccount";               // Exercise 6
import SearchItemComponent from "./components/SearchItemComponent";   // Exercise 7

function App() {
  const sectionStyle = {
    border: "2px solid #e0e0e0",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "30px",
    background: "#fdfdfd",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  };

  const titleStyle = {
    textAlign: "center",
    color: "#1976d2",
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "16px",
  };

  return (
    <div className="App" style={{ maxWidth: 900, margin: "40px auto", padding: "20px" }}>
      <h1
        style={{
          textAlign: "center",
          fontSize: "30px",
          fontWeight: "bold",
          marginBottom: "40px",
          color: "#0d47a1",
        }}
      >
        🧩 React Exercises (1 → 7)
      </h1>

      <div style={sectionStyle}>
        <h2 style={titleStyle}>Exercise 1: Counter</h2>
        <CounterComponent />
      </div>

      <div style={sectionStyle}>
        <h2 style={titleStyle}>Exercise 2: Light Switch</h2>
        <LightSwitchComponent />
      </div>

      <div style={sectionStyle}>
        <h2 style={titleStyle}>Exercise 3: Login Form</h2>
        <LoginFormComponent />
      </div>

      <div style={sectionStyle}>
        <h2 style={titleStyle}>Exercise 4: Login Form 2</h2>
        <LoginForm2Component />
      </div>

      <div style={sectionStyle}>
        <h2 style={titleStyle}>Exercise 5: Search Item</h2>
        <SearchItemComponent />
      </div>

      <div style={sectionStyle}>
        <h2 style={titleStyle}>Exercise 6: Search Account</h2>
        <SearchAccount />
      </div>

      <div style={sectionStyle}>
        <h2 style={titleStyle}>Exercise 7: Register Form</h2>
        <RegisterForm />
      </div>
    </div>
  );
}

export default App;