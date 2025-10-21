import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Dùng Bootstrap
import './App.css'; // Nếu bạn có CSS tùy chỉnh

// Import các component
import CounterComponent from './components/CounterComponent';
import LightSwitchComponent from './components/LightSwitchComponent';
import QuestionBank from './components/QuestionBank';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm'; // Thêm dòng này

function App() {
  const sectionStyle = {
    border: '1px solid #ddd',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '40px',
    background: '#f9f9f9',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
  };

  const titleStyle = {
    textAlign: 'center',
    color: '#0d6efd',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  };

  return (
    <div className="App" style={{ maxWidth: '900px', margin: '40px auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', fontSize: '32px', fontWeight: 'bold', marginBottom: '50px', color: '#0d6efd' }}>
        🧩 React useReducer Exercises
      </h1>

      <div style={sectionStyle}>
        <h2 style={titleStyle}>Counter</h2>
        <CounterComponent />
      </div>

      <div style={sectionStyle}>
        <h2 style={titleStyle}>Light Switch</h2>
        <LightSwitchComponent />
      </div>

      <div style={sectionStyle}>
        <h2 style={titleStyle}>Question Bank</h2>
        <QuestionBank />
      </div>

      <div style={sectionStyle}>
        <h2 style={titleStyle}>Login Form</h2>
        <LoginForm />
      </div>

      <div style={sectionStyle}>
        <h2 style={titleStyle}>Sign Up Form</h2>
        <SignUpForm />
      </div>
    </div>
  );
}

export default App;