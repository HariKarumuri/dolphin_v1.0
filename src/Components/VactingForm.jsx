import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const VacatingForm = () => {
  const [vacatingFormData, setVacatingFormData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVacatingFormData = async () => {
      try {
        const response = await axios.get(
          "https://popularpg.in/dolphinpg/vacatingform/"
        );
        setVacatingFormData(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching vacating form data:", error);
        setLoading(false);
      }
    };

    fetchVacatingFormData();
  }, []);

  return (
    <div>
      <h2>Vacating Forms</h2>

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
              <th>Vacating Date</th>
              <th>Vacating Reason</th>
              <th>Sent Recieved </th>
            </tr>
          </thead>
          <tbody>
            {vacatingFormData.map((form) => (
              <tr key={form.id}>
                <td>{form.name}</td>
                <td>{form.whatsapp_number}</td>
                <td>{form.pg_name}</td>
                <td>{form.pg_room_number}</td>
                <td>
                  {new Date(form.vacating_date).toLocaleString("en-GB", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </td>
                <td>{form.vacating_reason}</td>
                <td>
                  <a
                    className="btn btn-success"
                    href={`https://wa.me/${
                      form.whatsapp_number
                    }?text=${encodeURIComponent(
                      `We have received your vacating form with the following details!:\nName: ${form.name}\nPG Name: ${form.pg_name}\nRoom Number: ${form.pg_room_number}\nVacating Reason: ${form.vacating_reason}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faWhatsapp} />
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

export default VacatingForm;
