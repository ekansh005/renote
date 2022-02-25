import React from "react";
import Split from "react-split";
import removeMarkdown from "remove-markdown";
import { debounce } from "lodash";

import List from "./components/List";
import Detail from "./components/Detail";
import Header from "./components/Header";
import Login from "./components/Login";
import { supabase } from "./supabaseClient";

function App() {
  const [notes, setNotes] = React.useState([]);
  const [selectedNoteId, setSelectedNoteId] = React.useState((notes[0] && notes[0].id) || null);
  const [session, setSession] = React.useState(null);

  async function fetchNotes(bSetFirstNote = false) {
    const { data, error } = await supabase.from("notes").select("*").order("updated_at", { ascending: false });
    setNotes(error ? [] : data);
    if (bSetFirstNote && data.length > 0) {
      setSelectedNoteId(data[0].id);
    }
    return error ? [] : data;
  }

  React.useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    fetchNotes(true);
  }, []);

  React.useEffect(() => {
    debouncedUpdateNote(findCurrentNote());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notes]);

  const addNote = async () => {
    const newNote = {
      // id: Date.now(),
      title: "New Note",
      note_data: "# Start editing the note here",
      created_by: session.user.id,
    };
    const { data, error } = await supabase.from("notes").insert([newNote]);
    if (!error) {
      setNotes([data[0], ...notes]);
      setSelectedNoteId(data[0].id);
    } else {
      alert(error.message);
    }
  };

  const deleteNote = async (id) => {
    const { error } = await supabase.from("notes").delete().eq("id", id);
    if (!error) {
      const notes = await fetchNotes();
      setSelectedNoteId((notes[0] && notes[0].id) || null);
    } else {
      alert(error.message);
    }
  };

  const debouncedUpdateNote = React.useMemo(() => {
    return debounce(async (note) => {
      if (note) {
        const { id, note_data, title } = note;
        const { error } = await supabase.from("notes").update({ id, note_data, title }).eq("id", id);
        if (error) {
          alert(error.message);
        } else {
          // fetchNotes();
        }
      }
    }, 1000);
  }, []);

  const updateNoteLocal = async (text) => {
    const newNotes = [];
    notes.forEach((note) => {
      if (note.id === selectedNoteId) {
        newNotes.unshift({
          ...note,
          title: removeMarkdown(text).substring(0, 30),
          note_data: text,
          updated_at: Date.now(),
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
          <Detail selectedNote={findCurrentNote()} onChange={updateNoteLocal} />
        </Split>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
