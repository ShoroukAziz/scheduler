import React from 'react';
import './styles.scss';
import Empty from './Empty.jsx';
import Confirm from './Confirm.jsx';
import Show from './Show.jsx';
import Header from './Header.jsx';
import Form from './Form';
import useVisualMode from '../../hooks/useVisualMode';
import Status from './Status';

export default function Appointment(props) {
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const DELETING = 'DELETING';
  const CONFIRM = 'CONFIRM';

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer,
    };
    props
      .bookInterview(props.id, interview)
      .then((res) => {
        transition(SHOW);
      })
      .catch((err) => {});
  }

  function cancel() {
    transition(DELETING);
    props
      .cancelInterview(props.id)
      .then((res) => {
        transition(EMPTY);
      })
      .catch((err) => {});
  }

  return (
    <article className='appointment'>
      <>
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SAVING && <Status message='Saving...' />}
        {mode === DELETING && <Status message='Deleting...' />}
        {mode === CONFIRM && (
          <Confirm
            message='Are you sure you would like to delete?'
            onCancel={() => {
              back();
            }}
            onConfirm={cancel}
          />
        )}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => {
              transition(CONFIRM);
            }}
          />
        )}
        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onSave={save}
            onCancel={() => {
              back();
            }}
          />
        )}
      </>
    </article>
  );
}
