import React, { useState } from "react";
import { useDolphinPGContext } from "../Context/DolphinPgcontext";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faTrash } from '@fortawesome/free-solid-svg-icons'

const PgBed = ({ pg_id }) => {
  const { properties } = useDolphinPGContext();

  // State for form data
  const [beds, setBeds] = useState([
    {
      name: "",
      price: null,
      deposit: null,
      sharing: "",
      pg_property: pg_id,
    },
  ]);

  // Function to handle form input changes for a specific bed entry
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const newBeds = [...beds];
    newBeds[index][name] = value;
    setBeds(newBeds);
  };

  // Function to handle form submission for all bed entries
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      for (const bed of beds) {
        // Add your logic here to handle the form submission for each bed entry,
        // e.g., sending data to an API
        await axios.post("https://popularpg.in/dolphinpg/beds/", bed);
      }

      // All bed entries submitted successfully
      console.log("All bed entries submitted successfully");
    } catch (error) {
      console.error("Error submitting bed entries:", error);
    }
  };

  // Function to add a new bed entry
  const addBed = () => {
    setBeds([
      ...beds,
      { name: "", price: null, deposit: null, sharing: "", pg_property: pg_id },
    ]);
  };

  // Function to delete a bed entry
  const deleteBed = (index) => {
    const newBeds = [...beds];
    newBeds.splice(index, 1);
    setBeds(newBeds);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Bed Information Form</h2>
      <button type="button" className="btn btn-primary mb-3" onClick={addBed}>
        Add Bed
      </button>
      <form onSubmit={handleSubmit}>
        {beds.map((bed, index) => (
          <div key={index} className="border p-3 mb-3 rounded">
            <div className=" d-flex justify-content-between">
              <h6 className="mb-3">Bed {index + 1}</h6>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => deleteBed(index)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>

            <div className="row">
              <div className="mb-3 col">
                <label htmlFor={`name-${index}`} className="form-label">
                  Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id={`name-${index}`}
                  name="name"
                  value={bed.name}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>
              <div className="mb-3 col">
                <label htmlFor={`price-${index}`} className="form-label">
                  Price:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id={`price-${index}`}
                  name="price"
                  value={bed.price || ""}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>
              <div className="mb-3 col">
                <label htmlFor={`deposit-${index}`} className="form-label">
                  Deposit:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id={`deposit-${index}`}
                  name="deposit"
                  value={bed.deposit || ""}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>
              <div className="mb-3 col">
                <label htmlFor={`sharing-${index}`} className="form-label">
                  Sharing:
                </label>
                <select
                  className="form-control"
                  id={`sharing-${index}`}
                  name="sharing"
                  value={bed.sharing}
                  onChange={(e) => handleInputChange(e, index)}
                >
                  <option value="">Select Sharing</option>
                  <option value="one">One</option>
                  <option value="two">Two</option>
                  <option value="three">Three</option>
                  <option value="four">Four</option>
                </select>
              </div>
            </div>
          </div>
        ))}

        <button type="submit" className="btn btn-success">
          Submit Beds
        </button>
      </form>
    </div>
  );
};

export default PgBed;
