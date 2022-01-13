import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useQuery } from 'react-query';

function Button() {
  const { data, error } = useQuery('hello world', () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(Math.random()), 1000);
    });
  });

  console.log({ data, error });
  return <button>I am a button {data}</button>;
}

function App() {
  const [visible, setVisible] = useState(true);

  function toggleButton() {
    setVisible((visible) => !visible);
  }

  return (
    <div className='App'>
      <header className='App-header'>
        {visible && <Button />}
        <button onClick={toggleButton}>toggle button</button>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <span
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Hello from codedamn
        </span>
      </header>
    </div>
  );
}

export default App;
