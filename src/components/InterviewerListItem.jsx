import React from 'react';
import classNames from 'classnames';
import 'components/InterviewerListItem.scss';

/**
A single interviewer item for the InterviewerList component
@param   {object}      props                  The props object
@param   {string}      props.name             The name of the interviewer
@param   {string}      props.avatar           The URL of the interviewer's avatar image
@param   {boolean}     props.selected         Flag to indicate whether or not the interviewer is selected
@param   {function}    props.setInterviewer   The function to be called when the interviewer is selected
@returns {JSX Element}                        The InterviewerListItem component.
*/
export default function InterviewerListItem(props) {
  const interviewerClass = classNames('interviewers__item', {
    'interviewers__item--selected': props.selected,
  });

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className='interviewers__item-image'
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
