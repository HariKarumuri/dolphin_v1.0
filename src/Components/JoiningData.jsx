import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

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
            <th>Send </th>
            <th>Assign to a room</th>
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
                  <FontAwesomeIcon icon={faWhatsapp} />
                </a>
              </td>
              <td>
                <Link to='/roomHome'
                  className="btn btn-warning"
                  
                >
                  Assign
                </Link>
               
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JoiningData;
