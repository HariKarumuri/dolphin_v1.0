import React, { useState, useRef, useEffect } from "react";
import ClipboardJS from "clipboard";

const generateQueryParamLink = (params) => {
  const queryParams = new URLSearchParams(params);
  return `http://localhost:3000/TenantJoiningForm?${queryParams}`;
};

const QueryParam = () => {
  const [inputParams, setInputParams] = useState({
    mobile_number: "",
    security_deposit: "",
    monthly_rent: "",
    maintenance_charges: "",
    requested_room_number: "",
    pg_name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputParams((prevParams) => ({ ...prevParams, [name]: value }));
  };

  const linkInputRef = useRef(null);

  useEffect(() => {
    // Initialize Clipboard.js when the component mounts
    const clipboard = new ClipboardJS("#copyButton", {
      text: () => linkInputRef.current.value,
    });

    clipboard.on("success", () => {
      alert("Link copied to clipboard!");
      clipboard.destroy();
    });

    clipboard.on("error", () => {
      alert("Copy failed. Please try again.");
      clipboard.destroy();
    });

    // Clean up Clipboard.js when the component unmounts
    return () => {
      clipboard.destroy();
    };
  }, []);

  // Generate the link
  const generatedLink = generateQueryParamLink(inputParams);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Update Input Parameters:</h2>
      <form>
        <div className="row">
          <div className="mb-3 col-4">
            <label htmlFor="pg_name" className="form-label">
              PG Name:
            </label>
            <input
              type="text"
              id="pg_name"
              name="pg_name"
              value={inputParams.pg_name}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3 col-4">
            <label htmlFor="requested_room_number" className="form-label">
              Requested Room Number:
            </label>
            <input
              type="text"
              id="requested_room_number"
              name="requested_room_number"
              value={inputParams.requested_room_number}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3 col-4">
            <label htmlFor="mobile_number" className="form-label">
              Mobile Number:
            </label>
            <input
              type="text"
              id="mobile_number"
              name="mobile_number"
              value={inputParams.mobile_number}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3 col-4">
            <label htmlFor="monthly_rent" className="form-label">
              Monthly Rent:
            </label>
            <input
              type="text"
              id="monthly_rent"
              name="monthly_rent"
              value={inputParams.monthly_rent}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3 col-4">
            <label htmlFor="security_deposit" className="form-label">
              Security Deposit:
            </label>
            <input
              type="text"
              id="security_deposit"
              name="security_deposit"
              value={inputParams.security_deposit}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3 col-4">
            <label htmlFor="maintenance_charges" className="form-label">
              Maintenance Charges:
            </label>
            <input
              type="text"
              id="maintenance_charges"
              name="maintenance_charges"
              value={inputParams.maintenance_charges}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
      </form>

      <h2 className="mt-4">Generated Link:</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={generatedLink}
          readOnly
          ref={linkInputRef}
        />
        <button
          className="btn btn-outline-success"
          type="button"
          id="copyButton"
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default QueryParam;