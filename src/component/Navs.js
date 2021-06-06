import React from 'react';
import { useLocation } from 'react-router';

import { LinkStyled, NavList } from './Navs.styled';
import Title from './Title';

const navmenu = [
  {
    name: 'Home',
    to: '/',
  },
  {
    name: 'Starred shows',
    to: '/starred',
  },
];

const Navs = () => {
  const location = useLocation();
  return (
    <div>
      <Title />
      <NavList>
        {navmenu.map(item => {
          return (
            <li key={item.to}>
              <LinkStyled
                className={item.to === location.pathname ? 'active' : ''}
                to={item.to}
              >
                {item.name}
              </LinkStyled>
            </li>
          );
        })}
      </NavList>
    </div>
  );
};

export default Navs;
