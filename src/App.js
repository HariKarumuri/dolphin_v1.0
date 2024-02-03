import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import Bookings from "./Components/Bookings";
import DashBoard from "./DashBoard";
import Maintenance from "./Components/Maintance";
import VacatingForm from "./Components/VactingForm";
import Amenity from "./Components/Amenity";
import Home from "./Home";
import PgProperty from "./Components/PgProperty";
import PgDetails from "./Components/PgDetails";
import Room from "./Components/Room";
import RoomDetail from "./Components/Room/Roomdetail";
import Receipt from "./Components/testpdf";
import JoiningData from "./Components/JoiningData";
import Sendwhatsapp from "./Components/Sendwhatsapp";
import RentalForm from "./Components/RentalForm";
import PgBed from "./Components/PgBed";
import RoomHome from "./Components/Room/RoomHome";
import Testing from "./Components/Testing";

import { useDolphinPGContext } from "./Context/DolphinPgcontext";

function App() {
  const { properties } = useDolphinPGContext();

  return (
    <div className="App">
      {/* Header */}
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

      {/* Sidebar */}
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
                    to="/dashboard"
                  >
                    <h5>Dashboard</h5>
                  </NavLink>
                </li>

                <li className="border-top my-3"></li>
                <li className="mb-1">
                  <button
                    className="btn btn-toggle align-items-center rounded collapsed"
                    data-bs-toggle="collapse"
                    data-bs-target="#dashboard-collapse"
                    aria-expanded="false"
                  >
                    Doplhin Stay PGs
                  </button>
                  <div className="collapse" id="dashboard-collapse">
                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                      <li className="nav-item">
                        <NavLink className="nav-link rounded" to="/property">
                          Property List
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className="nav-link"
                          activeClassName="active"
                          to="/bookings"
                        >
                          Booking Requests
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className="nav-link"
                          activeClassName="active"
                          to="/amenity"
                        >
                          Amenities
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </li>

                <li class="mb-1">
                  <button
                    class="btn btn-toggle align-items-center rounded collapsed"
                    data-bs-toggle="collapse"
                    data-bs-target="#orders-collapse"
                    aria-expanded="false"
                  >
                    Orders
                  </button>
                  <div class="collapse" id="orders-collapse">
                    <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                      <li className="nav-item">
                        <NavLink
                          className="nav-link"
                          activeClassName="active"
                          to="/maintenance"
                        >
                          Maintenance Requests
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className="nav-link"
                          activeClassName="active"
                          to="/vactingforms"
                        >
                          Vacating Forms
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className="nav-link"
                          activeClassName="active"
                          to="/joiningdata"
                        >
                          Joining Data
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className="nav-link"
                          activeClassName="active"
                          to="/rentalform"
                        >
                          Rental Form
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </li>

                <li class="mb-1">
                  <button
                    class="btn btn-toggle align-items-center rounded collapsed"
                    data-bs-toggle="collapse"
                    data-bs-target="#room-collapse"
                    aria-expanded="false"
                  >
                    Rooms Management
                  </button>
                  <div class="collapse" id="room-collapse">
                    <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                      <li className="nav-item">
                        <NavLink
                          className="nav-link"
                          activeClassName="active"
                          to={`/roomHome`}
                        >
                          Room Home
                        </NavLink>
                      </li>
                      {properties && properties.results ? (
                        properties.results.map((item) => (
                          <li className="nav-item" key={item.id}>
                            <NavLink
                              className="nav-link"
                              activeClassName="active"
                              to={`/rooms/${item.id}`}
                            >
                              {item.name}
                            </NavLink>
                          </li>
                        ))
                      ) : (
                        <li>No properties available</li>
                      )}
                    </ul>
                  </div>
                </li>
                

                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeClassName="active"
                    to="/sendWhatsapp"
                  >
                    Whatsapp Links
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-4">
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/dashboard" index element={<DashBoard />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/amenity" element={<Amenity />} />
          <Route path="/vactingforms" element={<VacatingForm />} />
          <Route path="/property" element={<PgProperty />} />
          <Route path="/property/:id" element={<PgDetails />} />
          <Route path="/rooms/:id" element={<Room />} />
          <Route path="/rooms/beds/:id" element={<RoomDetail />} />
          <Route path="/pdftest" element={<Receipt />} />
          <Route path="/joiningdata" element={<JoiningData />} />
          <Route path="/sendWhatsapp" element={<Sendwhatsapp />} />
          <Route path="/rentalform" element={<RentalForm />} />
          <Route path="/pgbeds" element={<PgBed />} />
          <Route path="/roomHome" element={<RoomHome />} />
          <Route path="/testing" element={<Testing />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
