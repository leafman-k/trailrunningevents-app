import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
const Header = ({authenticated , role}) => {

  return (
    <nav className="navbar navbar-default">

  <IndexLink to="/" className="navbar-brand">Trail running events</IndexLink>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="nav navbar-nav mr-auto">
      {authenticated && role == 'ADMIN' &&
        <li className="nav-item nav-link">
          <Link to="events" activeClassName="active">Events</Link>
        </li>
      }
      {authenticated  && role == 'ATHLETE' &&
        <li className="nav-item nav-link">
          <Link to="/myevents" activeClassName="active">My events</Link>
        </li>
      }
      <li className="nav-item nav-link">
        <Link to="/about" activeClassName="active">About</Link>
      </li>

    </ul>
    <ul className="nav navbar-nav navbar-right">
      {!authenticated &&
        <li className="nav-item nav-link">
          <Link to="/signin" activeClassName="active">Sign In</Link>
        </li>
      }
      {authenticated &&
        <li className="nav-item nav-link">
          <Link to="/signout" activeClassName="active">Sign Out</Link>
        </li>
      }
    </ul>

  </div>
</nav>
  );
};
Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  role: PropTypes.string.isRequired
};
export default Header;
