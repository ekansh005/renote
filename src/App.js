import React from "react";
import Split from "react-split";
import removeMarkdown from "remove-markdown";

import List from "./components/List";
import Detail from "./components/Detail";
import Header from "./components/Header";
import Login from "./components/Login";
import { supabase } from "./supabaseClient";

function App() {
  const [notes, setNotes] = React.useState(JSON.parse(localStorage.getItem("notes") || "[]"));
  const [selectedNoteId, setSelectedNoteId] = React.useState((notes[0] && notes[0].id) || null);
  const [session, setSession] = React.useState(null);

  React.useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

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
    setNotes([newNote, ...notes]);
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
        newNotes.unshift({
          ...note,
          title: removeMarkdown(text).substring(0, 30),
          content: text,
          updatedAt: Date.now(),
        });
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
    <div className="app">
      <Header session={session} logout={() => supabase.auth.signOut()} />
      {session ? (
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
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
