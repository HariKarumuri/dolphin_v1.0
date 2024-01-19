import React, { useState } from "react";
import axios from "axios";

const PropertyUploader = () => {
  const [propertyData, setPropertyData] = useState({
    name: "",
    address: "",
    phone: "",
    gender: "any",
    lockin_period: "",
    notice_period: "",
    beds: [],
    property_images: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPropertyData({
      ...propertyData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    setPropertyData({
      ...propertyData,
      property_images: files,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("Submitted Data:", propertyData);
  
      const formData = new FormData();
      formData.append("name", propertyData.name);
      formData.append("address", propertyData.address);
      formData.append("phone", propertyData.phone);
      formData.append("gender", propertyData.gender);
      formData.append("lockin_period", propertyData.lockin_period);
      formData.append("notice_period", propertyData.notice_period);
  
      // Append property_images data
      for (let i = 0; i < propertyData.property_images.length; i++) {
        formData.append("image", propertyData.property_images[i]);
      }
  
      const response = await axios.post(
        "http://127.0.0.1:8000/dolphinpgs/properties/",
        formData
      );
  
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
      console.log("Response details:", error.response);
    }
  };

  return (
    <div>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={propertyData.name}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Address:
        <input
          type="text"
          name="address"
          value={propertyData.address}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Phone:
        <input
          type="number"
          name="phone"
          value={propertyData.phone}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Gender:
        <select
          name="gender"
          value={propertyData.gender}
          onChange={handleInputChange}
        >
          <option value="any">Any</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>
      <label>
        Lockin Period:
        <input
          type="number"
          name="lockin_period"
          value={propertyData.lockin_period}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Notice Period:
        <input
          type="number"
          name="notice_period"
          value={propertyData.notice_period}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Upload Images:
        <input type="file" multiple onChange={handleImageChange} />
      </label>
      <br />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default PropertyUploader;
