import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PgBed from "./PgBed";
import useAxios from "../util/useAxios";

const PgDetails = () => {
  const { id } = useParams();
  const api = useAxios();
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
    beds: [],
    amenities: [],
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
    api
      .get(`/dolphinpg/properties/${id}/`)
      .then((response) => {
        setPgData(response.data);
        setUpdatedPgData(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this PG?")) {
      api
        .delete(`/dolphinpg/properties/${id}/`)
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
    api
      .put(`/dolphinpg/properties/${id}/`, updatedPgData, config)
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
        <div className="row">
          <div className="col-md-6">
            <p className="mb-2">Name: {pgData.name}</p>
            <p className="mb-2">Street Address: {pgData.street_address}</p>
            <p className="mb-2">City: {pgData.city}</p>
            <p className="mb-2">Locality: {pgData.locality}</p>
            <p className="mb-2">Pincode: {pgData.pincode}</p>
            <p className="mb-2">Phone: {pgData.phone}</p>
          </div>
          <div className="col-md-6">
            <p className="mb-2">Gender: {pgData.gender}</p>
            <p className="mb-2">Lock-in Period: {pgData.lockin_period}</p>
            <p className="mb-4">Notice Period: {pgData.notice_period}</p>
            <small className="text-muted">
              You can Upload images and add amenities by clicking Update Details
              button
            </small>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <h6>Beds Info</h6>
            {pgData.beds &&
              pgData.beds.map((bed) => {
                return (
                  <div key={bed.id}>
                    <p>Bed Name: {bed.name}</p>
                    <p>Price: {bed.price}</p>
                    <p>Deposit: {bed.deposit}</p>
                    <p>Sharing: {bed.sharing}</p>
                  </div>
                );
              })}
          </div>
          <div className="col-md-6">
            <h6>Amenities Info</h6>
            <div className="d-flex flex-wrap">
              {pgData.amenities &&
                pgData.amenities.map((amenity) => {
                  return <p key={amenity.id}>{amenity.amenity_name} , </p>;
                })}
            </div>
          </div>
        </div>
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
                <form>{/* Input fields for updating PG details */}</form>
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

      <h6 className="mt-4">
        Add PG-Bed Details and Pricing For Customers and Frontend
      </h6>

      <PgBed pg_id={id} />
    </div>
  );
};

export default PgDetails;
