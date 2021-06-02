import React, { useState } from 'react';
import MainpageLayout from '../component/MainpageLayout';
import ShowCard from '../component/show/ShowCard';
import ActorCard from '../component/Actor/ActorCard';
import { FlexGrid } from '../component/styled';

const Home = () => {
  const [input, setInput] = useState('');
  const [searchOption, setSearchOption] = useState('shows');
  const isShowsSearch = searchOption === 'shows';

  const [result, setResult] = useState([]);
  const onInputchange = searchtext => {
    setInput(searchtext.target.value);
  };

  const onRadioChange = eve => {
    setSearchOption(eve.target.value);
  };

  // onClick of search button we get input value store

  const onSearch = async () => {
    // console.log(input);
    // now we put input in search
    const API = `http://api.tvmaze.com/search/${searchOption}?q=${input}`;
    try {
      const data = await fetch(API);
      const realdata = await data.json();
      if (realdata.length > 0) {
        setResult(realdata);
      }
      if (realdata.length === 0) {
        setResult(null);
      }

      // now we have to set the reasult
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

  // console.log(result);
  const showReasult = () => {
    if (result !== null) {
      return result.map(el => {
        if (el.show) {
          return (
            <FlexGrid>
              <ShowCard key={el.show.id} el={el} />
            </FlexGrid>
          );
        }
        if (el.person) {
          return (
            <FlexGrid>
              <ActorCard key={el.person.id} el={el} />
            </FlexGrid>
          );
        }
        return null;
      });
    }

    if (result === null) {
      return <div>search not find</div>;
    }
    return null;
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
      {showReasult()}
    </MainpageLayout>
  );
};

export default Home;
