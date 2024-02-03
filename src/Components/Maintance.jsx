// Maintenance.js

import React, { useState, useEffect } from "react";
import axios from "axios";


const Maintenance = () => {
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filterPGName, setFilterPGName] = useState("");
  const [filterRoomNumber, setFilterRoomNumber] = useState("");
  const [filterAcknowledged, setFilterAcknowledged] = useState(null);

  useEffect(() => {
    const fetchMaintenanceData = async () => {
      try {
        const response = await axios.get(
          "https://popularpg.in/dolphinpg/maintenance/"
        );
        setMaintenanceData(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching maintenance data:", error);
        setLoading(false);
      }
    };

    fetchMaintenanceData();
  }, []);

  const handleAcknowledgment = async (id, request) => {
    // Display a confirmation dialog
    const userConfirmed = window.confirm(
      "Are you sure you want to acknowledge this request?"
    );

    // If the user confirms, proceed with acknowledgment
    if (userConfirmed) {
      try {
        const requestData = {
          acknowledged: true,
          issue_about: request.issue_about,
          name: request.name,
          pg_name: request.pg_name,
          pg_room_number: request.pg_room_number,
          whatsapp_number: request.whatsapp_number,
        };

        await axios.put(
          `https://popularpg.in/dolphinpg/maintenance/${id}/`,
          requestData
        );

        setMaintenanceData((prevData) =>
          prevData.map((item) =>
            item.id === id ? { ...item, acknowledged: true } : item
          )
        );

        // Show an alert for confirmation
        alert("Maintenance request acknowledged successfully!");
      } catch (error) {
        console.error("Error acknowledging request:", error);
      }
    }
  };

  const filteredData = maintenanceData.filter((request) => {
    const matchesPGName =
      request.pg_name.toLowerCase().includes(filterPGName.toLowerCase()) ||
      filterPGName === "";

    const matchesRoomNumber =
      request.pg_room_number
        .toLowerCase()
        .includes(filterRoomNumber.toLowerCase()) || filterRoomNumber === "";

    const matchesAcknowledged =
      filterAcknowledged === null ||
      request.acknowledged === filterAcknowledged;

    return matchesPGName && matchesRoomNumber && matchesAcknowledged;
  });

  return (
    <div>
      <h2>Maintenance Requests</h2>

      {/* Filters */}
      <div className="row">
        <div className="mb-3 col-4">
          <label htmlFor="filterPGName" className="form-label">
            Filter by PG Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="filterPGName"
            value={filterPGName}
            onChange={(e) => setFilterPGName(e.target.value)}
          />
        </div>

        <div className="mb-3 col-4">
          <label htmlFor="filterRoomNumber" className="form-label">
            Filter by Room Number:
          </label>
          <input
            type="text"
            className="form-control"
            id="filterRoomNumber"
            value={filterRoomNumber}
            onChange={(e) => setFilterRoomNumber(e.target.value)}
          />
        </div>

        <div className="mb-3 col-4">
          <label htmlFor="filterAcknowledged" className="form-label">
            Filter by Acknowledged:
          </label>
          <select
            className="form-control"
            id="filterAcknowledged"
            value={filterAcknowledged === null ? "" : filterAcknowledged}
            onChange={(e) =>
              setFilterAcknowledged(
                e.target.value === "" ? null : e.target.value === "true"
              )
            }
          >
            <option value="">All</option>
            <option value="true">Acknowledged</option>
            <option value="false">Not Acknowledged</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Created At</th>
              <th>Name</th>
              <th>WhatsApp Number</th>
              <th>PG Name</th>
              <th>Room Number</th>
              <th>Issue</th>
              <th>Photo</th>
              <th>Acknowledged</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((request) => (
              <tr key={request.id} className={request.acknowledged ? "acknowledged-row" : ""}>
                <td>
                  {new Date(request.created_at).toLocaleString("en-GB", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </td>
                <td className={request.acknowledged ? "acknowledged-text" : ""}>
                  {request.name}
                </td>
                <td className={request.acknowledged ? "acknowledged-text" : ""}>
                  {request.whatsapp_number}
                </td>
                <td className={request.acknowledged ? "acknowledged-text" : ""}>
                  {request.pg_name}
                </td>
                <td className={request.acknowledged ? "acknowledged-text" : ""}>
                  {request.pg_room_number}
                </td>
                <td className={request.acknowledged ? "acknowledged-text" : ""}>
                  {request.issue_about}
                </td>
                <td>
                  <a
                    href={request.photo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Image
                  </a>
                </td>
                <td>
                  <button
                    className={`btn ${
                      request.acknowledged ? "btn-success" : "btn-warning"
                    }`}
                    onClick={() => handleAcknowledgment(request.id, request)}
                  >
                    {request.acknowledged ? "Acknowledged" : "Resolve this !!"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Maintenance;
