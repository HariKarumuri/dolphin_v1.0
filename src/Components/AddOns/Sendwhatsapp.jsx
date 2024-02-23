import React, { useState } from "react";

const Sendwhatsapp = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const handleInputChange = (e) => {
    setMobileNumber(e.target.value);
  };
  const maintainceLink = 'hello'

  return (
    <div>
      <label htmlFor="mobileNumber">Mobile Number:</label>
      <input
        type="text"
        id="mobileNumber"
        value={mobileNumber}
        onChange={handleInputChange}
      />

      <br />

      <a
        className="btn btn-success"
        href={`https://wa.me/${mobileNumber}?text=${encodeURIComponent(
          `Hello, I want to share a link with you: ${maintainceLink}\n\nThank you!`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Send maintaince Link
      </a>
    </div>
  );
};

export default Sendwhatsapp;
