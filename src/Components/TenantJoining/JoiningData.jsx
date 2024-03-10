import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import useAxios from "../../util/useAxios";
import Swal from "sweetalert2";
import "toastr/build/toastr.min.css";
import toastr from "toastr";

const JoiningData = () => {
  const [joiningFormData, setJoiningFormData] = useState({ results: [] });
  const [activeTab, setActiveTab] = useState("pending");
  const [sortOrder, setSortOrder] = useState("desc");
  const api = useAxios();

  const fetchData = async () => {
    try {
      const response = await api.get("/dolphinpg/tenantjoiningform/");
      setJoiningFormData({ results: response.data });
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching joining form data:", error);
    }
  };

  const handleSort = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };

  useEffect(() => {
    fetchData();
  }, []); // Moved the useEffect outside of conditional rendering

  if (!joiningFormData) {
    return <p>Loading...</p>;
  }

  const sortedData = joiningFormData.results.sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
  });

  const filterDataByStatus = (status) => {
    if (status === "all") {
      return joiningFormData.results.filter(
        (request) => request.status !== "deleted"
      );
    }
    return joiningFormData.results.filter(
      (request) => request.status === status
    );
  };

  const filteredData = filterDataByStatus(activeTab);
  filteredData.sort(
    (a, b) => new Date(b.date_of_joining) - new Date(a.date_of_joining)
  );

  const handleEdit = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Changing Status From Pending to verified ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, verify it!",
      });

      if (result.isConfirmed) {
        await api.put(`/dolphinpg/tenantjoiningform/${id}/`, {
          status: "verified",
        });

        await fetchData();

        Swal.fire(
          "Verified!",
          "The joining form has been verified successfully",
          "success"
        );
      }
    } catch (error) {
      console.error("Error resolving issue", error);
      toastr.error("Error resolving issue. Please try again.", "Error");
    }
  };

  const handleDeleteForm = async (id) => {
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
        await api.put(`/dolphinpg/tenantjoiningform/${id}/`, {
          status: "deleted",
        });

        await fetchData();
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

  const countPendingItems = () => {
    return joiningFormData.results.filter(
      (request) => request.status === "pending"
    ).length;
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Tenant Joining Form Data</h2>
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
            Pending {countPendingItems() > 0 && `(${countPendingItems()})`}
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "verified" ? "active" : ""}`}
            onClick={() => setActiveTab("verified")}
          >
            Verified
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
      {/* <button onClick={handleSort}>
        {sortOrder === "desc" ? "Sort Oldest First" : "Sort Newest First"}
      </button> */}
      <table className="table  ">
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Room</th>
            <th>PG Name</th>
            <th>Date of Joining</th>
            <th>Mobile Number</th>
            <th>status</th>
            <th className=" ">View</th>
            <th className=" ">Edit</th>
            <th className=" ">Delete</th>
            <th className=" ">pdf</th>
          </tr>
        </thead>
        <tbody>
          {filteredData &&
            filteredData.map((item) => (
              <tr key={item.id}>
                <td className="text-secondary">{item.id}</td>
                <td className="text-secondary">{item.name}</td>
                <td className="text-secondary">{item.requested_room_number}</td>
                <td className="text-secondary">{item.pg_name}</td>
                <td className="text-secondary">{item.date_of_joining}</td>
                <td className="text-secondary">{item.mobile_number}</td>
                <td className="text-secondary">
                  <div
                    className={`rounded-circle ${
                      item.status === "verified"
                        ? "bg-success"
                        : item.status === "pending"
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
                  {item.status}
                </td>

                <td className="">
                  <span
                    class="d-inline-block"
                    tabindex="0"
                    data-bs-toggle="tooltip"
                    title="view"
                  >
                    <Link to={`/joiningdata/${item.id}`}>
                      <i className="text-primary" style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon icon={faEye} />
                      </i>
                    </Link>
                  </span>
                </td>
                <td className="">
                  <span
                    class="d-inline-block"
                    tabindex="0"
                    data-bs-toggle="tooltip"
                    title="edit"
                    onClick={() => handleEdit(item.id)}
                  >
                    <i className="text-warning " style={{ cursor: "pointer" }}>
                      <FontAwesomeIcon icon={faPen} />
                    </i>
                  </span>
                </td>
                <td className="">
                  <span
                    class="d-inline-block"
                    tabindex="0"
                    data-bs-toggle="tooltip"
                    title="delete"
                    onClick={() => {
                      handleDeleteForm(item.id);
                    }}
                  >
                    <i className="text-danger">
                      <FontAwesomeIcon icon={faTrash} />
                    </i>
                  </span>
                </td>
                <td>
                  <Link to={`/tjfpdf/${item.id}`}>click</Link>
                </td>
              </tr>
              
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default JoiningData;
