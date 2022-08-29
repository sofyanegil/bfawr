import React from 'react';
import PropTypes from 'prop-types';
import parser from 'html-react-parser';
import { Link } from 'react-router-dom';
import { showFormattedDate } from '../utils/index';

export default function NoteItem({ note }) {
  const { id, title, body, createdAt } = note;
  const formattedDate = showFormattedDate(createdAt);

  return (
    <div className="note-item">
      <h3 className="note-item__title">
        <Link to={`/notes/${id}`}>{title}</Link>
      </h3>
      <p className="note-item__createdAt">{formattedDate}</p>
      <p className="note-item__body">{parser(body)}</p>
    </div>
  );
}

NoteItem.propTypes = {
  note: PropTypes.object.isRequired,
};
