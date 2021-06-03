import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
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
  // const [show, setShow] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);

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
      <h1>this is show page</h1>
    </div>
  );
};

export default Show;
