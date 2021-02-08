import { useEffect, useState } from 'react';
import NoteForm from './NoteForm';
import Note from './Note';
import { notesRef } from '../configs/firebase';

function NoteList() {
  const [notes, setNotes] = useState([]);
  const [initializing, setInitializing] = useState(false);

  useEffect(() => {
    setInitializing(true);
    notesRef.get().then(snapshot => {
      const notes = [];

      snapshot.forEach(function (childSnapshot) {
        var id = childSnapshot.id;
        var data = childSnapshot.data();
        // ...

        notes.push({
          id: id,
          text: data.text,
          isComplete: data.isComplete,
        });
      });
      setNotes(notes);
      setInitializing(false);
    });
  }, []);

  const addNote = note => {
    if (!note.text || /^\s*$/.test(note.text)) return;

    notesRef
      .add({ ...note, isComplete: false })
      .then(docRef => {
        console.log('Tutorial created with ID: ', docRef.id);
        setNotes([{ ...note, id: docRef.id }, ...notes]);
      })
      .catch(error => {
        console.error('Error adding Tutorial: ', error);
      });
  };

  const updateNote = (noteId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) return;
    setNotes(prev => prev.map(item => (item.id === noteId ? newValue : item)));
    console.log(newValue);
    notesRef.doc(noteId).update({
      text: newValue.text,
    });
  };

  const removeNote = id => {
    setNotes(notes.filter(note => note.id !== id));

    notesRef.doc(id).delete();
  };

  const completeNote = id => {
    let updatedNotes = notes.map(note => {
      if (note.id === id) {
        note.isComplete = !note.isComplete;
      }
      return note;
    });
    setNotes(updatedNotes);
    const n = notes.find(x => x.id === id);

    notesRef.doc(id).update({ isComplete: n.isComplete });
  };

  return (
    <>
      <h1>What's the Plan with Jing?</h1>
      <NoteForm onSubmit={addNote} />
      {initializing ? (
        <h1>Loading...</h1>
      ) : (
        <Note
          notes={notes}
          completeNote={completeNote}
          removeNote={removeNote}
          updateNote={updateNote}
        />
      )}
    </>
  );
}

export default NoteList;
