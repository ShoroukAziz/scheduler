import React from "react";
import "./styles.scss";
import Empty from "./Empty.jsx";
import Show from "./Show.jsx";
import Header from "./Header.jsx";
import useVisualMode from "../../hooks/useVisualMode";

export default function Appointment(props) {
  return (
    <article className='appointment'>
      <>
        <Header time={props.time} />
        {props.interview ? (
          <Show
            stuent={props.interview.student}
            interviewer={props.interview.interviewer}
          />
        ) : (
          <Empty />
        )}
      </>
    </article>
  );
}
