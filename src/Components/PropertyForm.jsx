import React, { useState } from 'react';
import axios from 'axios';

const PropertyForm = () => {
  const [propertyData, setPropertyData] = useState({
    name: "Dolphin Sun",
    address: "kniohvih v",
    phone: "7661908534",
    gender: "any",
    lockin_period: 15,
    notice_period: 15,
    beds: [
      {
        name: "single",
        price: "500.00",
        deposit: "1000.00",
        sharing: "single",
      },
    ],
    property_images: [], // Array to store multiple images
  });

  const [imageFiles, setImageFiles] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPropertyData({
      ...propertyData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);

    // Update property_images array
    setPropertyData({
      ...propertyData,
      property_images: files,
    });
  };

  const handleSubmit = async () => {
    try {
      // Prepare the form data
      const formData = new FormData();
  
      // Append property data
      Object.entries(propertyData).forEach(([key, value]) => {
        if (key === 'beds') {
          value.forEach((bed, index) => {
            Object.entries(bed).forEach(([bedKey, bedValue]) => {
              formData.append(`beds[${index}][${bedKey}]`, bedValue);
            });
          });
        } else if (key === 'property_images') {
          value.forEach((image, index) => {
            formData.append(`property_images[${index}]`, image);
          });
        } else {
          formData.append(key, value);
        }
      });
  
      // Send the request with data as FormData
      const response = await axios.post('http://127.0.0.1:8000/dolphinpgs/properties/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
      console.log('Response details:', error.response);
    }
  };

  return (
    <div>
      <label>
        Name:
        <input type="text" name="name" value={propertyData.name} onChange={handleInputChange} />
      </label>

      {/* Add other input fields for property data */}

      <label>
        Upload Images:
        <input type="file" multiple onChange={handleImageChange} />
      </label>

      <button onClick={handleSubmit}>Submit</button>

      {/* Display preview of uploaded images */}
      <div>
        {propertyData.property_images && propertyData.property_images.map((image, index) => (
          <img key={index} src={URL.createObjectURL(image)} alt={`Image ${index + 1}`} style={{ width: '100px', height: '100px', margin: '5px' }} />
        ))}
      </div>
    </div>
  );
};

export default PropertyForm;
