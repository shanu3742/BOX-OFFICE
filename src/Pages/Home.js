import React, { useState } from 'react';
import MainpageLayout from '../component/MainpageLayout';

const Home = () => {
  const [input, setInput] = useState('');

  const onInputchange = searchtext => {
    setInput(searchtext.target.value);
  };

  const onSearch = () => {
    console.log(input);
  };
  return (
    <MainpageLayout>
      <input type="text" onChange={onInputchange} value={input} />
      <button type="button" onClick={onSearch}>
        Search
      </button>
    </MainpageLayout>
  );
};

export default Home;
