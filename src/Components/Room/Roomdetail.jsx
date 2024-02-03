import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useLocation } from "react-router-dom";
import { useDolphinPGContext } from "../../Context/DolphinPgcontext";

const Roomdetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const { bedData, pgPropertyId } = location.state;
  const { joiningData } = useDolphinPGContext();

  const [roomDetails, setRoomDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const [updatedData, setUpdatedData] = useState({
    bed_name: "",
    is_vacant: false,
    tenant_details: "",
    room: null,
    assign_tenant: null,
  });
  const [searchTerm, setSearchTerm] = useState("");

  // State for modal visibility
  const [showModal, setShowModal] = useState(false);

  // Define the fetchRoomDetails function
  const fetchRoomDetails = async () => {
    try {
      const response = await axios.get(
        `https://popularpg.in/dolphinpg/room-beds/${id}/`
      );
      setRoomDetails(response.data);
      // Set the initial values for the updatedData state
      setUpdatedData({
        bed_name: response.data.bed_name,
        is_vacant: response.data.is_vacant,
        room: response.data.room,
        tenant_details: response.data.tenant_details,
        assign_tenant: response.data.assign_tenant,
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoomDetails();
  }, []);

  const handleUpdate = async () => {
    try {
      // Make the update API call
      await axios.put(
        `https://popularpg.in/dolphinpg/room-beds/${id}/`,
        updatedData
      );
      // Close the modal
      setShowModal(false);
      // Fetch updated details
      fetchRoomDetails();
      setSuccessAlert(true);

      // Hide success alert after 3 seconds
      setTimeout(() => {
        setSuccessAlert(false);
      }, 3000);
    } catch (error) {
      console.error("Error updating room details:", error);
      setErrorAlert(true);

      // Hide error alert after 3 seconds
      setTimeout(() => {
        setErrorAlert(false);
      }, 3000);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredTenants = joiningData.results
    ? joiningData.results.filter((tenant) =>
        tenant.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Handle search term changes
  const handleSearch = (term) => {
    setSearchTerm(term);
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
            <Link to={`/rooms/${pgPropertyId}`}>Rooms of {bedData}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Bed Details of {roomDetails.bed_name}
          </li>
        </ol>
      </nav>

      {successAlert && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          Room details updated successfully!
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setSuccessAlert(false)}
          ></button>
        </div>
      )}
      {errorAlert && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          Error updating room details. Please try again.
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setErrorAlert(false)}
          ></button>
        </div>
      )}

      {roomDetails ? (
        <div>
          <h2>Room Details</h2>
          <p>Bed ID: {roomDetails.id}</p>
          <p>Bed Name: {roomDetails.bed_name}</p>
          <p>
            Bed Empty :{" "}
            {roomDetails.is_vacant
              ? "Yes the bed is empty, can be assigned to a user"
              : "No, already Occupied by Assigned tenant below"}
          </p>
          <p>Tenant Details: {roomDetails.tenant_details}</p>

          <p>
            Assign Tenant:{" "}
            {joiningData.results && joiningData.results.length > 0
              ? joiningData.results.find(
                  (tenant) => tenant.id === roomDetails.assign_tenant
                )?.name || "Not Assigned"
              : "Not Assigned"}
            - with tenant Id : {roomDetails.assign_tenant}
          </p>

          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#updateRoomModal"
          >
            Update
          </button>

          {/* Update Modal */}
          <div
            className="modal fade"
            id="updateRoomModal"
            tabIndex="-1"
            aria-labelledby="updateRoomModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="updateRoomModalLabel">
                    Update Room Details
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="bedName" className="form-label">
                      Bed Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="bedName"
                      value={updatedData.bed_name}
                      onChange={(e) =>
                        setUpdatedData({
                          ...updatedData,
                          bed_name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="assignTenant" className="form-label">
                      Assign Tenant
                    </label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search tenant..."
                        onChange={(e) => handleSearch(e.target.value)}
                      />
                      <select
                        className={`form-select ${
                          filteredTenants.length > 0 ? "show" : ""
                        }`}
                        id="assignTenant"
                        value={updatedData.assign_tenant}
                        onChange={(e) =>
                          setUpdatedData({
                            ...updatedData,
                            assign_tenant: e.target.value,
                            is_vacant: false,
                          })
                        }
                      >
                        <option value={null}>Not Assigned</option>
                        {filteredTenants.map((tenant) => (
                          <option key={tenant.id} value={tenant.id}>
                            {tenant.name} - id :{tenant.id}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleUpdate}
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default Roomdetail;
