import React from 'react';
import classNames from 'classnames';
import 'components/DayListItem.scss';

/**
A single day item for the DayList component
@param    {object}      props            The props object
@param    {string}      props.name       The name of the day
@param    {number}      props.spots      The number of spots available for the day
@param    {boolean}     props.selected   Flag indicating if the day is selected
@param    {function}    props.setDay     The function to be called to set the day as selected
@returns  {JSX Element}                  The DayListItem component
*/
export default function DayListItem(props) {
  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0,
  });

  const formatSpots = (spots) => {
    if (spots === 0) {
      return 'no spots remaining';
    }
    if (spots === 1) {
      return '1 spot remaining';
    }
    return `${spots} spots remaining`;
  };

  return (
    <li
      data-testid='day'
      className={dayClass}
      onClick={() => {
        props.setDay(props.name);
      }}>
      <h2 className='text--regular'>{props.name}</h2>
      <h3 className='text--light'>{formatSpots(props.spots)}</h3>
    </li>
  );
}
