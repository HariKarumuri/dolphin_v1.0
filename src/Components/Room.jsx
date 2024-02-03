import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useDolphinPGContext } from "../Context/DolphinPgcontext";

const Room = () => {
  const { properties } = useDolphinPGContext();

  const { id: pgPropertyId } = useParams();
  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newRoomData, setNewRoomData] = useState({
    room_number: "",
    sharing: "",
    pg_property: pgPropertyId,
  });
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://popularpg.in/dolphinpg/rooms/"
        );
        setRoomData(response.data);
      } catch (error) {
        setError(error.message || "An error occurred while fetching the data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter rooms based on pg_property
  const filteredRooms =
    roomData && roomData.results
      ? roomData.results.filter((room) => room.pg_property === +pgPropertyId)
      : [];

  const handleAddRoom = async () => {
    try {
      const response = await axios.post(
        "https://popularpg.in/dolphinpg/rooms/",
        newRoomData
      );

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

  const closeAlert = () => {
    setAlert(null);
  };

  if (!properties || !properties.results) {
    return <p>Loading...</p>;
  }

  

  // Find the property with the matching id
  const property = properties.results.find((property) => property.id === +pgPropertyId);

  // Check if the property is undefined
  if (!property) {
    return <p>Property not found</p>;
  }

  const propertyName = property.name;

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

      <button
        type="button"
        className="btn btn-primary mb-3"
        data-bs-toggle="modal"
        data-bs-target="#addRoomModal"
      >
        Add Room
      </button>
      <div className="row">
        {filteredRooms.map((room) => (
          <div key={room.id} className="mb-4 border p-3 col-lg-3">
            <h5 className="mb-3">Room {room.room_number}</h5>

            <h6 className="mt-3">Room Beds:</h6>
            <div className="d-flex flex-wrap gap-2 ">
              {room.room_beds.map((bed) => (
                <Link
                  to={`/rooms/beds/${bed.id}`}
                  key={bed.id}
                  className={`room-bed-details border p-2 d-flex justify-content-center align-items-center text-decoration-none ${
                    bed.is_vacant ? "bg-green" : "bg-red"
                  }`}
                >
                  <strong>{bed.bed_name}</strong>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bootstrap Modal */}
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
      {/* End Bootstrap Modal */}
    </div>
  );
};

export default Room;
