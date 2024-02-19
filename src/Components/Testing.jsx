import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDolphinPGContext } from '../Context/DolphinPgcontext';

const Testing = () => {
  const { amenities } = useDolphinPGContext();
  const [formData, setFormData] = useState({
    name: '',
    amenities: [], // Change the name to 'amenities'
    // Add other fields as needed
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAmenityClick = (amenityId) => {
    // Toggle the selection of the amenity
    setFormData((prevData) => {
      const selectedAmenities = prevData.amenities.includes(amenityId)
        ? prevData.amenities.filter((id) => id !== amenityId)
        : [...prevData.amenities, amenityId];

      return {
        ...prevData,
        amenities: selectedAmenities,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the backend API
      await axios.post('http://127.0.0.1:8000/dolphinpgs/CheckerAmety/', formData);

      // Handle success (e.g., show a success message)
      console.log('Data submitted successfully!');
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error('Error submitting data:', error);
    }
  };

  useEffect(() => {
    // Fetch amenities data when the component mounts
    // (Assuming you have a function in the context to fetch amenities)
    // fetchAmenities();
  }, []); // Add dependencies if needed

  return (
    <div className="container mt-4">
      <h2>Submit Amty Checker Data</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Select Amenities:</label>
          <div className="btn-group">
            {amenities.results &&
              amenities.results.map((amenity) => (
                <button
                  key={amenity.id}
                  type="button"
                  className={`btn btn-outline-primary p-2 m-2  ${formData.amenities.includes(amenity.id) ? 'active' : ''}`}
                  onClick={() => handleAmenityClick(amenity.id)}
                >
                  {amenity.amenity_name}
                </button>
              ))}
          </div>
        </div>

        {/* Add other form fields as needed */}

        <button type="submit" className="btn btn-primary">
          Submit testing for branch testing in git
        </button>
      </form>
    </div>
  );
};

export default Testing;
