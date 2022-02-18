import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import ListItem from "./ListItem";

export default function List(props) {
  const listItems = props.notes.map((item) => (
    <ListItem
      key={item.id}
      {...item}
      selectedNoteId={props.selectedNoteId}
      selectNote={props.selectNote}
      deleteNote={props.deleteNote}
    />
  ));

  return (
    <div className="list">
      <button className="list--add" onClick={props.addNote}>
        <FontAwesomeIcon icon={faAdd} />
      </button>
      {listItems}
    </div>
  );
}
