import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import useAxios from "./../util/useAxios";

const VacatingForm = () => {
  const [vacatingFormData, setVacatingFormData] = useState({ results: [] });
  const [loading, setLoading] = useState(true);
  const api = useAxios();

  useEffect(() => {
    const fetchVacatingFormData = async () => {
      try {
        const response = await api.get("/dolphinpg/vacatingform/");
        setVacatingFormData({ results: response.data });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching vacating form data:", error);
        setLoading(false);
      }
    };

    fetchVacatingFormData();
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
          ...request, // Use existing data
          acknowledged: true,
        };

        await api.put(`/dolphinpg/vacatingform/${id}/`, requestData);

        setVacatingFormData((prevData) =>
          prevData.map((item) =>
            item.id === id ? { ...item, acknowledged: true } : item
          )
        );

        // Show an alert for confirmation
        alert("Vacating form acknowledged successfully!");
      } catch (error) {
        console.error("Error acknowledging vacating form:", error);
      }
    }
  };

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
              <th>Sent Recieved</th>
              <th>Acknowledged</th>
            </tr>
          </thead>
          <tbody>
            {vacatingFormData.results.map((form) => (
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
                <td>
                  <button
                    className={`btn ${
                      form.acknowledged ? "btn-success" : "btn-warning"
                    }`}
                    onClick={() => handleAcknowledgment(form.id, form)}
                  >
                    {form.acknowledged ? "Acknowledged" : "Resolve this !!"}
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

export default VacatingForm;
