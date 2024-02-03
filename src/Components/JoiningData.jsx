import React, { useState, useEffect } from "react";
import axios from "axios";

const JoiningData = () => {
  const [joiningFormData, setJoiningFormData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://popularpg.in/dolphinpg/tenantjoiningform/"
        );
        setJoiningFormData(response.data);
      } catch (error) {
        console.error("Error fetching joining form data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAssignRoomBed = async (id) => {
    try {
      // Adjust the endpoint and payload based on your Django API
      const response = await axios.post(
        "http://127.0.0.1:8000/api/room-beds/assign/",
        {
          tenantId: id,  // Pass the tenant ID or any other relevant data needed for assignment
        }
      );

      // Handle the response as needed
      console.log('Room bed assigned successfully:', response.data);
    } catch (error) {
      console.error('Error assigning room bed:', error);
    }
  };

  if (!joiningFormData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Tenant Joining Form Data</h2>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Requested Room</th>
            <th>PG Name</th>
            <th>Date of Joining</th>
            <th>Mobile Number</th>
            <th>Email ID</th>
            <th>Monthly Rent</th>
            <th>Security Deposit</th>
            <th>Vacating Date</th>
            <th>Sent Recieved </th>
            <th>Assign </th>
          </tr>
        </thead>
        <tbody>
          {joiningFormData.results.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.requested_room_number}</td>
              <td>{item.pg_name}</td>
              <td>{item.date_of_joining}</td>
              <td>{item.mobile_number}</td>
              <td>{item.email_id}</td>
              <td>{item.monthly_rent}</td>
              <td>{item.security_deposit}</td>
              <td>{item.vacating_date}</td>
              <td>
                <a
                  className="btn btn-success"
                  href={`https://wa.me/${
                    item.mobile_number
                  }?text=${encodeURIComponent(
                    `Hello ${item.name},\n\nWe have received your Joining request with the following details:\n\nPG Name: ${item.pg_name}\nRoom Number: ${item.requested_room_number}\n\n\nThank you!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Send 
                </a>
              </td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => handleAssignRoomBed(item.id)}
                >
                  Assign
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JoiningData;
