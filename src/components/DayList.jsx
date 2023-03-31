import React from 'react';
import DayListItem from './DayListItem';

/**
A list of available days that could be selected to view or schedule appointments
@param   {object}      props           The props object
@param   {Array}       props.days      An array of day objects to be rendered
@param   {string}      props.value     The name of the currently selected day
@param   {function}    props.onChange  The function to be called when a day is selected
@returns {JSX Element}                 The DayList component
*/
export default function DayList(props) {
  const days = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.value}
        setDay={props.onChange}
      />
    );
  });

  return <ul>{days}</ul>;
}
