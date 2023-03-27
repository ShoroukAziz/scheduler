import React from 'react';
import './styles.scss';
import Empty from './Empty.jsx';
import Confirm from './Confirm.jsx';
import Show from './Show.jsx';
import Header from './Header.jsx';
import Form from './Form';
import useVisualMode from '../../hooks/useVisualMode';
import Status from './Status';
import Error from './Error';

export default function Appointment(props) {
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const DELETING = 'DELETING';
  const EDIT = 'EDIT';
  const CONFIRM = 'CONFIRM';
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';

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
      .then(() => {
        transition(SHOW);
      })
      .catch((err) => {
        transition(ERROR_SAVE, true);
      });
  }

  function cancel() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((err) => {
        transition(ERROR_DELETE, true);
      });
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
            onEdit={() => {
              transition(EDIT);
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
        {mode === EDIT && (
          <Form
            interviewers={props.interviewers}
            student={props.interview.student}
            interviewer={props.interview.interviewer.id}
            onSave={save}
            onCancel={() => {
              back();
            }}
          />
        )}
        {mode === ERROR_SAVE && (
          <Error
            message='Could not save appointment'
            onClose={() => {
              back();
            }}
          />
        )}
        {mode === ERROR_DELETE && (
          <Error
            message='Could not cancel appointment'
            onClose={() => {
              back();
            }}
          />
        )}
      </>
    </article>
  );
}
