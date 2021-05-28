import React from 'react';
import Navs from './Navs';

const MainpageLayout = ({ children }) => {
  return (
    <div>
      <Navs />
      {children}
    </div>
  );
};

export default MainpageLayout;
