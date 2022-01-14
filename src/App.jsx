import React, { useState } from 'react';
import './App.css';
import { useQuery } from 'react-query';
import Post from './Post';
import client from './react-query-client';

export const fetcher = (url) => fetch(url).then((res) => res.json());

function App() {
  const [postId, setPostId] = useState(null);

  const { isLoading, data: posts } = useQuery(
    'posts',
    () => fetcher(`https://jsonplaceholder.typicode.com/posts`),
    {
      select: (posts) => posts.slice(0, 5),
    }
  );

  if (postId !== null) {
    return <Post postId={postId} goBack={() => setPostId(null)} />;
  }

  function mutateTitle(id) {
    client.setQueryData(['post', id], (oldData) => {
      if (oldData) {
        return {
          ...oldData,
          title: 'boom boom boom mutated',
        };
      }
    });
  }

  return (
    <div className='App'>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        posts.map((post) => {
          const cachedPost = client.getQueryData(['post', post.id]);

          return (
            <p key={post.id}>
              <a onClick={() => setPostId(post.id)} href='#'>
                {post.id} - {post.title}
              </a>
              {cachedPost ? '(visited)' : ''}
              <button onClick={() => mutateTitle(post.id)}>Mutate Title</button>
            </p>
          );
        })
      )}
    </div>
  );
}

export default App;
