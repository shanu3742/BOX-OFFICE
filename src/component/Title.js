import React, { memo } from 'react';
import { TitleWrapper } from './Title.styled';

const Title = () => {
  return (
    <TitleWrapper>
      <h1>BOX OFFICE</h1>
      <p>Are you looking for a movie or an actor?</p>
    </TitleWrapper>
  );
};

export default memo(Title);
