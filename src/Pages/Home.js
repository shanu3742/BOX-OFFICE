import React, { useState } from 'react';
import MainpageLayout from '../component/MainpageLayout';

const Home = () => {
  const [input, setInput] = useState('');

  const onInputchange = searchtext => {
    setInput(searchtext.target.value);
  };
  // on enter key  pressed we get input value store
  const onKeyDown = event => {
    if (event.keyCode === 13) {
      console.log(input);
    }
  };

  // onClick of search button we get input value store

  const onSearch = () => {
    console.log(input);
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
