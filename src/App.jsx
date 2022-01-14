import React from 'react';
import './App.css';
import { useMutation } from 'react-query';

export const fetcher = (url) => fetch(url).then((res) => res.json());
const timer = (duration, param) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('yooo');
      console.log('hello from timer', { param });
    }, duration);
  });
};

function App() {
  const mutation = useMutation((param) => timer(1000, param), {
    onSuccess(data) {
      console.log('request is complete from mutate', { data });
    },
    onError(error) {
      console.log('error completing request from mutate', { error });
    },
    onSettled(data, error) {
      console.log('request either successful or erred from mutate');
    },
  });

  function callMutation() {
    console.log('updating post');
    mutation.mutate(90, {
      onSuccess(data) {
        console.log('request is complete from mutate', { data });
      },
      onError(error) {
        console.log('error completing request from mutate', { error });
      },
      onSettled(data, error) {
        console.log('request either successful or erred from mutate');
      },
    });
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
