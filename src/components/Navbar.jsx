import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">My App</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
          <Link to="/enseignants" className="nav-link">Enseignants Management</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admins">Admins Management</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/exam">Exam Creation</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/elem">Element Creation</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;