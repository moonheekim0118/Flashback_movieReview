import React from 'react';
import Layout from '../components/Layout';
import SearchMovie from '../components/Movie/SearchMovie';

const SearchMovies = () => {
  return (
    <Layout PageName={'영화 검색'}>
      <SearchMovie />
    </Layout>
  );
};

export default SearchMovies;
