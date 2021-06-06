import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainpageLayout from '../component/MainpageLayout';
import IMAGE_NOT_FOUND from '../component/show/image/1.png';
import StyledShowCard from '../component/ShowCard.styled';
import { FlexGrid, Star } from '../component/styled';

// eslint-disable-next-line import/named
import apiGet from '../misc/config';
import { useShow } from '../misc/custom-hooks';

const Starred = () => {
  const [starredShows, dispatchStarred] = useShow();
  const [starred] = useShow();
  const [shows, setShows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (starred && starred.length > 0) {
      const promises = starred.map(showid => apiGet(`/shows/${showid}`));
      Promise.all(promises)
        .then(apiData => apiData.map(show => ({ show })))

        .then(results => {
          setShows(results);
          setIsLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [starred]);

  return (
    <MainpageLayout>
      {isLoading && <div>Shows are still loading</div>}
      {error && <div>Error Occur</div>}
      {!isLoading && !shows && <div>No shows were added</div>}
      {!isLoading && !error && shows && (
        <FlexGrid>
          {shows.map(el => {
            const isStarred = starredShows.includes(el.show.id);
            const onStarClick = () => {
              if (isStarred) {
                dispatchStarred({ type: 'REMOVE', showid: el.show.id });
              } else {
                dispatchStarred({ type: 'ADD', showid: el.show.id });
              }
            };
            const [summary] = [el.show.summary];
            const summaryAsText = summary
              ? `${summary
                  .split('')
                  .slice(0, 50)
                  .join('')
                  .replace(/<.+?>/g, '')}...`
              : 'No description';
            return (
              <StyledShowCard>
                <div>
                  <img
                    className="img-wrapper"
                    alt="show"
                    src={el.show.image ? el.show.image.medium : IMAGE_NOT_FOUND}
                  />
                </div>
                <h1>{el.show.name}</h1>
                <p>{summaryAsText}</p>
                <div className="btns">
                  <Link to={`show/${el.show.id}`}>Read more</Link>
                  <button onClick={onStarClick} type="button">
                    <Star active={isStarred} />
                  </button>
                </div>
              </StyledShowCard>
            );
          })}
        </FlexGrid>
      )}
    </MainpageLayout>
  );
};

export default Starred;
