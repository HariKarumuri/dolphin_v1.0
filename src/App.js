import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import Bookings from "./Components/Bookings";
import DashBoard from "./DashBoard";
import Maintenance from "./Components/Maintance";
import VacatingForm from "./Components/VactingForm";
import Amenity from "./Components/Amenity";
import Home from "./Home";
import PgProperty from "./Components/PgProperty";

function App() {
  return (
    <div className="App">
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">
          Dolphin Admin
        </a>
        <button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <input
          className="form-control form-control-dark w-100"
          type="text"
          placeholder="Search"
          aria-label="Search"
        />
        <div className="navbar-nav">
          <div className="nav-item text-nowrap">
            <a className="nav-link px-3" href="#">
              Sign out
            </a>
          </div>
        </div>
      </header>

      <div className="container-fluid">
        <div className="row">
          <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
          >
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeClassName="active"
                    exact
                    to="/"
                  >
                    <span data-feather="home"></span>
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to='/property'>
                    Property List
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" activeClassName="active" to="/bookings">
                    Bookings
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" activeClassName="active" to="/maintenance">
                    Maintaince Requests
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" activeClassName="active" to="/vactingforms">
                    Vacating Forms
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" activeClassName="active" to="/amenity">
                    Amenities
                  </NavLink>
                </li>
                
              </ul>

            </div>
          </nav>
        </div>
      </div>

      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/amenity" element={<Amenity />} />
          <Route path="/vactingforms" element={<VacatingForm />} />
          <Route path="/property" element={<PgProperty/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
