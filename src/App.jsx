import React, { useState } from 'react';
import './App.css';
import { useMutation } from 'react-query';
import Post from './Post';
import client from './react-query-client';

export const fetcher = (url) => fetch(url).then((res) => res.json());
const timer = (duration) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
      console.log(' i was run');
    }, duration);
  });
};

function App() {
  const mutation = useMutation(() => timer(1000));

  async function callMutation() {
    console.log('about to call mutation');
    await mutation.mutateAsync();
    console.log('mutation called');
  }

  return (
    <div className='App'>
      <h1>Mutations</h1>
      <button onClick={callMutation}>Submit</button>
    </div>
  );
}

export default App;
