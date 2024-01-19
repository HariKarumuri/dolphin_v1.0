import React, { useState, useEffect } from "react";
import axios from "axios";

const PgProperty = () => {
  const [pgList, setPgList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newPgData, setNewPgData] = useState({
    name: "",
    street_address: "",
    city: "",
    locality: "",
    pincode: "",
    phone: "",
    gender: "",
    lockin_period: "",
    notice_period: "",
    property_images: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPgData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    setNewPgData((prevData) => ({
      ...prevData,
      property_images: files,
    }));
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleAddPg = async () => {
    try {
      // Use FormData
      const formData = new FormData();
      for (const key in newPgData) {
        if (key === "property_images") {
          for (let i = 0; i < newPgData[key].length; i++) {
            formData.append(`${key}[${i}]`, newPgData[key][i]);
          }
        } else {
          formData.append(key, newPgData[key]);
        }
      }

      // Set headers for multipart/form-data
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      await axios.post(
        "https://popularpg.in/dolphinpg/properties/",
        formData,
        config
      );

      setShowModal(false);
      fetchData();
    } catch (error) {
      console.error("Error adding PG:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://popularpg.in/dolphinpg/properties/"
      );
      setPgList(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>My PG List</h2>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addPgModal"
      >
        Add PG
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {pgList.results.map((pg) => (
            <div
              key={pg.id}
              className="property-home d-flex align-items-center justify-content-center"
            >
              <p className="fw-bold">{pg.name}</p>
            </div>
          ))}
        </ul>
      )}

      <div
        className="modal fade"
        id="addPgModal"
        tabIndex="-1"
        aria-labelledby="addPgModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addPgModalLabel">
                Add PG
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseModal}
              ></button>
            </div>
            <div className="modal-body">
              {/* Add form fields for PG data */}
              {/* Example: */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={newPgData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="streetAddress" className="form-label">
                  Street Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="streetAddress"
                  name="street_address"
                  value={newPgData.street_address}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  value={newPgData.city}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="locality" className="form-label">
                  Locality
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="locality"
                  name="locality"
                  value={newPgData.locality}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="pincode" className="form-label">
                  Pincode
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="pincode"
                  name="pincode"
                  value={newPgData.pincode}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={newPgData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <select
                  className="form-select"
                  id="gender"
                  name="gender"
                  value={newPgData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="colive">Colive</option>
                  <option value="any">Any</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="lockinPeriod" className="form-label">
                  Lockin Period
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lockinPeriod"
                  name="lockin_period"
                  value={newPgData.lockin_period}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="noticePeriod" className="form-label">
                  Notice Period
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="noticePeriod"
                  name="notice_period"
                  value={newPgData.notice_period}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="propertyImages" className="form-label">
                  Property Images
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="propertyImages"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddPg}
              >
                Add PG
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PgProperty;
