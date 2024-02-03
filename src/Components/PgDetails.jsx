import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PgBed from "./PgBed";

const PgDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pgData, setPgData] = useState({
    name: "",
    street_address: "",
    city: "",
    locality: "",
    pincode: "",
    phone: "",
    gender: "",
    lockin_period: "",
    notice_period: "",
    uploaded_images: [],
  });
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatedPgData, setUpdatedPgData] = useState({
    name: "",
    street_address: "",
    city: "",
    locality: "",
    pincode: "",
    phone: "",
    gender: "",
    lockin_period: "",
    notice_period: "",
    uploaded_images: [],
  });

  useEffect(() => {
    console.log("Fetching PG details...", id);
    axios
      .get(`https://popularpg.in/dolphinpg/properties/${id}/`)
      .then((response) => {
        setPgData(response.data);
        setUpdatedPgData(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this PG?")) {
      axios
        .delete(`https://popularpg.in/dolphinpg/properties/${id}/`)
        .then(() => {
          alert("PG deleted successfully");
          navigate("/");
        })
        .catch((error) => console.error(error));
    }
  };

  const handleUpdate = () => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .put(
        `https://popularpg.in/dolphinpg/properties/${id}/`,
        updatedPgData,
        config
      )
      .then(() => {
        alert("PG details updated successfully");
      })
      .catch((error) => console.error(error));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedPgData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">PG Details</h1>
      <div className="card mb-4 p-4">
        <p className="mb-2">Name: {pgData.name}</p>
        <p className="mb-2">Street Address: {pgData.street_address}</p>
        <p className="mb-2">City: {pgData.city}</p>
        <p className="mb-2">Locality: {pgData.locality}</p>
        <p className="mb-2">Pincode: {pgData.pincode}</p>
        <p className="mb-2">Phone: {pgData.phone}</p>
        <p className="mb-2">Gender: {pgData.gender}</p>
        <p className="mb-2">Lock-in Period: {pgData.lockin_period}</p>
        <p className="mb-4">Notice Period: {pgData.notice_period}</p>
        beds info
        {pgData.beds &&
          pgData.beds.map((bed) => {
            return (
              <div>
                <p>bed name: {bed.name}</p>
                <p>{bed.price}</p>
                <p>{bed.deposit}</p>
                <p>{bed.sharing}</p>
              </div>
            );
          })}
        amenities info
        {pgData.amenities &&
          pgData.amenities.map((amenity) => {
            return <p>{amenity.amenity_name}</p>;
          })}
        <small className="text-muted">
          You can Upload images and add amenities by clicking Update Details
          button
        </small>
        <div className="d-flex mt-3">
          <button className="btn btn-danger mr-2" onClick={handleDelete}>
            Delete PG
          </button>
          <button
            className="btn btn-primary"
            onClick={() => setShowUpdateModal(true)}
          >
            Edit Details
          </button>
        </div>
      </div>
      {showUpdateModal && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-dialog" style={{ margin: "10% auto" }}>
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title">Update PG Details</h2>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={updatedPgData.name}
                      onChange={handleInputChange}
                      placeholder="Name"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      name="street_address"
                      value={updatedPgData.street_address}
                      onChange={handleInputChange}
                      placeholder="Street Address"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      value={updatedPgData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      name="locality"
                      value={updatedPgData.locality}
                      onChange={handleInputChange}
                      placeholder="Locality"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      name="pincode"
                      value={updatedPgData.pincode}
                      onChange={handleInputChange}
                      placeholder="Pincode"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={updatedPgData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      name="gender"
                      value={updatedPgData.gender}
                      onChange={handleInputChange}
                      placeholder="Gender"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      name="lockin_period"
                      value={updatedPgData.lockin_period}
                      onChange={handleInputChange}
                      placeholder="Lock-in Period"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      name="notice_period"
                      value={updatedPgData.notice_period}
                      onChange={handleInputChange}
                      placeholder="Notice Period"
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  Edit
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowUpdateModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <h6>Add PG-Bed Details and Pricing For Customers and Frontend</h6>
      
      <PgBed pg_id={id} />
    </div>
  );
};

export default PgDetails;
