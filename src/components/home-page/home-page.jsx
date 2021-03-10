import React from 'react';
import Search from '../search/search';
import './home-page.css';

const HomePage = () => {
  return (
    <div className="home">
      <span>
        Welcome to «Forks»
      </span>

      <Search />
    </div>
  );
};

export default HomePage;
