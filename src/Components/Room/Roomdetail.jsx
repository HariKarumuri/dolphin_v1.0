import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roomBed, setRoomBed] = useState(null);
  const [updatedRoomBedData, setUpdatedRoomBedData] = useState({
    bed_name: "",
    is_vacant: false,
    tenant_details: "",
    room: null,
  });
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchRoomBed = async () => {
      try {
        const response = await axios.get(
          `https://popularpg.in/dolphinpg/room-beds/${id}/`
        );
        setRoomBed(response.data);
        // Set the initial values for the form inputs
        setUpdatedRoomBedData({
          bed_name: response.data.bed_name,
          is_vacant: response.data.is_vacant,
          tenant_details: response.data.tenant_details,
          room: response.data.room,
        });
      } catch (error) {
        console.error("Error fetching room bed details:", error);
      }
    };

    fetchRoomBed();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `https://popularpg.in/dolphinpg/room-beds/${id}/`,
        updatedRoomBedData
      );
      console.log("Room bed updated successfully:", response.data);
      setRoomBed(response.data);
      setAlert({ type: "success", message: "Room bed updated successfully!" });
    } catch (error) {
      console.error("Error updating room bed details:", error);
      setAlert({ type: "error", message: "Error updating room bed details." });
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://popularpg.in/dolphinpg/room-beds/${id}/`
      );
      console.log("Room bed deleted successfully:", response.data);
      // Navigate to the previous page after successful deletion
      setAlert({ type: "success", message: "Room bed deleted successfully!" });
      navigate(-1); // Navigate back to the previous page
    } catch (error) {
      console.error("Error deleting room bed:", error);
      setAlert({ type: "error", message: "Error deleting room bed." });
    }
  };

  const handleAlertClose = () => {
    setAlert(null);
  };

  if (!roomBed) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Room Bed Details</h2>
      {alert && (
        <div
          className={`alert alert-${alert.type} alert-dismissible fade show`}
          role="alert"
        >
          {alert.message}
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={handleAlertClose}
          ></button>
        </div>
      )}
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleUpdate}>
            <p className="card-text">
              <strong>ID:</strong> {roomBed.id}
            </p>
            <div className="mb-3">
              <label htmlFor="bed_name" className="form-label">
                Bed Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="bed_name"
                name="bed_name"
                value={updatedRoomBedData.bed_name}
                onChange={(e) =>
                  setUpdatedRoomBedData({
                    ...updatedRoomBedData,
                    bed_name: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="is_vacant"
                name="is_vacant"
                checked={updatedRoomBedData.is_vacant}
                onChange={(e) =>
                  setUpdatedRoomBedData({
                    ...updatedRoomBedData,
                    is_vacant: e.target.checked,
                  })
                }
              />
              <label className="form-check-label" htmlFor="is_vacant">
                Is Vacant
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="tenant_details" className="form-label">
                Tenant Details:
              </label>
              <input
                type="text"
                className="form-control"
                id="tenant_details"
                name="tenant_details"
                value={updatedRoomBedData.tenant_details}
                onChange={(e) =>
                  setUpdatedRoomBedData({
                    ...updatedRoomBedData,
                    tenant_details: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="room" className="form-label">
                Room:
              </label>
              <input
                type="text"
                className="form-control"
                id="room"
                name="room"
                value={updatedRoomBedData.room}
                onChange={(e) =>
                  setUpdatedRoomBedData({
                    ...updatedRoomBedData,
                    room: e.target.value,
                  })
                }
              />
            </div>

            <button type="submit" className="btn btn-primary me-2">
              Update
            </button>
          </form>

          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
