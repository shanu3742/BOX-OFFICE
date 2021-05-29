import React, { useState } from 'react';
import MainpageLayout from '../component/MainpageLayout';

const Home = () => {
  const [input, setInput] = useState('');
  const onInputchange = searchtext => {
    setInput(searchtext.target.value);
  };
  return (
    <MainpageLayout>
      <input type="text" onChange={onInputchange} value={input} />
    </MainpageLayout>
  );
};

export default Home;
