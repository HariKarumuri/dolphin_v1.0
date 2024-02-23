import React, { useState, useRef, useEffect } from "react";
import ClipboardJS from "clipboard";
import useAxios from "../../util/useAxios";

const generateQueryParamLink = (params) => {
  const queryParams = new URLSearchParams(params);
  return `https://dolphinstay.com/TenantJoiningForm?${queryParams}`;
};

const QueryParam = () => {
  const api = useAxios();
  const [inputParams, setInputParams] = useState({
    security_deposit: "",
    monthly_rent: "",
    maintenance_charges: "",
    requested_room_number: "",
    pg_name: "",
  });

  const [properties, setProperties] = useState({ results: [] });
  const [copyButtonClicked, setCopyButtonClicked] = useState(false);
  const handleCopyButtonClick = () => {
    setCopyButtonClicked(!copyButtonClicked);
  };

  const fetchData = async () => {
    try {
      const response = await api.get("/dolphinpg/properties/");
      setProperties({ results: response.data });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputParams((prevParams) => ({ ...prevParams, [name]: value }));
  };

  const linkInputRef = useRef(null);

  useEffect(() => {
    fetchData();
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

    return () => {
      clipboard.destroy();
    };
  }, [copyButtonClicked]);

  // Generate the link
  const generatedLink = generateQueryParamLink(inputParams);

  console.log(properties);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Update Input Parameters:</h2>
      <form>
        <div className="row">
          <div className="mb-3 col-4">
            <label htmlFor="pg_name" className="form-label">
              PG Name:
            </label>
            <select
              name="pg_name"
              id="pg_name"
              className="form-control"
              value={inputParams.pg_name}
              onChange={handleChange}
            >
              <option value="">Select PG Name</option>
              {properties.results &&
                properties.results.map((item) => (
                  <option value={item.name} key={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
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

      <h2 className="mt-4">Tenant Form Generated Link:</h2>
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
          onClick={handleCopyButtonClick}
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default QueryParam;
