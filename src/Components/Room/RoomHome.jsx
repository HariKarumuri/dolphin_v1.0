import React from "react";
import { Link } from "react-router-dom";
import { useDolphinPGContext } from "../../Context/DolphinPgcontext";

const RoomHome = () => {
  const { properties } = useDolphinPGContext();

  return (
    <div className="container mt-4">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Room
          </li>
        </ol>
      </nav>
      <h3 className="mb-3">Select a Room to View More</h3>
      <div className="row">
        <div className="col-md-4 mb-4">
          
            
              <h5 className="title">{properties.count}</h5>
              <p className="text">Total PGs</p>
           
        </div>
      </div>
      <div className="row">
        {properties.results &&
          properties.results.map((data) => (
            <div key={data.id} className="col-md-4 mb-4">
              <div className="card">
                <Link className="card-body text-decoration-none" to={`/rooms/${data.id}`}>
                  <p className="card-title mb-0"> <span className="small">Property Id:</span> {data.id}</p>
                  <h5 className="card-title mt-1"><span className="small">PG Name:</span>{data.name}</h5>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RoomHome;
