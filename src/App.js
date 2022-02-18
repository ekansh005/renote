import React from "react";
import Split from "react-split";
import List from "./components/List";
import Detail from "./components/Detail";
import Header from "./components/Header";

function App() {
  const [notes, setNotes] = React.useState(JSON.parse(localStorage.getItem("notes") || "[]"));
  const [selectedNoteId, setSelectedNoteId] = React.useState((notes[0] && notes[0].id) || null);

  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    console.log("notes saved", notes);
  }, [notes]);

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "New Note",
      content: "# Start editing the note here",
      updatedAt: Date.now(),
    };
    setNotes([...notes, newNote]);
    setSelectedNoteId(newNote.id);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
    setSelectedNoteId((notes[0] && notes[0].id) || null);
  };

  const updateNote = (text) => {
    const newNotes = [];
    notes.forEach((note) => {
      if (note.id === selectedNoteId) {
        newNotes.unshift({ ...note, content: text, updatedAt: Date.now() });
      } else {
        newNotes.push(note);
      }
    });
    setNotes(newNotes);
  };

  const selectNote = (id) => {
    const note = notes.find((note) => note.id === id);
    setSelectedNoteId(note.id);
  };

  const findCurrentNote = () => {
    return notes.find((note) => note.id === selectedNoteId);
  };

  return (
    <>
      <Header />
      <Split
        className="split"
        sizes={[25, 75]}
        minSize={100}
        expandToMin={false}
        gutterSize={10}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        direction="horizontal"
        cursor="col-resize"
      >
        <List
          selectedNoteId={selectedNoteId}
          addNote={addNote}
          deleteNote={deleteNote}
          selectNote={selectNote}
          notes={notes}
        />
        <Detail selectedNote={findCurrentNote()} onChange={updateNote} />
      </Split>
    </>
  );
}

export default App;
