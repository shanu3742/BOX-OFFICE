import React from 'react';
import MainpageLayout from '../component/MainpageLayout';

const home = () => {
  const onInputchange = searchtext => {
    console.log(searchtext.target.value);
  };
  return (
    <MainpageLayout>
      <input type="text" onChange={onInputchange} />
    </MainpageLayout>
  );
};

export default home;
