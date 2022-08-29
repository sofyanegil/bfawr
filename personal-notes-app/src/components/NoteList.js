import React from 'react';
import PropTypes from 'prop-types';
import { NoteItem } from './index';
import NotFound from '../assets/Not-Found.png';
import { LocaleContext } from '../context';

export default function NoteList({ notes }) {
  const { locale } = React.useContext(LocaleContext);

  return (
    <>
      {notes.length ? (
        <section className="notes-list">
          {notes.map((note) => (
            <NoteItem key={note.id} id={note.id} note={note} />
          ))}
        </section>
      ) : (
        <div className="notes-list-empty not-found">
          <img src={NotFound} alt="Not Found" />
          <h2>{locale === 'id' ? 'Catatan Tidak Ditemukan' : 'No Notes Found'}</h2>
        </div>
      )}
    </>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};
