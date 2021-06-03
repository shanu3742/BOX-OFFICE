import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiGet from '../misc/config';

const Show = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        setShow(results);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [id]);
  console.log(show);

  if (isLoading) {
    return (
      <div>
        <h1>Page is Loading</h1>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <h1>Error Page! </h1>
      </div>
    );
  }
  return (
    <div>
      <h1>this is show page</h1>
    </div>
  );
};

export default Show;
