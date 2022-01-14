import React from 'react';
import { useQuery } from 'react-query';
import { fetcher } from './App';

const Post = ({ postId, goBack }) => {
  const { isLoading, data: post } = useQuery(['post', postId], () =>
    fetcher(`https://jsonplaceholder.typicode.com/posts/${postId}`)
  );

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <a href='#' onClick={goBack}>
            Go back
          </a>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </div>
      )}
    </>
  );
};

export default Post;
