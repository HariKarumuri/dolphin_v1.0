import React from "react";
import { useDolphinPGContext } from "./Context/DolphinPgcontext";

const DashBoard = () => {
  const {
    properties,
    maintenanceFormData,
    amenities,
    roomData,
    vacatingFormData,
    bookings,
    joiningData,
  } = useDolphinPGContext();

  const vacantRooms = () => {
    const vacantRoomCount = roomData.results?.filter((room) =>
      room.room_beds.some((bed) => bed.is_vacant)
    )?.length || 0;
  
    return vacantRoomCount;
  };
  
  const occupiedRooms = () => {
    const occupiedRoomCount = roomData.results?.filter((room) =>
      room.room_beds.every((bed) => !bed.is_vacant)
    )?.length || 0;
  
    return occupiedRoomCount;
  };
  

  return (
    <div className="container mt-4">
      <div className="row">
        <h3 className="mb-3">PG Analytics</h3>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{properties.count}</h5>
              <p className="card-text">PGs Listed</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{amenities.count}</h5>
              <p className="card-text">Amenities listed</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{vacatingFormData.count}</h5>
              <p className="card-text">Vacating Forms Received</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <h3 className="mb-3">Rooms Analytics</h3>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{vacantRooms()}</h5>
              <p className="card-text">Total Empty Rooms</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{occupiedRooms()}</h5>
              <p className="card-text">Total Occupied Rooms</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <h3 className="mb-3">Bookings</h3>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{bookings.count}</h5>
              <p className="card-text">Bookings Received Total For Clarrification</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{joiningData.count}</h5>
              <p className="card-text">Confirmed Bookings Received </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <h3 className="mb-3">Maintenance Data</h3>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{maintenanceFormData.count}</h5>
              <p className="card-text">Maintenance Forms Received</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
