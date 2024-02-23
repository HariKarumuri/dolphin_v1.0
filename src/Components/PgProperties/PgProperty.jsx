import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDolphinPGContext } from "../../Context/DolphinPgcontext";
import useAxios from "../../util/useAxios";

const PgProperty = () => {
  const [amenities, setAmenities] = useState({ results: [] });
  const [pgList, setPgList] = useState({ results: [] });
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const fileInputRef = useRef(null);
  const api = useAxios();

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };
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
    min_price: "",
    cover_image: "",
    uploaded_images: [],
    amenities: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPgData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAmenityClick = (amenityId) => {
    setNewPgData((prevData) => {
      const selectedAmenities = prevData.amenities.includes(amenityId)
        ? prevData.amenities.filter((id) => id !== amenityId)
        : [...prevData.amenities, amenityId];

      const updatedData = {
        ...prevData,
        amenities: selectedAmenities.map((id) => parseInt(id, 10)),
      };

      console.log("Updated newPgData:", updatedData);

      return updatedData;
    });
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const newImages = Array.from(files).map((file) => ({
      title: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2),
      file: file, // Keep the actual File object
    }));

    setSelectedImages([...selectedImages, ...newImages]);
  };

  const removeImage = (index) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
  };

  const handleUpload = () => {
    // Here you can handle the upload logic
    setNewPgData((prevData) => ({
      ...prevData,
      uploaded_images: [
        ...prevData.uploaded_images,
        ...selectedImages.map((img) => img.file),
      ],
    }));
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    setNewPgData((prevData) => ({
      ...prevData,
      cover_image: file,
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
        if (key === "uploaded_images") {
          for (let i = 0; i < newPgData[key].length; i++) {
            formData.append(`${key}[${i}]`, newPgData[key][i]);
          }
        } else if (key === "amenities") {
          for (let i = 0; i < newPgData[key].length; i++) {
            formData.append("amenities", newPgData[key][i]);
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

      await api.post("/dolphinpg/properties/", formData, config);

      setShowModal(false);
      fetchData();
      setSuccessMessage("PG added successfully!");
      setErrorMessage(null);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      setNewPgData({
        name: "",
        street_address: "",
        city: "",
        locality: "",
        pincode: "",
        phone: "",
        gender: "",
        lockin_period: "",
        notice_period: "",
        min_price: "",
        cover_image: "",
        uploaded_images: [],
        amenities: [],
      });
      setSelectedImages([]);
    } catch (error) {
      console.error("Error adding PG:", error);
      setErrorMessage("Error adding PG. Please try again.");
      setSuccessMessage(null);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  const fetchData = async () => {
    try {
      const response = await api.get("/dolphinpg/properties/");
      const amenitiesResponse = await api.get("/dolphinpg/amenities/");
      setAmenities({ results: amenitiesResponse.data });
      console.log(response.data);
      console.log(amenitiesResponse.data);
      setPgList({ results: response.data });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    console.log("this is from pg list ", pgList);
  }, []);

  const calculateTotalSize = (images) => {
    const totalSize = images.reduce(
      (sum, image) => sum + Number(image.size),
      0
    );
    return totalSize.toFixed(2);
  };

  return (
    <div>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <div className="d-flex justify-content-between">
        <h2>My PGs List</h2>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addPgModal"
        >
          Add PG
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="row">
          {pgList.results &&
            pgList.results.map((pg) => (
              <Link
                key={pg.id}
                to={`/property/${pg.id}`}
                className="card text-center m-2 p-2 col-md-4"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="card-body">
                  <h5 className="card-title fw-bold">{pg.name}</h5>
                </div>
              </Link>
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
        <div className="modal-dialog modal-xl">
          <div className="modal-content ">
            <div className="modal-header">
              <h5 className="modal-title" id="addPgModalLabel">
                Add PG Basic Details
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
              <div className="row">
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      PG Name
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
                    <label htmlFor="state" className="form-label">
                      State
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="state"
                      name="state"
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
                      Mobile Number (point of contact number would be preferred)
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
                </div>
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="min_price" className="form-label">
                      Minimum Pg Room Price (in Rs)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="min_price"
                      name="min_price"
                      value={newPgData.min_price}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="gender" className="form-label">
                      PG for
                    </label>
                    <select
                      className="form-select"
                      id="gender"
                      name="gender"
                      value={newPgData.gender}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Boys</option>
                      <option value="female">Girls</option>
                      <option value="colive">Colive</option>
                      <option value="any">Any</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="lockinPeriod" className="form-label">
                      Lockin Period (in days)
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
                      Notice Period (in days)
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
                    <label htmlFor="propertyCoverImages" className="form-label">
                      Property Cover Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="propertyCoverImages"
                      accept="image/*"
                      onChange={handleCoverImageChange}
                    />
                  </div>
                  <label htmlFor="propertyCoverImages" className="form-label">
                    Property Multiple Images
                  </label>
                  <div className=" input-group mb-3">
                    <input
                      type="file"
                      id="propertyImages"
                      className="form-control"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                    />

                    <div>
                      <button
                        className="btn btn-sm btn-dark"
                        onClick={handleUploadClick}
                      >
                        Add More
                      </button>
                      {/* Hidden input element */}
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>
                  {selectedImages.map((img, index) => (
                    <div key={index}>
                      <img
                        src={URL.createObjectURL(img.file)}
                        alt={img.title}
                        width="100"
                        height="100"
                      />
                      <span>{img.title}</span>
                      <button
                        className="btn btn-secondary btn-sm my-1"
                        onClick={() => removeImage(index)}
                      >
                        x
                      </button>
                    </div>
                  ))}

                  {selectedImages.length > 0 && (
                    <div className="mb-3">
                      <h6 className="fw-bold">
                        Selected Images: Total Size:{" "}
                        {`${calculateTotalSize(selectedImages)} MB`}
                      </h6>
                      <div className="d-flex flex-column text-muted small">
                        <div className="row">
                          {selectedImages.map((image, index) => (
                            <div key={index} className="mb-2 col-lg-6">
                              <span className="me-2">{image.title}</span>
                              <span>{`(${image.size} MB)`}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-lg-12">
                  <div className="mb-3">
                    <label htmlFor="selectedAmenities" className="form-label">
                      Select Amenities:
                    </label>
                    <div className="btn-group row">
                      {amenities.results &&
                        amenities.results.map((amenity) => (
                          <button
                            key={amenity.id}
                            type="button"
                            className={`btn btn-outline-primary p-2 m-2 col-2 ${
                              newPgData.amenities.includes(amenity.id)
                                ? "active"
                                : ""
                            }`}
                            onClick={() => handleAmenityClick(amenity.id)}
                          >
                            {amenity.amenity_name}
                          </button>
                        ))}
                    </div>
                  </div>
                </div>
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
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleAddPg}
              >
                Save & Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PgProperty;
