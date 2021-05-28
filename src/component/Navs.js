import React from 'react';
import { Link } from 'react-router-dom';

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
  return (
    <div>
      <ul>
        {navmenu.map(item => {
          return (
            <li key={item.to}>
              <Link to={item.to}>{item.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Navs;
