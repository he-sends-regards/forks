import React from 'react';
import SearchBar from '../search-bar/search-bar';
import './home-page.css';

const HomePage = () => {
  return (
    <div className="home">
      <span>
        Welcome to «Forks»
      </span>

      <SearchBar />
    </div>
  );
};

export default HomePage;
