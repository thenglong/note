import { useState } from 'react';

function NoteForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');

  // const inputRef = useRef(null);

  // useEffect(() => {
  //   inputRef.current.focus();
  // });

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
    });
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      {props.edit ? (
        <>
          <input
            placeholder="Update your note"
            value={input}
            onChange={handleChange}
            name="text"
            // ref={inputRef}
            className="note-input edit"
          />
          <button onClick={handleSubmit} className="note-button edit">
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder="Note for Jing kbal khoch"
            value={input}
            onChange={handleChange}
            name="text"
            className="note-input"
            // ref={inputRef}
          />
          <button onClick={handleSubmit} className="note-button">
            Add Note
          </button>
        </>
      )}
    </form>
  );
}

export default NoteForm;
