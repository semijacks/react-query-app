import React from 'react';
import './App.css';
import { useQuery, useMutation } from 'react-query';
import client from './react-query-client';

const baseUrl = 'http://localhost:1337';

const fetcher = (url, body) =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

function App() {
  const [inputLang, setInputLang] = React.useState('');
  const mutation = useMutation(
    (body) => fetcher(`${baseUrl}/api/add-record`, body),
    {
      onSuccess(data) {
        console.log('Got response from backend', data);
        setInputLang('');
        client.invalidateQueries('favLangs');
      },
      onError(error) {
        console.log('Got error from backend', error);
      },
    }
  );

  const {
    data: favLangs,
    isLoading,
    isError,
  } = useQuery(
    'favLangs',
    () => {
      return fetch(`${baseUrl}/api/get-records`).then((t) => t.json());
    },
    {
      select: (data) => data.langs,
    }
  );

  function callMutation() {
    mutation.mutate({ record: inputLang });
  }

  if (isError) {
    return <p>Error with request</p>;
  }

  return (
    <div className='App'>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1>Some favorite languages</h1>
          {favLangs.map((lang) => {
            return <li key={lang}>{lang}</li>;
          })}
          <input
            type='text'
            value={inputLang}
            onChange={(e) => setInputLang(e.target.value)}
          />
          <button onClick={callMutation}>Submit</button>
        </>
      )}
    </div>
  );
}

export default App;
