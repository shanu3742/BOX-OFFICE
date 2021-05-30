import React, { useState } from 'react';
import MainpageLayout from '../component/MainpageLayout';

const Home = () => {
  const [input, setInput] = useState('');
  const [searchOption, setSearchOption] = useState('shows');
  const isShowsSearch = searchOption === 'shows';

  const onInputchange = searchtext => {
    setInput(searchtext.target.value);
  };
  const onRadioChange = eve => {
    setSearchOption(eve.target.value);
  };
  console.log(searchOption);

  // onClick of search button we get input value store

  const onSearch = async () => {
    // console.log(input);
    // now we put input in search
    const API = `http://api.tvmaze.com/search/${searchOption}?q=${input}`;
    try {
      const data = await fetch(API);
      const realdata = await data.json();

      realdata.map(el => {
        return console.log(el.show.name);
      });
    } catch (err) {
      console.log(err);
    }
  };

  // on enter key  pressed we get input value store
  const onKeyDown = event => {
    if (event.keyCode === 13) {
      // console.log(input);
      // this function doing the same what onSearch function did so simply call onsearch function to performing same action here aslso
      onSearch();
    }
  };

  return (
    <MainpageLayout>
      <input
        type="text"
        placeholder="Search For Something"
        onChange={onInputchange}
        onKeyDown={onKeyDown}
        value={input}
      />

      <div>
        <label htmlFor="shows-search">
          Shows
          <input
            id="shows-search"
            type="radio"
            value="shows"
            checked={isShowsSearch}
            onClick={onRadioChange}
          />
        </label>

        <label htmlFor="actors-search">
          Actors
          <input
            id="actors-search"
            type="radio"
            value="people"
            checked={!isShowsSearch}
            onClick={onRadioChange}
          />
        </label>
      </div>
      <button type="button" onClick={onSearch}>
        Search
      </button>
    </MainpageLayout>
  );
};

export default Home;
