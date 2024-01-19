import React, { useState, useEffect } from "react";
import axios from "axios";

const Maintenance = () => {
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div>
      <h2>Maintenance Requests</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>WhatsApp Number</th>
              <th>PG Name</th>
              <th>Room Number</th>
              <th>Issue</th>
              <th>Photo</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {maintenanceData.map((request) => (
              <tr key={request.id}>
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Maintenance;
