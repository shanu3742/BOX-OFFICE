import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import Cast from '../component/show/Cast';
import Details from '../component/show/Details';
import Seasons from '../component/show/Seasons';
import ShowMainData from '../component/show/ShowMainData';
import apiGet from '../misc/config';

const reducer = (prevState, action) => {
  if (action.type === 'FETCH_SUCCESS') {
    return { isLoading: false, show: action.show, error: null };
  }
  if (action.type === 'FETCH_FAILED') {
    return { ...prevState, isLoading: false, error: action.error };
  }

  return prevState;
};
const initialState = {
  show: null,
  isLoading: true,
  error: null,
};

const Show = () => {
  const { id } = useParams();

  const [{ show, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        dispatch({ type: 'FETCH_SUCCESS', show: results });
      })
      .catch(err => {
        dispatch({ type: 'FETCH_FAILED', error: err.message });
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
      <ShowMainData />
      <div>
        <h2>Details</h2>
        <Details />
      </div>
      <div>
        <h2>Seasons</h2>
        <Seasons />
      </div>
      <div>
        <h2>Cast</h2>
        <Cast />
      </div>
    </div>
  );
};

export default Show;
