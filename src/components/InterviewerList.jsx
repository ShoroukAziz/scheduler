import React from 'react';
import PropTypes from 'prop-types';
import InterviewerListItem from 'components/InterviewerListItem';
import 'components/InterviewerList.scss';

/**

A list of selectable interviewers.
@param   {object}     props               The props object
@param   {array}      props.interviewers  An array of interviewer objects to be rendered
@param   {number}     props.value         The ID of the currently selected interviewer
@param   {function}   props.onChange      The function to be called when an interviewer is selected
@returns {JSX Element}                    The InterviewerList component
*/
export default function InterviewerList(props) {
  const interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}
      />
    );
  });

  return (
    <section className='interviewers'>
      <h4 className='interviewers__header text--light'>Interviewer</h4>
      <ul className='interviewers__list'> {interviewers}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};
