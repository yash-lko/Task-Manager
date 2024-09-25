import React from 'react';
import { NavbarProps } from '../interfaces/navbar';

const Navbar: React.FC<NavbarProps> = ({ userName, searchTerm, handleSearch, handleLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white mb-4 shadow-sm">
      <div className="container-fluid">
        <div className=" task-wrap d-flex justify-content-between w-100">
          <span className="navbar-brand">
            <i className="fa fa-tasks text-danger me-2"></i>
            <strong>Task Manager</strong>
          </span>
        </div>
        <div className="d-flex justify-content-center w-100">
          <form className="search-form d-flex w-75">
            <input
              className="form-control"
              type="search"
              placeholder="Search Tasks"
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
          </form>
        </div>
        <div className="welcome-wrap d-flex align-items-center justify-content-end mt-2 mt-lg-0 w-100">
          <span className="me-2">
            <i className="fa fa-user text-danger me-1"></i>
            Welcome, {userName}
          </span>
          <button className="btn btn-danger mt-1" onClick={handleLogout}>
            <i className="fa fa-sign-out-alt me-1"></i>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
