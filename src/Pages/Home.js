import React, { useState } from 'react';
import MainpageLayout from '../component/MainpageLayout';

const Home = () => {
  const [input, setInput] = useState('');

  const onInputchange = searchtext => {
    setInput(searchtext.target.value);
  };

  // onClick of search button we get input value store

  const onSearch = async () => {
    // console.log(input);
    // now we put input in search
    const API = `http://api.tvmaze.com/search/shows?q=${input}`;
    try {
      const data = await fetch(API);
      const realdata = await data.json();
      console.log(realdata);
    } catch (err) {
      console.log(err);
    }
  };

  // on enter key  pressed we get input value store
  const onKeyDown = event => {
    if (event.keyCode === 13) {
      // console.log(input);
      // this function doing the same what onSearch function did so simply call onsearch function to performing same action here aslso
      onSearch();
    }
  };

  return (
    <MainpageLayout>
      <input
        type="text"
        onChange={onInputchange}
        onKeyDown={onKeyDown}
        value={input}
      />
      <button type="button" onClick={onSearch}>
        Search
      </button>
    </MainpageLayout>
  );
};

export default Home;
