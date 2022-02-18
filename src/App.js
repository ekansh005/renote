import React from "react";
import Split from "react-split";
import List from "./components/List";
import Detail from "./components/Detail";
import Header from "./components/Header";

function App() {
  const [notes, setNotes] = React.useState([]);
  const [selectedNote, setSelectedNote] = React.useState(null);

  React.useEffect(() => {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    setNotes(notes);
    console.log("notes loaded", notes);
  }, []);

  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    console.log("notes saved", notes);
  }, [notes]);

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "New Note",
      subtitle: new Date().toDateString(),
      content: "# Start editing the note here",
    };
    setNotes([...notes, newNote]);
    setSelectedNote(newNote.id);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
    setSelectedNote((notes[0] && notes[0].id) || null);
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
        <List addNote={addNote} deleteNote={deleteNote} notes={notes} />
        <Detail />
      </Split>
    </>
  );
}

export default App;
