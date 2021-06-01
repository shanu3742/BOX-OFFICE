import React from 'react';
import IMAGE_NOT_FOUND from '../show/image/1.png';

const ActorCard = ({ el }) => {
  return (
    <div>
      <div>
        <img
          src={el.person.image ? el.person.image.medium : IMAGE_NOT_FOUND}
          alt="actor"
        />
        <h1>
          {el.person.name} {el.person.gender ? `(${el.person.gender})` : null}
        </h1>
        <p>
          {el.person.country
            ? `Comes from ${el.person.country.name}`
            : 'No country known'}
        </p>
        {el.person.birthday ? <p>Born {el.person.birthday}</p> : null}
        <p>{el.person.deathday ? `Died ${el.person.deathday}` : 'Alive'}</p>
      </div>
    </div>
  );
};

export default ActorCard;
