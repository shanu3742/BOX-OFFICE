import React, { useCallback, useState } from 'react';

import MainpageLayout from '../component/MainpageLayout';
import ShowCard from '../component/show/ShowCard';
import ActorCard from '../component/Actor/ActorCard';
import { FlexGrid } from '../component/styled';
import { useLastQueery } from '../misc/custom-hooks';
import { SearchInput, RadioInputsWrapper } from './Home.styled';
import { SearchButtonWrapper } from './SearchButtonWrapper';
import CustomRadio from './CustomRadio';

const showReasult = result => {
  if (result !== null) {
    return result.map(el => {
      if (el.show) {
        return (
          <FlexGrid key={el.show.id}>
            <ShowCard el={el} />
          </FlexGrid>
        );
      }
      if (el.person) {
        return (
          <FlexGrid key={el.person.id}>
            <ActorCard el={el} />
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
const Home = () => {
  const [input, setInput] = useLastQueery();
  const [searchOption, setSearchOption] = useState('shows');
  const isShowsSearch = searchOption === 'shows';
  const [result, setResult] = useState([]);

  const onInputchange = useCallback(
    searchtext => {
      setInput(searchtext.target.value);
    },
    [setInput]
  );

  const onRadioChange = useCallback(eve => {
    setSearchOption(eve.target.value);
  }, []);

  // onClick of search button we get input value store

  const onSearch = async () => {
    // console.log(input);
    // now we put input in search
    const API = `https://api.tvmaze.com/search/${searchOption}?q=${input}`;
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

  return (
    <MainpageLayout>
      <SearchInput
        type="text"
        placeholder="Search For Something"
        onChange={onInputchange}
        onKeyDown={onKeyDown}
        value={input}
      />

      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="Shows"
            id="shows-search"
            value="shows"
            checked={isShowsSearch}
            onClick={onRadioChange}
          />
        </div>

        <div>
          <CustomRadio
            label="Actors"
            id="actors-search"
            value="people"
            checked={!isShowsSearch}
            onClick={onRadioChange}
          />
        </div>
      </RadioInputsWrapper>
      <SearchButtonWrapper>
        <button type="button" onClick={onSearch}>
          Search
        </button>
      </SearchButtonWrapper>

      {showReasult(result)}
    </MainpageLayout>
  );
};

export default Home;
