import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import useAxios from "../../util/useAxios";

const JoiningData = () => {
  const [joiningFormData, setJoiningFormData] = useState({ results: [] });
  const [sortOrder, setSortOrder] = useState("desc");
  const api = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/dolphinpg/tenantjoiningform/");
        setJoiningFormData({ results: response.data });
      } catch (error) {
        console.error("Error fetching joining form data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSort = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };

  if (!joiningFormData) {
    return <p>Loading...</p>;
  }

  // Sort the data based on the date_of_joining field
  const sortedData = joiningFormData.results.sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);

    return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Tenant Joining Form Data</h2>
      <button onClick={handleSort}>
        {sortOrder === "desc" ? "Sort Oldest First" : "Sort Newest First"}
      </button>
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
          {sortedData.map((item) => (
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
                <Link to="/roomHome" className="btn btn-warning">
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
