import React, { useState, useEffect } from "react";
import axios from "axios";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "https://popularpg.in/dolphinpg/bookings/"
        );
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h2>Booking requests from Dolphinstay.com</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">User</th>
              <th scope="col">Phone</th>
              <th scope="col">PG Detail</th>
            </tr>
          </thead>
          <tbody>
            {bookings.results.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.name}</td>
                <td>{booking.phone}</td>
                <td>{booking.property}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Bookings;
