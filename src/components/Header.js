import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNoteSticky } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <header className="header">
      <FontAwesomeIcon icon={faNoteSticky} className="header--logo" />
      <h3 className="header--title">Renote</h3>
    </header>
  );
}
