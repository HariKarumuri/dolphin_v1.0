import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPen,
  faTrash,
  faLock,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "toastr/build/toastr.min.css";
import toastr from "toastr";
import Select from "react-select";
import useAxios from "../../util/useAxios";

const ProfileList = () => {
  const api = useAxios();
  const [profiles, setProfiles] = useState({ results: [] });
  const [activeTab, setActiveTab] = useState("active");
  const [tenantJoiningForms, setTenantJoiningForms] = useState({ results: [] });
  const [showPassword, setShowPassword] = useState(false);

  // State variables for adding a new profile
  const [newProfile, setNewProfile] = useState({
    user: {
      username: "",
      email: "",
      password: "",
    },
    user_primary_mobile_number: "",
    user_profile_picture: null,
    user_birthday: "",
    tenant_joining_form: null,
  });

  const fetchProfileListData = async () => {
    try {
      const response = await api.get("dolphinpg/profiles/");
      setProfiles({ results: response.data });
    } catch (error) {
      console.error("Error fetching details", error);
    }
  };

  const fetchTenantJoiningForms = async () => {
    try {
      const response = await api.get(`dolphinpg/tenantjoiningform/`);
      setTenantJoiningForms({ results: response.data });
    } catch (error) {
      console.error("Error fetching tenant joining forms", error);
    }
  };

  const filterProfilesByStatus = (status) => {
    setActiveTab(status);
  };

  const filteredProfiles = profiles.results.filter((profile) => {
    if (activeTab === "deleted") {
      return profile.status === "deleted";
    } else if (activeTab === "all") {
      return profile.status !== "deleted";
    } else {
      return profile.status === activeTab;
    }
  });

  const handleDeleteProfile = async (profileId) => {
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
        await api.put(`dolphinpg/profiles/${profileId}/`, {
          status: "deleted",
        });

        await fetchProfileListData();
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

  console.log(filteredProfiles);

  const handleAddProfile = async () => {
    try {
      // Validate if necessary fields are filled (add more validations as needed)
      if (
        !newProfile.user.username ||
        !newProfile.user.email ||
        !newProfile.user.password
      ) {
        toastr.error("Please fill in all required fields", "Error");
        return;
      }

      // Send the "Add Profile" request
      await api.post(`dolphinpg/profiles/`, newProfile);

      // Handle success and update UI or state as needed
      toastr.success("Profile added successfully!", "Success");

      // Update the state with the new data
      setProfiles((prevProfiles) => ({
        results: [...prevProfiles.results, newProfile],
      }));

      setNewProfile({
        user: {
          username: "",
          email: "",
          password: "",
        },
        user_primary_mobile_number: "",
        user_profile_picture: null,
        user_birthday: "",
        tenant_joining_form: null,
      });
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.user &&
        error.response.data.user.username &&
        error.response.data.user.username.includes(
          "A user with that username already exists."
        )
      ) {
        toastr.error("A user with that username already exists.", "Error");
      } else {
        console.error("Error adding profile", error);
        toastr.error("Error adding profile. Please try again.", "Error");
      }
    }
  };

  useEffect(() => {
    fetchProfileListData();
    fetchTenantJoiningForms();
  }, []);

  const handleTenantFormChange = (selectedOption) => {
    const selectedFormId = selectedOption ? selectedOption.value : null;

    if (selectedFormId) {
      const selectedForm = tenantJoiningForms.results.find(
        (form) => form.id === selectedFormId
      );

      setNewProfile({
        ...newProfile,
        tenant_joining_form: selectedFormId,
        user_primary_mobile_number: selectedForm.mobile_number,
        user_birthday: selectedForm.date_of_birth,
        user: {
          username: selectedForm.mobile_number,
          email: selectedForm.email_id,
          password: selectedForm.mobile_number,
        },
      });

      if (selectedForm) {
        console.log("Selected Tenant Joining Form:", selectedForm);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h1>Users</h1>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addnewprofile"
      >
        Add New User
      </button>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "all" ? "active" : ""}`}
            onClick={() => filterProfilesByStatus("all")}
          >
            All
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "active" ? "active" : ""}`}
            onClick={() => filterProfilesByStatus("active")}
          >
            Active
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "inactive" ? "active" : ""}`}
            onClick={() => filterProfilesByStatus("inactive")}
          >
            Inactive
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "deleted" ? "active" : ""}`}
            onClick={() => filterProfilesByStatus("deleted")}
          >
            Deleted
          </button>
        </li>
      </ul>
      <div className="table-responsive">
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th className=" col-md-1">#</th>
              <th className=" col-md-3">Username</th>
              <th className=" col-md-3">Tenant Name</th>
              <th className=" col-md-3">Email</th>
              <th className=" col-md-2">Status</th>
              <th className=" col-md-1">View</th>
              <th className=" col-md-1">Edit</th>
              <th className=" col-md-1">Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredProfiles.map((profile) => (
              <tr key={profile.id}>
                <td className="text-secondary fw-bold">{profile.id}</td>
                <td className="text-secondary">{profile.user.username}</td>
                <td className="text-secondary">
                  {profile.tenant_joining_form
                    ? profile.tenant_joining_form.name
                    : "N/A"}
                </td>
                <td className="text-secondary">
                  {profile.tenant_joining_form
                    ? profile.tenant_joining_form.email_id
                    : "N/A"}
                </td>
                <td className="text-secondary">
                  <div
                    className={`rounded-circle ${
                      profile.status === "active"
                        ? "bg-success"
                        : profile.status === "inactive"
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
                  {profile.status}
                </td>
                <td className="">
                  <span
                    class="d-inline-block"
                    tabindex="0"
                    data-bs-toggle="tooltip"
                    title="view"
                  >
                    <Link
                      to={`/profileList/${profile.id}/${profile.tenant_joining_form.id}`}
                    >
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
                  >
                    <i
                      className="text-danger"
                      onClick={() => handleDeleteProfile(profile.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </i>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Add User Bootstrap Modal */}
      <div
        className="modal fade"
        id="addnewprofile"
        tabIndex="-1"
        aria-labelledby="addnewprofileLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addnewprofileLabel">
                ADD New User
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                {/* Form fields for adding a new profile */}
                {/* Example: Username, Email, Password, Mobile Number, Birthday */}

                <div className="mb-3">
                  <label htmlFor="tenantJoiningForm">
                    Link Tenant Joining Form to this user
                  </label>
                  <Select
                    id="tenantJoiningForm"
                    options={tenantJoiningForms.results.map((form) => ({
                      value: form.id,
                      label: form.name,
                    }))}
                    onChange={handleTenantFormChange}
                    value={
                      newProfile.tenant_joining_form
                        ? {
                            value: newProfile.tenant_joining_form,
                            label: tenantJoiningForms.results.find(
                              (form) =>
                                form.id === newProfile.tenant_joining_form
                            ).name,
                          }
                        : null
                    }
                    isSearchable
                    placeholder="Select Tenant Joining Form"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter username"
                    value={newProfile.user.username}
                    onChange={(e) =>
                      setNewProfile({
                        ...newProfile,
                        user: { ...newProfile.user, username: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    value={newProfile.user.email}
                    onChange={(e) =>
                      setNewProfile({
                        ...newProfile,
                        user: { ...newProfile.user, email: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={newProfile.user.password}
                    onChange={(e) =>
                      setNewProfile({
                        ...newProfile,
                        user: { ...newProfile.user, password: e.target.value },
                      })
                    }
                  />
                  <span className="input-group-text">
                    <FontAwesomeIcon
                      icon={showPassword ? faEye : faEyeSlash}
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ cursor: "pointer" }}
                    />
                  </span>
                </div>
                <div className="mb-3">
                  <label htmlFor="mobileNumber" className="form-label">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="mobileNumber"
                    placeholder="Enter mobile number"
                    value={newProfile.user_primary_mobile_number}
                    onChange={(e) =>
                      setNewProfile({
                        ...newProfile,
                        user_primary_mobile_number: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="birthday" className="form-label">
                    Birthday
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="birthday"
                    value={newProfile.user_birthday}
                    onChange={(e) =>
                      setNewProfile({
                        ...newProfile,
                        user_birthday: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Add other necessary form fields */}
              </form>
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
                onClick={handleAddProfile}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileList;
