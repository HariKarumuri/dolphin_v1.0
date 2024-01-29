import React from "react";
import { useDolphinPGContext } from "./Context/DolphinPgcontext";

const DashBoard = () => {
  const { properties,maintenanceFormData  } = useDolphinPGContext();

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">{properties.count} PGs</h2>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">{maintenanceFormData.count} Maintenance Forms </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
