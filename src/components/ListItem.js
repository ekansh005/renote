import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function ListItem(props) {
  return (
    <div className={`listItem ${props.id === props.selectedNoteId ? "selectedListItem" : ""}`}>
      <div className="listItem--left" onClick={() => props.selectNote(props.id)}>
        <h2 className="listItem--title">{props.title}</h2>
        <p className="listItem--subtitle">{props.subtitle}</p>
      </div>
      <FontAwesomeIcon icon={faTrash} className="listItem--delete" onClick={() => props.deleteNote(props.id)} />
    </div>
  );
}
