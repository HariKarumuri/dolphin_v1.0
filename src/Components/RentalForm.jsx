import React, { useEffect, useState } from "react";
import axios from "axios";
import useAxios from "../util/useAxios";

const RentalForm = () => {
  const [rentalData, setRentalData] = useState({ results: [] });
  const api = useAxios();

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await api.get("/dolphinpg/rental-form/");
        console.log(response.data);
        setRentalData({ results: response.data });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  return (
    <div>
      <h2>Rental Form Data</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Date Recieved</th>
            <th>Name</th>
            <th>PG Name</th>
            <th>Room Number</th>
            <th>Deposit</th>
            <th>Rent</th>
            <th>Total Amount</th>
            <th>Mobile Number</th>

            <th>Payment Image</th>
            <th>Sent Recieved </th>
          </tr>
        </thead>
        <tbody>
          {rentalData.results.map((rental) => (
            <tr key={rental.id}>
              <td>
                {new Date(rental.created_at).toLocaleString("en-GB", {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </td>
              <td>{rental.name}</td>
              <td>{rental.pg_name}</td>
              <td>{rental.room_number}</td>
              <td>{rental.deposit}</td>
              <td>{rental.rent}</td>
              <td>{rental.total_amount}</td>
              <td>{rental.mobile_number}</td>

              <td>
                <a
                  href={rental.payment_image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                >
                  <img
                    src={rental.payment_image}
                    alt={`Payment Image for ${rental.name}`}
                    style={{ width: "100px", height: "auto" }}
                  />
                </a>
              </td>
              <td>
                <a
                  className="btn btn-success"
                  href={`https://wa.me/${
                    rental.mobile_number
                  }?text=${encodeURIComponent(`Hello Thank you!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Send
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RentalForm;
