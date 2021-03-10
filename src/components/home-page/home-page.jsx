import React from 'react';
import SearchForm from '../search-form/search-form';
import './home-page.css';

const HomePage = () => {
  return (
    <div className="home">
      <span>
        Welcome to «Forks»
      </span>

      <SearchForm />
    </div>
  );
};

export default HomePage;
