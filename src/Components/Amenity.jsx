import React, { useState, useEffect } from "react";
import axios from "axios";
import useAxios from "./../util/useAxios";

const Amenity = () => {
  const [amenities, setAmenities] = useState({ results: [] });
  const [loading, setLoading] = useState(true);
  const [newAmenityName, setNewAmenityName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const api = useAxios();

  const fetchAmenities = async () => {
    try {
      const response = await api.get("/dolphinpg/amenities/");
      setAmenities({ results: response.data });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching amenities data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAmenities();
  }, []);

  const handleAddAmenity = async () => {
    try {
      // Make a POST request to add a new amenity
      await axios.post("https://popularpg.in/dolphinpg/amenities/", {
        amenity_name: newAmenityName,
      });

      // Refetch the amenities list to include the newly added amenity
      fetchAmenities();
      setNewAmenityName("");
      setShowModal(false);
    } catch (error) {
      console.error("Error adding amenity:", error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2>Amenities</h2>

        <button
          className="btn btn-primary mb-3"
          onClick={() => setShowModal(true)}
        >
          Add Amenity
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {amenities.results &&
            amenities.results.map((amenity) => (
              <div key={amenity.id} className="col-md-3 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{amenity.amenity_name}</h5>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Modal for adding amenity */}
      {showModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Amenity</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="newAmenityName">Amenity Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="newAmenityName"
                    value={newAmenityName}
                    onChange={(e) => setNewAmenityName(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddAmenity}
                >
                  Add Amenity
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Amenity;
