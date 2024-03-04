import React, { useState, useEffect } from "react";
import axios from "axios";
import useAxios from "../../util/useAxios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import "toastr/build/toastr.min.css";
import toastr from "toastr";
import ReactDOMServer from "react-dom/server";

const Maintenance = () => {
  const [maintenanceData, setMaintenanceData] = useState({ results: [] });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedNoteCategory, setSelectedNoteCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const api = useAxios();
  const fetchMaintenanceData = async () => {
    try {
      const response = await api.get("/dolphinpg/maintenance/");
      setMaintenanceData({ results: response.data });
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching maintenance data:", error);
      setLoading(false);
    }
  };

  const handleDeleteProfile = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await api.put(`/dolphinpg/maintenance/${id}/`, {
          status: "deleted",
        });

        await fetchMaintenanceData();
        /* toastr.success("Profile deleted successfully!", "Success", {
          timeOut: 3000,
        }); */
        Swal.fire("Deleted!", "Your profile has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting profile", error);
      toastr.error("Error deleting profile. Please try again.", "Error");
    }
  };

  const handleEditStatus = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Changing Status From Pending to Resolved ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Resolve it!",
      });

      if (result.isConfirmed) {
        await api.put(`/dolphinpg/maintenance/${id}/`, {
          status: "resolved",
        });

        await fetchMaintenanceData();
        /* toastr.success("Profile deleted successfully!", "Success", {
          timeOut: 3000,
        }); */
        Swal.fire(
          "Resolved!",
          "The Issue has been resolved succesfully",
          "success"
        );
      }
    } catch (error) {
      console.error("Error resolving isuue", error);
      toastr.error("Error resolving isuue. Please try again.", "Error");
    }
  };

  const filterDataByStatus = (status) => {
    if (status === "all") {
      // Show all requests except those with status "deleted"
      return maintenanceData.results.filter(
        (request) => request.status !== "deleted"
      );
    }

    return maintenanceData.results.filter(
      (request) => request.status === status
    );
  };

  const filteredData = filterDataByStatus(activeTab);
  filteredData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const handleEditNote = async (id) => {
    try {
      // Use the selectedNoteCategory state for the updated category
      await api.put(`/dolphinpg/maintenance/${id}/`, {
        note: selectedNoteCategory,
      });

      await fetchMaintenanceData();
      // Use toastr for success message
      toastr.success("The note has been updated successfully.", "Updated!");
    } catch (error) {
      console.error("Error updating note", error);
      toastr.error("Error updating note. Please try again.", "Error");
    }
  };

  useEffect(() => {
    fetchMaintenanceData();
  }, []);

  return (
    <div>
      <h2>Maintenance Requests</h2>

      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "pending" ? "active" : ""}`}
            onClick={() => setActiveTab("pending")}
          >
            Pending
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "resolved" ? "active" : ""}`}
            onClick={() => setActiveTab("resolved")}
          >
            Resolved
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "deleted" ? "active" : ""}`}
            onClick={() => setActiveTab("deleted")}
          >
            Deleted
          </button>
        </li>
      </ul>

      {/* Filters */}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-responsive  ">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>PG Name</th>
              <th>Room No.</th>
              <th>Issue</th>
              <th>Status</th>
              <th>Assign to</th>
              <th className="">View</th>
              <th className="">edit</th>
              <th className="">Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredData &&
              filteredData.map((request) => (
                <tr key={request.id}>
                  <td className="text-secondary fw-bold text-nowrap">
                    {new Date(request.created_at).toLocaleString("en-GB", {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </td>
                  <td className="text-secondary">{request.name}</td>
                  <td className="text-secondary">{request.pg_name}</td>
                  <td className="text-secondary">{request.pg_room_number}</td>
                  <td className="text-secondary">
                    {request.issue_about.length > 25
                      ? request.issue_about.slice(0, 25) + "..."
                      : request.issue_about}
                  </td>
                  <td className="text-secondary">
                    <div
                      className={`rounded-circle ${
                        request.status === "resolved"
                          ? "bg-success"
                          : request.status === "pending"
                          ? "bg-warning"
                          : "bg-danger"
                      }`}
                      style={{
                        width: "8px",
                        height: "8px",
                        display: "inline-block",
                        marginRight: "5px",
                      }}
                    ></div>
                    {request.status}
                  </td>
                  <td className="text-secondary">
                    <span
                      data-bs-toggle="modal"
                      data-bs-target={`#updateNoteModal-${request.id}`}
                    >
                      {request.note !== "" ? request.note : "none"}
                    </span>
                    <div>
                      {/* Update Note Modal */}
                      <div
                        className="modal fade"
                        id={`updateNoteModal-${request.id}`}
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby={`updateNoteModalLabel-${request.id}`}
                        aria-hidden="true"
                      >
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id={`updateNoteModalLabel-${request.id}`}
                              >
                                Update Note
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <label htmlFor={`noteCategory-${request.id}`}>
                                Select Category:
                              </label>
                              <select
                                id={`noteCategory-${request.id}`}
                                className="form-select"
                                value={selectedNoteCategory}
                                onChange={(e) =>
                                  setSelectedNoteCategory(e.target.value)
                                }
                              >
                                <option value="">None</option>
                                <option value="plumber">Plumber</option>
                                <option value="electrician">Electrician</option>
                                <option value="wifi">Wifi</option>
                                <option value="others">Others</option>
                              </select>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => {
                                  handleEditNote(request.id);
                                }}
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              >
                                Save Changes
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* end of modal */}
                    </div>
                  </td>

                  <td className="">
                    <span
                      className="d-inline-block"
                      tabIndex="0"
                      data-bs-toggle="tooltip"
                      title="view"
                    >
                      <Link to="">
                        <i
                          className="text-primary"
                          style={{ cursor: "pointer" }}
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </i>
                      </Link>
                    </span>
                  </td>
                  <td className="">
                    <span
                      className="d-inline-block"
                      tabIndex="0"
                      data-bs-toggle="tooltip"
                      title="edit"
                      onClick={() => handleEditStatus(request.id)}
                    >
                      <i
                        className="text-success "
                        style={{ cursor: "pointer" }}
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </i>
                    </span>
                  </td>
                  <td className="">
                    <span
                      className="d-inline-block"
                      tabIndex="0"
                      data-bs-toggle="tooltip"
                      title="delete"
                      onClick={() => handleDeleteProfile(request.id)}
                    >
                      <i className="text-danger" style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon icon={faTrash} />
                      </i>
                    </span>
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
