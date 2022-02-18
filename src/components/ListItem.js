import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function ListItem(props) {
  return (
    <div className="listItem">
      <div className="listItem--left">
        <h2 className="listItem--title">{props.title}</h2>
        <p className="listItem--subtitle">{props.subtitle}</p>
      </div>
      <FontAwesomeIcon icon={faTrash} />
    </div>
  );
}
