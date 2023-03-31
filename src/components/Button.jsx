import React from 'react';
import classNames from 'classnames';

import 'components/Button.scss';

/**

A customizable button component.
@param   {object}     props             The props object
@param   {boolean}    [props.confirm]   Flag indicating if the button is a confirmation button
@param   {boolean}    [props.danger]    Flag indicating if the button is a danger button
@param   {boolean}    [props.disabled]  Flag indicating if the button is disabled
@param   {function}   [props.onClick]   Function to be called when the button is clicked
@param   {ReactNode}  [props.children]  The text content of the button
@returns {JSX Element}                  The Button component
*/
export default function Button(props) {
  const buttonClass = classNames('button', {
    'button--confirm': props.confirm,
    'button--danger': props.danger,
  });

  return (
    <>
      <button
        className={buttonClass}
        onClick={props.onClick}
        disabled={props.disabled}>
        {props.children}
      </button>
    </>
  );
}
