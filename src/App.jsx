import React, { useState } from 'react';
import './App.css';
import { useMutation } from 'react-query';
import Post from './Post';
import client from './react-query-client';

export const fetcher = (url) => fetch(url).then((res) => res.json());
const timer = (duration) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('yooo');
    }, duration);
  });
};

function App() {
  const mutation = useMutation(() => timer(1000), {
    onSuccess(data) {
      console.log('request is complete', { data });
    },
    onError(err) {
      console.log('error completing request', { err });
    },
  });

  async function callMutation() {
    console.log('updating post');
    await mutation.mutateAsync();
    console.log('post updated');
  }

  return (
    <div className='App'>
      <h1>Mutations</h1>
      <button onClick={callMutation}>Submit</button>
    </div>
  );
}

export default App;
