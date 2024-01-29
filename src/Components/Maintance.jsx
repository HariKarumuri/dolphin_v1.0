import React, { useState, useEffect } from "react";
import axios from "axios";

const Maintenance = () => {
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filterPGName, setFilterPGName] = useState("");
  const [filterRoomNumber, setFilterRoomNumber] = useState("");

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

  // Apply filters based on PG Name and Room Number
  const filteredData = maintenanceData.filter((request) => {
    const matchesPGName =
      request.pg_name.toLowerCase().includes(filterPGName.toLowerCase()) ||
      filterPGName === "";
    const matchesRoomNumber =
      request.pg_room_number.toLowerCase().includes(filterRoomNumber.toLowerCase()) ||
      filterRoomNumber === "";

    return matchesPGName && matchesRoomNumber;
  });

  return (
    <div>
      <h2>Maintenance Requests</h2>

      {/* Filters */}
      <div className="mb-3">
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

      <div className="mb-3">
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
            </tr>
          </thead>
          <tbody>
            {filteredData.map((request) => (
              <tr key={request.id}>
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
                <td>{request.name}</td>
                <td>{request.whatsapp_number}</td>
                <td>{request.pg_name}</td>
                <td>{request.pg_room_number}</td>
                <td>{request.issue_about}</td>
                <td>
                  <a
                    href={request.photo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Image
                  </a>
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

