import React, { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useShow } from '../../misc/custom-hooks';
import StyleShowCard from '../ShowCard.styled';
import { Star } from '../styled';

import IMAGE_NOT_FOUND from './image/1.png';

const ShowCard = ({ el }) => {
  // eslint-disable-next-line no-unused-vars
  const [starredShows, dispatchStarred] = useShow();
  const isStarred = starredShows.includes(el.show.id);
  const [summary] = [el.show.summary];
  console.log('render');
  const onStarClick = useCallback(() => {
    if (isStarred) {
      dispatchStarred({ type: 'REMOVE', showid: el.show.id });
    } else {
      dispatchStarred({ type: 'ADD', showid: el.show.id });
    }
  }, [dispatchStarred, isStarred, el.show.id]);

  const summaryAsText = summary
    ? `${summary.split('').slice(0, 50).join('').replace(/<.+?>/g, '')}...`
    : 'No description';

  return (
    <StyleShowCard>
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
    </StyleShowCard>
  );
};

export default memo(ShowCard);
