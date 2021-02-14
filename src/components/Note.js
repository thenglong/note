import { useState } from 'react';
import NoteForm from './NoteForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { motion } from 'framer-motion';

const Note = ({ notes, completeNote, removeNote, updateNote }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: '',
  });

  const submitUpdate = value => {
    updateNote(edit.id, value);
    setEdit({
      id: null,
      value: '',
    });
  };

  if (edit.id) return <NoteForm edit={edit} onSubmit={submitUpdate} />;

  console.log(notes);

  return notes.map((note, index) => (
    <motion.div
      initial={{ x: '-10%' }}
      animate={{ x: 0 }}
      className={note.isComplete ? 'note-row complete' : 'note-row'}
      key={index}
    >
      <div key={note.id} onClick={() => completeNote(note.id)}>
        {note.text}
      </div>
      <div className="icons">
        <RiCloseCircleLine
          onClick={() => removeNote(note.id)}
          className="delete-icon"
        />
        <TiEdit
          onClick={() => setEdit({ id: note.id, value: note.text })}
          className="edit-icon"
        />
      </div>
    </motion.div>
  ));
};

export default Note;
