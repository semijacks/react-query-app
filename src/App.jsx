import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useQuery } from 'react-query';

const fetcher = (repo) => {
  return fetch(`https://api.github.com/repos/${repo}`).then((res) =>
    res.json()
  );
};

function App() {
  const [repoName, setRepoName] = useState('');

  const { isLoading, data } = useQuery(['github-data', repoName], () =>
    fetcher(repoName)
  );

  if (isLoading) {
    return (
      <div className='App'>
        <input
          type='text'
          value={repoName}
          onChange={(e) => setRepoName(e.target.value)}
        />
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className='App'>
      <input
        type='text'
        value={repoName}
        onChange={(e) => setRepoName(e.target.value)}
      />
      <h2>Name: {data.name}</h2>
      <div>
        <h2>Description</h2>
        <p>{data.description}</p>
      </div>
    </div>
  );
}

export default App;
