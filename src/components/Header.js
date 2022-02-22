import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNoteSticky, faUser } from "@fortawesome/free-solid-svg-icons";

export default function Header(props) {
  return (
    <header className="header">
      <div className="header--branding">
        <FontAwesomeIcon icon={faNoteSticky} className="header--logo" />
        <h3 className="header--title">Renote</h3>
      </div>
      {props.session && props.session.user ? (
        <div className="header--user">
          <span className="header--logout" onClick={props.logout}>
            Sign Out
          </span>
          <span className="separator"></span>
          <FontAwesomeIcon icon={faUser} className="header--user-icon" />
          <span>{props.session.user.email}</span>
        </div>
      ) : (
        ""
      )}
    </header>
  );
}
