import { Link } from "react-router-dom";
import "./NavLayout.scss";

const NavLayout = () => {
  return (
    <div className="topnav">
      <Link className="active" to="/">
        Home
      </Link>
      <Link to="/about">About</Link>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default NavLayout;
