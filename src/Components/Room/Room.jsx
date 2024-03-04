import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import useAxios from "../../util/useAxios";

const Room = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState({ results: [] });
  const api = useAxios();

  const { id: pgPropertyId } = useParams();
  const [roomData, setRoomData] = useState({ results: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newRoomData, setNewRoomData] = useState({
    room_number: "",
    sharing: "",
    pg_property: pgPropertyId,
  });
  const [alert, setAlert] = useState(null);
  const [showBedModal, setShowBedModal] = useState(false);
  const [newBedName, setNewBedName] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/dolphinpg/rooms/");
        const propertyResponse = await api.get("/dolphinpg/properties/");

        // Check if properties are already set to avoid redundant calls
        if (!properties.results.length) {
          setProperties({ results: propertyResponse.data });
        }

        setRoomData({ results: response.data });
      } catch (error) {
        setError(error.message || "An error occurred while fetching the data.");
      }
    };

    fetchData();
  }, []);

  const filteredRooms =
    roomData && roomData.results
      ? roomData.results.filter((room) => room.pg_property === +pgPropertyId)
      : [];

  const handleAddRoom = async () => {
    try {
      const response = await api.post("/dolphinpg/rooms/", newRoomData);

      setRoomData((prevData) => ({
        results: [...prevData.results, response.data],
      }));

      setAlert({
        type: "success",
        message: "Room added successfully!",
      });
    } catch (error) {
      console.error("Error adding room:", error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.non_field_errors &&
        error.response.data.non_field_errors.includes(
          "The fields pg_property, room_number must make a unique set."
        )
      ) {
        setAlert({
          type: "danger",
          message:
            "Room with this number already exists. Please use another number.",
        });
      } else {
        setAlert({
          type: "danger",
          message: "Failed to add room. Please try again.",
        });
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoomData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDeleteRoom = async (roomId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this room?"
    );

    if (confirmed) {
      try {
        await api.delete(`/dolphinpg/rooms/${roomId}/`);
        setTimeout(() => {
          window.location.reload();
        }, 700);
        window.scrollTo(0, 0); // Scrolls to the top of the page
        setAlert({
          type: "success",
          message: "Room deleted successfully!",
        });
      } catch (error) {
        console.error("Error deleting room:", error);
        setAlert({
          type: "danger",
          message: "Failed to delete room. Please try again.",
        });
      }
    }
  };

  const closeAlert = () => {
    setAlert(null);
  };

  if (!properties || !properties.results) {
    return <p>Loading...</p>;
  }

  const property = properties.results.find(
    (property) => property.id === +pgPropertyId
  );

  if (!property) {
    return <p>Loading...</p>;
  }

  const propertyName = property.name;

  const openBedModal = (roomid) => {
    setSelectedRoomId(roomid); // Set the selected room ID
    setNewBedName("");
    setShowBedModal(true);
  };

  const closeBedModal = () => {
    setShowBedModal(false);
  };

  const handleBedNameInputChange = (e) => {
    setNewBedName(e.target.value);
  };

  const handleAddBed = async () => {
    try {
      const response = await api.post("/dolphinpg/room-beds/", {
        bed_name: newBedName,
        is_vacant: true,
        room: selectedRoomId, // Use the selected room ID here
        assign_tenant: null,
      });

      setAlert({
        type: "success",
        message: "Bed added successfully!",
      });

      const updatedResponse = await api.get(
        `/dolphinpg/rooms/${selectedRoomId}/`
      );

      setRoomData((prevData) => ({
        results: prevData.results.map((room) =>
          room.id === selectedRoomId ? updatedResponse.data : room
        ),
      }));

      closeBedModal();
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.non_field_errors &&
        error.response.data.non_field_errors.includes(
          "The fields bed_name, room must make a unique set."
        )
      ) {
        setAlert({
          type: "danger",
          message:
            "BED Name with this name/number already exists. Please use another name/number.",
        });
      } else {
        setAlert({
          type: "danger",
          message: "Failed to add bed. Please try again.",
        });
      }
    }
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to="/roomhome">Rooms Dashboard</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Rooms of {propertyName}
          </li>
        </ol>
      </nav>
      {alert && (
        <div
          className={`alert alert-${alert.type} alert-dismissible fade show`}
          role="alert"
        >
          {alert.message}
          <button
            type="button"
            className="btn-close"
            onClick={closeAlert}
          ></button>
        </div>
      )}

      <div className="d-flex justify-content-between">
        <h5>Rooms of {propertyName} </h5>

        <button
          type="button"
          className="btn btn-primary mb-3"
          data-bs-toggle="modal"
          data-bs-target="#addRoomModal"
        >
          Add Room
        </button>
      </div>

      <div className="row gap-4 justify-content-center">
        {filteredRooms &&
          filteredRooms.map((room) => (
            <div
              key={room.id}
              className=" border p-3  col-md-3 col-sm-3 col-4  rounded shadow"
            >
              <div className="d-flex justify-content-between align-i">
                <h6 className="mb-3">Room {room.room_number}</h6>

                <div className="dropdown ">
                  <button
                    className="btn  dropdown-toggle  custom-dropdown-toggle"
                    type="button"
                    id={`dropdown-room-${room.id}`}
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <FontAwesomeIcon icon={faEllipsis} className="mr-2" />
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby={`dropdown-room-${room.id}`}
                  >
                    <button
                      className="dropdown-item small-text-custom"
                      data-bs-toggle="modal"
                      data-bs-target="#AddRoomBed"
                      onClick={() => {
                        openBedModal(room.id);
                      }}
                    >
                      Add Bed
                    </button>

                    <button
                      className="dropdown-item small-text-custom"
                      onClick={() => {
                        handleDeleteRoom(room.id);
                      }}
                    >
                      Delete Room
                    </button>
                  </div>
                  <div className="modal" id="AddRoomBed" tabIndex="-1">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">Add Bed</h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={closeBedModal}
                          ></button>
                        </div>
                        <div className="modal-body">
                          <form>
                            <div className="form-group">
                              <label htmlFor="bedName">Bed Name</label>
                              <input
                                type="text"
                                className="form-control"
                                id="bedName"
                                value={newBedName}
                                onChange={handleBedNameInputChange}
                              />
                            </div>

                            <button
                              type="button"
                              className="btn btn-primary"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              onClick={() => {
                                handleAddBed();
                              }}
                            >
                              Add Bed
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h6 className="mt-1 text-secondary small-text-custom">
                Available Beds :
              </h6>
              <div className="d-flex flex-wrap gap-2 ">
                {room.room_beds.map((bed) => (
                  <div
                    onClick={() =>
                      navigate(`/rooms/beds/${bed.id}`, {
                        state: {
                          bedData: propertyName,
                          pgPropertyId: pgPropertyId,
                        },
                      })
                    }
                    key={bed.id}
                    className={`room-bed-details  border p-2  d-flex justify-content-center align-items-center text-decoration-none pointer-cursor ${
                      bed.is_vacant ? "bg-green" : "bg-red"
                    }`}
                  >
                    <p className=" fw-bold my-auto">{bed.bed_name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>

      <div className="modal" id="addRoomModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Room</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="roomNumber">
                    Room Number (add only number and don't add any letters){" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="roomNumber"
                    name="room_number"
                    value={newRoomData.room_number}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="sharing">Sharing Type</label>
                  <select
                    className="form-control"
                    id="sharing"
                    name="sharing"
                    value={newRoomData.sharing}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Sharing Type</option>
                    <option value="single">Single</option>
                    <option value="double">Twin</option>
                    <option value="triple">Triple</option>
                    <option value="four">Four</option>
                  </select>
                </div>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddRoom}
                  data-bs-dismiss="modal"
                >
                  Add Room
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
