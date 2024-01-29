import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Room = () => {
  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newRoomData, setNewRoomData] = useState({
    room_number: "",
    sharing: "",
    pg_property: 1, // Replace with the desired PG property ID
  });

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

  const handleAddRoom = async () => {
    try {
      const response = await axios.post(
        "https://popularpg.in/dolphinpg/rooms/",
        newRoomData
      );

      setRoomData((prevData) => ({
        results: [...prevData.results, response.data],
      }));

      setShowModal(false);
      setNewRoomData({
        room_number: "",
        sharing: "",
        pg_property: 1,
      });
    } catch (error) {
      console.error("Error adding room:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoomData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!roomData) {
    return null;
  }

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary mb-3"
        onClick={() => setShowModal(true)}
      >
        Add Room
      </button>
      <div className="row">
        {roomData.results.map((room) => (
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

      {/* Add Room Modal */}
      <div
        className={`modal ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Room</h5>
              <button
                type="button"
                className="close"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="roomNumber">Room Number</label>
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
                  <input
                    type="text"
                    className="form-control"
                    id="sharing"
                    name="sharing"
                    value={newRoomData.sharing}
                    onChange={handleInputChange}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddRoom}
                >
                  Add Room
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div
          className="modal-backdrop show"
          style={{
            zIndex: "1050",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Use the desired color and transparency
          }}
          onClick={() => setShowModal(false)}
        ></div>
      )}
    </div>
  );
};

export default Room;
