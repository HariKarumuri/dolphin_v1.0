import React, { useState } from 'react';
import axios from 'axios';

const Testing = () => {
  const [productName, setProductName] = useState('hari2');
  const [productPrice, setProductPrice] = useState('522.00');
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleImageChange = (e) => {
    const files = e.target.files;
    setUploadedImages(files);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('name', productName);
      formData.append('price', parseFloat(productPrice).toFixed(2)); // Ensure the price is formatted as desired
      
      for (let i = 0; i < uploadedImages.length; i++) {
        formData.append('uploaded_images', uploadedImages[i]);
      }

      const response = await axios.post('http://127.0.0.1:8000/dolphinpgs/new-product/', formData);

      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <label>
        Product Name:
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Product Price:
        <input
          type="text"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
      </label>
      <br />
      <label>
        Upload Images:
        <input
          type="file"
          multiple
          onChange={handleImageChange}
        />
      </label>
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Testing;
