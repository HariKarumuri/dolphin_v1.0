import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import useAxios from "../../util/useAxios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import "toastr/build/toastr.min.css";
import toastr from "toastr";
import TJPdf from "./TJPdf";
import { PDFViewer } from "@react-pdf/renderer";

import { jsPDF } from "jspdf";
import * as htmlToImage from "html-to-image";

const TenantJoiningDetailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const api = useAxios();
  const [tenantDetails, setTenantDetails] = useState(null);
  const [updatedTenant, setUpdatedTenant] = useState({
    aadhar_image_upload_back: null,
    aadhar_image_upload_front: null,
    aadhar_number: "",
    company_name: "",
    date_of_birth: "",
    date_of_joining: "",
    education_qualification: "",
    email_id: "",
    emergency_number: "",
    father_mobile_number: "",
    father_name: "",
    maintenance_charges: "",
    mobile_number: "",
    monthly_rent: "",
    mother_mobile_number: "",
    mother_name: "",
    name: "",
    office_address: "",
    pg_name: "",
    requested_room_number: "",
    residential_address: "",
    security_deposit: "",
    status: "",
    tenant_image: null,
    vacating_date: "",
  });
  const [isModalOpen, setModalOpen] = useState(false); // State for modal visibility
  const [pdfGenerating, setPdfGenerating] = useState(false); // State to track PDF generation
  const fetchTenantDetails = async () => {
    try {
      const response = await api.get(`/dolphinpg/tenantjoiningform/${id}/`);
      setTenantDetails(response.data);
      console.log(response.data);
      setUpdatedTenant({
        aadhar_image_upload_back:
          response.data.aadhar_image_upload_back || null,
        aadhar_image_upload_front:
          response.data.aadhar_image_upload_front || null,
        aadhar_number: response.data.aadhar_number || "",
        company_name: response.data.company_name || "",
        date_of_birth: response.data.date_of_birth || "",
        date_of_joining: response.data.date_of_joining || "",
        education_qualification: response.data.education_qualification || "",
        email_id: response.data.email_id || "",
        emergency_number: response.data.emergency_number || "",
        father_mobile_number: response.data.father_mobile_number || "",
        father_name: response.data.father_name || "",
        maintenance_charges: response.data.maintenance_charges || "",
        mobile_number: response.data.mobile_number || "",
        monthly_rent: response.data.monthly_rent || "",
        mother_mobile_number: response.data.mother_mobile_number || "",
        mother_name: response.data.mother_name || "",
        name: response.data.name || "",
        office_address: response.data.office_address || "",
        pg_name: response.data.pg_name || "",
        requested_room_number: response.data.requested_room_number || "",
        residential_address: response.data.residential_address || "",
        security_deposit: response.data.security_deposit || "",
        status: response.data.status || "",
        tenant_image: response.data.tenant_image || null,
        vacating_date: response.data.vacating_date || "",
      });
    } catch (error) {
      console.error("Error fetching tenant details:", error);
    }
  };
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    fetchTenantDetails();
    setTenantDetails({});
  }, []);

  const handleFieldChange = (fieldName, value) => {
    setUpdatedTenant((prevTenant) => ({
      ...prevTenant,
      [fieldName]: value,
    }));
  };
  function getCookie(name) {
    const cookieValue = document.cookie.match(
      "(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"
    );
    return cookieValue ? cookieValue.pop() : "";
  }

  const handleUpdateTenantBasics = async () => {
    try {
      // Get the CSRF token from the cookie
      const csrftoken = getCookie("csrftoken");

      // Include the CSRF token in the headers
      const headers = {
        "X-CSRFToken": csrftoken,
        "Content-Type": "application/json",
      };

      // Make the PUT request with the updatedTenant data and headers
      await axios.put(
        `https://popularpg.in/dolphinpg/tenantjoiningform/${id}/`,
        {
          name: updatedTenant.name,
          company_name: updatedTenant.company_name,
          education_qualification: updatedTenant.education_qualification,
          office_address: updatedTenant.office_address,
        },
        { headers }
      );

      // Show success notification using toastr
      toastr.success("Tenant basics have been updated successfully!");

      setTimeout(() => {
        window.location.reload();
      }, 750);

      // Additional handling if needed
    } catch (error) {
      console.error("Error updating tenant basics:", error);

      // Show error notification using toastr
      toastr.error(
        "There was an error updating tenant basics. Please try again."
      );
    }
  };

  const handleUpdateTenantPgDetails = async () => {
    try {
      // Get the CSRF token from the cookie
      const csrftoken = getCookie("csrftoken");

      // Include the CSRF token in the headers
      const headers = {
        "X-CSRFToken": csrftoken,
        "Content-Type": "application/json",
      };

      // Make the PUT request with the updatedTenant data and headers
      await axios.put(
        `https://popularpg.in/dolphinpg/tenantjoiningform/${id}/`,
        {
          monthly_rent: updatedTenant.monthly_rent,
          requested_room_number: updatedTenant.requested_room_number,
          pg_name: updatedTenant.pg_name,
          security_deposit: updatedTenant.security_deposit,
          maintenance_charges: updatedTenant.maintenance_charges,
          date_of_joining: updatedTenant.date_of_joining,
        },
        { headers }
      );

      // Show success notification using toastr
      toastr.success("Tenant PG Details have been updated successfully!");

      setTimeout(() => {
        window.location.reload();
      }, 750);

      // Additional handling if needed
    } catch (error) {
      console.error("Error updating tenant pg Details:", error);

      // Show error notification using toastr
      toastr.error(
        "There was an error updating tenant pg Details. Please try again."
      );
    }
  };

  const handleUpdateTenantDetailsAdv = async () => {
    try {
      // Get the CSRF token from the cookie
      const csrftoken = getCookie("csrftoken");

      // Include the CSRF token in the headers
      const headers = {
        "X-CSRFToken": csrftoken,
        "Content-Type": "application/json",
      };

      // Make the PUT request with the updatedTenant data and headers
      await axios.put(
        `https://popularpg.in/dolphinpg/tenantjoiningform/${id}/`,
        {
          residential_address: updatedTenant.residential_address,
          mobile_number: updatedTenant.mobile_number,
          email_id: updatedTenant.email_id,
          date_of_birth: updatedTenant.date_of_birth,
        },
        { headers }
      );

      // Show success notification using toastr
      toastr.success("Tenant basics have been updated successfully!");

      setTimeout(() => {
        window.location.reload();
      }, 750);

      // Additional handling if needed
    } catch (error) {
      console.error("Error updating tenant basics:", error);

      // Show error notification using toastr
      toastr.error(
        "There was an error updating tenant basics. Please try again."
      );
    }
  };

  const handleUpdateAadharDetails = async () => {
    try {
      // Get the CSRF token from the cookie
      const csrftoken = getCookie("csrftoken");

      // Include the CSRF token in the headers
      const headers = {
        "X-CSRFToken": csrftoken,
        "Content-Type": "application/json",
      };

      // Make the PUT request with the updatedTenant data and headers
      await axios.put(
        `https://popularpg.in/dolphinpg/tenantjoiningform/${id}/`,
        {
          aadhar_number: updatedTenant.aadhar_number,
        },
        { headers }
      );

      // Show success notification using toastr
      toastr.success("Tenant basics have been updated successfully!");

      setTimeout(() => {
        window.location.reload();
      }, 750);

      // Additional handling if needed
    } catch (error) {
      console.error("Error updating tenant basics:", error);

      // Show error notification using toastr
      toastr.error(
        "There was an error updating tenant basics. Please try again."
      );
    }
  };
  const handleUpdateStatusDetails = async () => {
    try {
      // Get the CSRF token from the cookie
      const csrftoken = getCookie("csrftoken");

      // Include the CSRF token in the headers
      const headers = {
        "X-CSRFToken": csrftoken,
        "Content-Type": "application/json",
      };

      // Make the PUT request with the updatedTenant data and headers
      await axios.put(
        `https://popularpg.in/dolphinpg/tenantjoiningform/${id}/`,
        {
          status: updatedTenant.status,
        },
        { headers }
      );

      // Show success notification using toastr
      toastr.success("Tenant basics have been updated successfully!");

      setTimeout(() => {
        window.location.reload();
      }, 750);

      // Additional handling if needed
    } catch (error) {
      console.error("Error updating tenant basics:", error);

      // Show error notification using toastr
      toastr.error(
        "There was an error updating tenant basics. Please try again."
      );
    }
  };

  const handleUpdateParentDetails = async () => {
    try {
      // Get the CSRF token from the cookie
      const csrftoken = getCookie("csrftoken");

      // Include the CSRF token in the headers
      const headers = {
        "X-CSRFToken": csrftoken,
        "Content-Type": "application/json",
      };

      // Make the PUT request with the updatedTenant data and headers
      await axios.put(
        `https://popularpg.in/dolphinpg/tenantjoiningform/${id}/`,
        {
          father_name: updatedTenant.father_name,
          father_mobile_number: updatedTenant.father_mobile_number,
          mother_name: updatedTenant.mother_name,
          mother_mobile_number: updatedTenant.mother_mobile_number,
        },
        { headers }
      );

      // Show success notification using toastr
      toastr.success("Tenant basics have been updated successfully!");

      setTimeout(() => {
        window.location.reload();
      }, 750);

      // Additional handling if needed
    } catch (error) {
      console.error("Error updating tenant basics:", error);

      // Show error notification using toastr
      toastr.error(
        "There was an error updating tenant basics. Please try again."
      );
    }
  };

  const handlePermenatDelete = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        // User clicked "Yes, delete it!"
        const csrftoken = getCookie("csrftoken");
        const headers = {
          "X-CSRFToken": csrftoken,
          "Content-Type": "application/json",
        };

        await axios.delete(
          `https://popularpg.in/dolphinpg/tenantjoiningform/${id}/`,
          { headers }
        );

        Swal.fire({
          title: "Deleted!",
          text: "The record has been deleted.",
          icon: "success",
        });
        navigate(-1);
      }
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  const generatePDF = async () => {
    try {
      setPdfGenerating(true); // Set state to indicate PDF generation is in progress

      const htmlElement = document.getElementById("tenant-details");
      if (!htmlElement) {
        throw new Error("HTML element not found");
      }

      const pdf = new jsPDF();
      pdf.html(htmlElement, {
        callback: () => {
          pdf.save("tenant-details.pdf");
          setPdfGenerating(false); // Reset state after PDF generation completes
        },
        scale: 0.7, // Adjust the scale factor as needed (0.7 means 70% of original size)
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      setPdfGenerating(false); // Reset state after PDF generation fails
    }
  };

  return (
    <div className=" mt-4">
      <div class="row">
        <div class="col">
          <nav aria-label="breadcrumb" class="bg-light rounded-3 p-3 mb-4">
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li class="breadcrumb-item">
                <Link to="/joiningdata">Tenant Joining </Link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Tenant Profile
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {tenantDetails && (
        <div id="tenant-details">
          <div className="container py-5">
            <div className="row">
              {/* Tenant basic details  */}
              <div className="col-lg-4">
                <h6 className="text-secondary">Tenant </h6>
                <div className="card mb-4">
                  <div className="d-flex justify-content-end p-1">
                    <i
                      className="text-secondary "
                      style={{ cursor: "pointer" }}
                      data-bs-toggle="modal"
                      data-bs-target="#tenantBasics"
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </i>

                    {/* update modal below  */}
                    <div
                      class="modal fade"
                      id="tenantBasics"
                      tabindex="-1"
                      role="dialog"
                      aria-labelledby="tenantBasicsLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="tenantBasicsLabel">
                              Update tenant Basic details
                            </h5>
                            <button
                              type="button"
                              class="close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body">
                            <>
                              <div className="mb-3">
                                <label
                                  htmlFor="updateName"
                                  className="form-label"
                                >
                                  Name *
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="updateName"
                                  value={updatedTenant.name}
                                  onChange={(e) =>
                                    handleFieldChange("name", e.target.value)
                                  }
                                  required
                                />
                              </div>
                              <div className="mb-3">
                                <label
                                  htmlFor="updateCompanyName"
                                  className="form-label"
                                >
                                  Company Name *
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="updateCompanyName"
                                  value={updatedTenant.company_name}
                                  onChange={(e) =>
                                    handleFieldChange(
                                      "company_name",
                                      e.target.value
                                    )
                                  }
                                  required
                                />
                              </div>
                              <div className="mb-3">
                                <label
                                  htmlFor="updateEducation"
                                  className="form-label"
                                >
                                  Education Qualification *
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="updateEducation"
                                  value={updatedTenant.education_qualification}
                                  onChange={(e) =>
                                    handleFieldChange(
                                      "education_qualification",
                                      e.target.value
                                    )
                                  }
                                  required
                                />
                              </div>
                              <div className="mb-3">
                                <label
                                  htmlFor="updateOfficeAddress"
                                  className="form-label"
                                >
                                  Office Address *
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="updateOfficeAddress"
                                  value={updatedTenant.office_address}
                                  onChange={(e) =>
                                    handleFieldChange(
                                      "office_address",
                                      e.target.value
                                    )
                                  }
                                  required
                                />
                              </div>
                            </>
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              type="button"
                              class="btn btn-primary"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              onClick={() => {
                                handleUpdateTenantBasics();
                              }}
                            >
                              Save changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card-body text-center">
                    <img
                      src={tenantDetails.tenant_image}
                      alt="avatar"
                      className="rounded-circle object-fit-contain"
                      style={{ width: "150px", height: "150px" }}
                    />
                    <h5 className="my-3">{tenantDetails.name}</h5>
                    <p className="text-muted mb-1">
                      {tenantDetails.company_name},
                      {tenantDetails.education_qualification}
                    </p>
                    <p className="text-muted mb-4">
                      {tenantDetails.office_address}
                    </p>
                  </div>
                </div>
                {/* Teant Pg details below */}
                <h6 className="text-secondary">PG Details</h6>
                <div className="card mb-4 mb-lg-0">
                  <div className="d-flex justify-content-end p-1">
                    <i
                      className="text-secondary "
                      style={{ cursor: "pointer" }}
                      data-bs-toggle="modal"
                      data-bs-target="#PgDetails"
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </i>

                    <div
                      class="modal fade"
                      id="PgDetails"
                      tabindex="-1"
                      role="dialog"
                      aria-labelledby="PgDetailsLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="PgDetailsLabel">
                              Update tenant PG details
                            </h5>
                            <button
                              type="button"
                              class="close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body">
                            <>
                              <div className="mb-3">
                                <label
                                  htmlFor="updateMonthlyRent"
                                  className="form-label"
                                >
                                  Monthly Rent *
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="updateMonthlyRent"
                                  value={updatedTenant.monthly_rent}
                                  onChange={(e) =>
                                    handleFieldChange(
                                      "monthly_rent",
                                      e.target.value
                                    )
                                  }
                                  required
                                />
                              </div>

                              <div className="mb-3">
                                <label
                                  htmlFor="updateRequestedRoom"
                                  className="form-label"
                                >
                                  Requested Room Number *
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="updateRequestedRoom"
                                  value={updatedTenant.requested_room_number}
                                  onChange={(e) =>
                                    handleFieldChange(
                                      "requested_room_number",
                                      e.target.value
                                    )
                                  }
                                  required
                                />
                              </div>

                              <div className="mb-3">
                                <label
                                  htmlFor="updatePGName"
                                  className="form-label"
                                >
                                  PG Name *
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="updatePGName"
                                  value={updatedTenant.pg_name}
                                  onChange={(e) =>
                                    handleFieldChange("pg_name", e.target.value)
                                  }
                                  required
                                />
                              </div>

                              <div className="mb-3">
                                <label
                                  htmlFor="updateSecurityDeposit"
                                  className="form-label"
                                >
                                  Security Deposit *
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="updateSecurityDeposit"
                                  value={updatedTenant.security_deposit}
                                  onChange={(e) =>
                                    handleFieldChange(
                                      "security_deposit",
                                      e.target.value
                                    )
                                  }
                                  required
                                />
                              </div>

                              <div className="mb-3">
                                <label
                                  htmlFor="updateMaintenanceCharges"
                                  className="form-label"
                                >
                                  Maintenance Charges *
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="updateMaintenanceCharges"
                                  value={updatedTenant.maintenance_charges}
                                  onChange={(e) =>
                                    handleFieldChange(
                                      "maintenance_charges",
                                      e.target.value
                                    )
                                  }
                                  required
                                />
                              </div>

                              <div className="mb-3">
                                <label
                                  htmlFor="updateDateOfJoining"
                                  className="form-label"
                                >
                                  Date of Joining *
                                </label>
                                <input
                                  type="date"
                                  className="form-control"
                                  id="updateDateOfJoining"
                                  value={updatedTenant.date_of_joining}
                                  onChange={(e) =>
                                    handleFieldChange(
                                      "date_of_joining",
                                      e.target.value
                                    )
                                  }
                                  required
                                />
                              </div>
                            </>
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              type="button"
                              class="btn btn-primary"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              onClick={() => {
                                handleUpdateTenantPgDetails();
                              }}
                            >
                              Save changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Rental detail Card  */}
                  <div className="card-body p-0">
                    <ul className="list-group list-group-flush rounded-3">
                      <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <p className=" text-warning">Rent</p>
                        <p className="mb-0">{tenantDetails.monthly_rent}</p>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <p className="text-warning"> Room No.</p>
                        <p className="mb-0">
                          {tenantDetails.requested_room_number}
                        </p>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <p className="text-warning">PG Name</p>
                        <p className="mb-0">{tenantDetails.pg_name}</p>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <p className="text-warning">Deposit</p>
                        <p className="mb-0">{tenantDetails.security_deposit}</p>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <p className="text-warning">Maintenance</p>
                        <p className="mb-0">
                          {tenantDetails.maintenance_charges}
                        </p>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <p className="text-warning">Date of joining</p>
                        <p className="mb-0">{tenantDetails.date_of_joining}</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-8">
                {/* tenant detail card  */}
                <h6 className="text-secondary">Tenant Details</h6>
                <div className="card mb-4">
                  <div className="d-flex justify-content-end p-1">
                    <i
                      className="text-secondary "
                      style={{ cursor: "pointer" }}
                      data-bs-toggle="modal"
                      data-bs-target="#tenantDetailsAdv"
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </i>
                    <div
                      class="modal fade"
                      id="tenantDetailsAdv"
                      tabindex="-1"
                      role="dialog"
                      aria-labelledby="tenantDetailsAdvLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="tenantDetailsAdvLabel">
                              Update tenant Adv details
                            </h5>
                            <button
                              type="button"
                              class="close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body">
                            <>
                              <div className="mb-3">
                                <label
                                  htmlFor="updateResidentialAddress"
                                  className="form-label"
                                >
                                  Residential Address
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="updateResidentialAddress"
                                  value={updatedTenant.residential_address}
                                  onChange={(e) =>
                                    handleFieldChange(
                                      "residential_address",
                                      e.target.value
                                    )
                                  }
                                  required
                                />
                              </div>

                              <div className="mb-3">
                                <label
                                  htmlFor="updateMobileNumber"
                                  className="form-label"
                                >
                                  Mobile Number
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="updateMobileNumber"
                                  value={updatedTenant.mobile_number}
                                  onChange={(e) =>
                                    handleFieldChange(
                                      "mobile_number",
                                      e.target.value
                                    )
                                  }
                                  required
                                />
                              </div>

                              <div className="mb-3">
                                <label
                                  htmlFor="updateEmail"
                                  className="form-label"
                                >
                                  Email ID
                                </label>
                                <input
                                  type="email"
                                  className="form-control"
                                  id="updateEmail"
                                  value={updatedTenant.email_id}
                                  onChange={(e) =>
                                    handleFieldChange(
                                      "email_id",
                                      e.target.value
                                    )
                                  }
                                  required
                                />
                              </div>

                              <div className="mb-3">
                                <label
                                  htmlFor="updateDateOfBirth"
                                  className="form-label"
                                >
                                  Date of Birth
                                </label>
                                <input
                                  type="date"
                                  className="form-control"
                                  id="updateDateOfBirth"
                                  value={updatedTenant.date_of_birth}
                                  onChange={(e) =>
                                    handleFieldChange(
                                      "date_of_birth",
                                      e.target.value
                                    )
                                  }
                                  required
                                />
                              </div>
                            </>
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              type="button"
                              class="btn btn-primary"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              onClick={() => {
                                handleUpdateTenantDetailsAdv();
                              }}
                            >
                              Save changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">DOB</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">
                          {tenantDetails.date_of_birth}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Email</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">
                          {tenantDetails.email_id}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Phone</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">
                          {tenantDetails.mobile_number}
                        </p>
                      </div>
                    </div>

                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Residential Address</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">
                          {tenantDetails.residential_address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Parent details card */}
                <h6 className="text-secondary">Tenant Parents Details</h6>
                <div className="card mb-4">
                  <div className="d-flex justify-content-end p-1">
                    <i
                      className="text-secondary "
                      style={{ cursor: "pointer" }}
                      data-bs-toggle="modal"
                      data-bs-target="#ParentDetails"
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </i>
                    <div
                      class="modal fade"
                      id="ParentDetails"
                      tabindex="-1"
                      role="dialog"
                      aria-labelledby="ParentDetailsLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="ParentDetailsLabel">
                              Update Parent details
                            </h5>
                            <button
                              type="button"
                              class="close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body">
                            <>
                              <div className="mb-3">
                                <label
                                  htmlFor="updateFatherName"
                                  className="form-label"
                                >
                                  Father's Name
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="updateFatherName"
                                  value={updatedTenant.father_name}
                                  onChange={(e) =>
                                    handleFieldChange(
                                      "father_name",
                                      e.target.value
                                    )
                                  }
                                  required
                                />
                              </div>

                              <div className="mb-3">
                                <label
                                  htmlFor="updateFatherMobileNumber"
                                  className="form-label"
                                >
                                  Father's Mobile Number
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="updateFatherMobileNumber"
                                  value={updatedTenant.father_mobile_number}
                                  onChange={(e) =>
                                    handleFieldChange(
                                      "father_mobile_number",
                                      e.target.value
                                    )
                                  }
                                  required
                                />
                              </div>

                              <div className="mb-3">
                                <label
                                  htmlFor="updateMotherName"
                                  className="form-label"
                                >
                                  Mother's Name
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="updateMotherName"
                                  value={updatedTenant.mother_name}
                                  onChange={(e) =>
                                    handleFieldChange(
                                      "mother_name",
                                      e.target.value
                                    )
                                  }
                                  required
                                />
                              </div>

                              <div className="mb-3">
                                <label
                                  htmlFor="updateMotherMobileNumber"
                                  className="form-label"
                                >
                                  Mother's Mobile Number
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="updateMotherMobileNumber"
                                  value={updatedTenant.mother_mobile_number}
                                  onChange={(e) =>
                                    handleFieldChange(
                                      "mother_mobile_number",
                                      e.target.value
                                    )
                                  }
                                  required
                                />
                              </div>
                            </>
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              type="button"
                              class="btn btn-primary"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              onClick={() => {
                                handleUpdateParentDetails();
                              }}
                            >
                              Save changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Father's Name</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">
                          {tenantDetails.father_name}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Father's Phone</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">
                          {tenantDetails.father_mobile_number}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Mother's Name:</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">
                          {tenantDetails.mother_name}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Mother's Number</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">
                          {tenantDetails.mother_mobile_number}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* AAdar card */}
                <h6 className="text-secondary">Tenant Aadhar Details</h6>
                <div className="row">
                  <div className="col-md-6">
                    <div className="card mb-4 mb-md-0">
                      <div className="d-flex justify-content-end p-1">
                        <i
                          className="text-secondary "
                          style={{ cursor: "pointer" }}
                          data-bs-toggle="modal"
                          data-bs-target="#AadharDetails"
                        >
                          <FontAwesomeIcon icon={faPen} />
                        </i>
                        <div
                          class="modal fade"
                          id="AadharDetails"
                          tabindex="-1"
                          role="dialog"
                          aria-labelledby="AadharDetailsLabel"
                          aria-hidden="true"
                        >
                          <div class="modal-dialog" role="document">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="AadharDetailsLabel">
                                  Update Aadhar Basic details
                                </h5>
                                <button
                                  type="button"
                                  class="close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div class="modal-body">
                                <>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="updateAadharNumber"
                                      className="form-label"
                                    >
                                      Aadhar Number *
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="updateAadharNumber"
                                      value={updatedTenant.aadhar_number}
                                      onChange={(e) =>
                                        handleFieldChange(
                                          "aadhar_number",
                                          e.target.value
                                        )
                                      }
                                      required
                                    />
                                  </div>
                                </>
                              </div>
                              <div class="modal-footer">
                                <button
                                  type="button"
                                  class="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                >
                                  Close
                                </button>
                                <button
                                  type="button"
                                  class="btn btn-primary"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                  onClick={() => {
                                    handleUpdateAadharDetails();
                                  }}
                                >
                                  Save changes
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <p className="mb-4">
                          <span className="text-primary font-italic me-1">
                            AADHAR No.
                          </span>
                          {tenantDetails.aadhar_number}
                        </p>
                        <hr />
                        <a href={tenantDetails.aadhar_image_upload_front}>
                          {" "}
                          View Aadhar Front
                        </a>
                        <hr />
                        <a href={tenantDetails.aadhar_image_upload_back}>
                          View Aadhar Back
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card mb-4 mb-md-0">
                      <div className="d-flex justify-content-end p-1">
                        <i
                          className="text-secondary "
                          style={{ cursor: "pointer" }}
                          data-bs-toggle="modal"
                          data-bs-target="#StatusDetail"
                        >
                          <FontAwesomeIcon icon={faPen} />
                        </i>
                        <div
                          class="modal fade"
                          id="StatusDetail"
                          tabindex="-1"
                          role="dialog"
                          aria-labelledby="StatusDetailLabel"
                          aria-hidden="true"
                        >
                          <div class="modal-dialog" role="document">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="StatusDetailLabel">
                                  Update Status detail:
                                </h5>
                                <button
                                  type="button"
                                  class="close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div class="modal-body">
                                <>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="updateStatus"
                                      className="form-label"
                                    >
                                      Status *
                                    </label>
                                    <select
                                      className="form-select"
                                      id="updateStatus"
                                      value={updatedTenant.status}
                                      onChange={(e) =>
                                        handleFieldChange(
                                          "status",
                                          e.target.value
                                        )
                                      }
                                      required
                                    >
                                      <option value="pending">Pending</option>
                                      <option value="verified">Verified</option>
                                      <option value="deleted">Deleted</option>
                                    </select>
                                  </div>
                                </>
                              </div>
                              <div class="modal-footer">
                                <button
                                  type="button"
                                  class="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                >
                                  Close
                                </button>
                                <button
                                  type="button"
                                  class="btn btn-primary"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                  onClick={() => {
                                    handleUpdateStatusDetails();
                                  }}
                                >
                                  Save changes
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <p className="mb-4">
                          <span className="text-primary font-italic me-1">
                            Verification Status
                          </span>{" "}
                          {tenantDetails.status}
                        </p>
                        {/* ... (similar project status details) */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end mb-3">
            <button
              className="btn btn-danger"
              onClick={() => {
                handlePermenatDelete();
              }}
            >
              Permenantly delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantJoiningDetailView;
