import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import Bookings from "./Components/PgProperties/Bookings";
import DashBoard from "./DashBoard";
import Maintenance from "./Components/Maintenance/Maintance";
import VacatingForm from "./Components/Vacating/VactingForm";
import Amenity from "./Components/PgProperties/Amenity";
import PgProperty from "./Components/PgProperties/PgProperty";
import PgDetails from "./Components/PgProperties/PgDetails";
import Room from "./Components/Room/Room";
import RoomDetail from "./Components/Room/Roomdetail";
import Receipt from "./Components/testpdf";
import JoiningData from "./Components/TenantJoining/JoiningData";
import Sendwhatsapp from "./Components/AddOns/Sendwhatsapp";
import RentalForm from "./Components/Rental/RentalForm";
import PgBed from "./Components/PgProperties/PgBed";
import RoomHome from "./Components/Room/RoomHome";
import logo from "./assets/Dolphin.png";
import PrivateRoutes from "./util/PrivateRoutes";
import Login from "./Components/AddOns/login";
import QueryParam from "./Components/Query param generator/QueryParam";
import AuthContext from "./Context/AuthContext";
import ProfileList from "./Components/Users/ProfileList";
import DetailedProfile from "./Components/Users/DetailedProfile";
import useAxios from "./util/useAxios";
import TenantJoiningDetailView from "./Components/TenantJoining/TenantJoiningDetailView";
import TestPdf from "./Components/TenantJoining/TJPdf";
import TJPdf from "./Components/TenantJoining/TJPdf";

function App() {
  const [properties, setProperties] = useState([]);
  const { user, logoutUser } = useContext(AuthContext);
  const api = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data using axios or your preferred method
        const response = await api.get("/dolphinpg/properties/");
        setProperties({ results: response.data });
        // Set other state variables as needed
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetchData function
  }, []);

  return (
    <div className="App">
      {/* Header */}
      <header className="navbar n sticky-top bg-light flex-md-nowrap p-0 shadow">
        <button
          className="navbar-toggler  d-md-none collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className=" col-md-3 col-lg-2 me-0 px-3 my-2" href="/">
          <img
            src={logo}
            className="img-fluid "
            alt=""
            height="50px"
            width="90px"
          />
        </a>

        <div className="navbar-nav">
          <div className="nav-item text-nowrap">
            {user && user ? (
              <button
                className="btn btn-danger px-3 pointer-cursor mx-3"
                onClick={logoutUser}
              >
                Sign out
              </button>
            ) : (
              <button className="btn btn-success px-3 pointer-cursor mx-3">
                <Link to="/login" className="text-white text-decoration-none">
                  Sign in
                </Link>
              </button>
            )}
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
                    to="/"
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
                    Requests & Responses
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
                          to="/joiningdata"
                        >
                          Joining Requests
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className="nav-link"
                          activeClassName="active"
                          to="/vactingforms"
                        >
                          Vacating Responses
                        </NavLink>
                      </li>

                      <li className="nav-item">
                        <NavLink
                          className="nav-link"
                          activeClassName="active"
                          to="/rentalform"
                        >
                          Rental Response
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
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeClassName="active"
                    to="/generator"
                  >
                    Tenant Form Link Generator
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeClassName="active"
                    to="/profileList"
                  >
                    Users
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
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" index element={<DashBoard />} />
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
            <Route
              path="/joiningdata/:id"
              element={<TenantJoiningDetailView />}
            />
            <Route path="/sendWhatsapp" element={<Sendwhatsapp />} />
            <Route path="/rentalform" element={<RentalForm />} />
            <Route path="/pgbeds" element={<PgBed />} />
            <Route path="/roomHome" element={<RoomHome />} />
            <Route path="/generator" element={<QueryParam />} />
            <Route path="/profileList" element={<ProfileList />} />
            <Route
              path="/profileList/:id_1/:id_2"
              element={<DetailedProfile />}
            />
            <Route path="/tjfpdf/:id" element={<TJPdf/>}/>
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
