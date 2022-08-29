import React from 'react';
import PropTypes from 'prop-types';
import parser from 'html-react-parser';
import { showFormattedDate } from '../utils';
import { ArchiveButton, DeleteButton } from './Buttons';

export default function NoteDetail({ note, onDelete, onArchive, onUnArchive }) {
  const { id, title, body, archived, createdAt } = note;
  const formattedDate = showFormattedDate(createdAt);

  return (
    <section className="detail-page">
      <h3 className="detail-page__title">{title}</h3>
      <p className="detail-page__createdAt"> {formattedDate}</p>
      <div className="detail-page__body">{parser(body)}</div>
      <div className="detail-page__action">
        <ArchiveButton id={id} archived={archived} onArchive={onArchive} onUnArchive={onUnArchive} />
        <DeleteButton id={id} onDelete={onDelete} />
      </div>
    </section>
  );
}

NoteDetail.propTypes = {
  note: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  onUnArchive: PropTypes.func.isRequired,
};
