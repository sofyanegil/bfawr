import React from 'react';
import PropTypes from 'prop-types';
import { AddButton } from './Buttons';
import useInput from '../hooks/useInput';

export default function NoteInput({ onAddNote }) {
  const [title, onTitleChange] = useInput('');
  const [body, onBodyChange] = useInput('', 'text');

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (title === '' || body === '') {
      alert('Title and body cannot be empty');
      return;
    }
    onAddNote({ title, body });
  };

  return (
    <>
      <div className="add-new-page__input">
        <input
          type="text"
          className="add-new-page__input__title"
          placeholder="Notes Title"
          value={title}
          onChange={(event) => {
            onTitleChange(event);
          }}
        />
        <div
          className="add-new-page__input__body"
          contentEditable
          data-placeholder="Type notes here ..."
          onInput={(event) => {
            onBodyChange(event);
          }}
        />
      </div>
      <AddButton
        onAddNote={(event) => {
          onSubmitHandler(event);
        }}
      />
    </>
  );
}

NoteInput.propTypes = {
  onAddNote: PropTypes.func.isRequired,
};
