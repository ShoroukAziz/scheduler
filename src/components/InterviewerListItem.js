import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {

  const dayClass = classNames('interviewers__item',
    {
      'interviewers__item--selected': props.selected,

    })

  return (
    <li className={dayClass} onClick={() => { props.setInterviewer(props.id) }}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.className}
      />
      {props.selected && props.name}
    </li>
  );
}