import React from 'react';
import { Link } from 'react-router-dom';
import IMAGE_NOT_FOUND from './image/1.png';

const ShowCard = ({ el }) => {
  const [summary] = [el.show.summary];
  const summaryAsText = summary
    ? `${summary.split('').slice(0, 50).join('').replace(/<.+?>/g, '')}...`
    : 'No description';

  return (
    <div>
      <div>
        <img
          alt="show"
          src={el.show.image ? el.show.image.medium : IMAGE_NOT_FOUND}
        />
      </div>
      <h1>{el.show.name}</h1>
      <p>{summaryAsText}</p>
      <div>
        <Link to={`show/${el.show.id}`}>Read more</Link>
        <button type="button">Star me</button>
      </div>
    </div>
  );
};

export default ShowCard;
