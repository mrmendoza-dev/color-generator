// import { Link } from "react-router-dom";
// import "../css/index.scss";
import "./index.scss";

export default function Nav(props: any) {
  return (
    <div className="Nav">
      <div className="nav-title">
        {/* <Link className="nav-link" to="/">
          <img className="nav-logo" src={logo} />
        </Link> */}
      </div>

      <ul className="nav-list">
        {/* {props.links.map((link: any) => (
          <li className="nav-item" key={nanoid()}>
            <Link className="nav-link" to={link.path}>
              {link.name}
            </Link>
          </li>
        ))} */}
      </ul>

      {/* <DarkMode /> */}
    </div>
  );
}
