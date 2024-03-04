import React, { useEffect, useState } from "react";
import useAxios from "./util/useAxios";


const DashBoard = () => {
  const [properties, setProperties] = useState([]);
  const [maintenanceFormData, setMaintenanceFormData] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [vacatingFormData, setVacatingFormData] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [joiningData, setJoiningData] = useState([]);
  const api = useAxios(); 

  useEffect(() => {
    const fetchData = async () => {
      

      try {
        const propertiesResponse = await api.get("/dolphinpg/properties/");
        const maintenanceResponse = await api.get("/dolphinpg/maintenance/");
        const amenitiesResponse = await api.get("/dolphinpg/amenities/");
        const roomDataResponse = await api.get("/dolphinpg/rooms/");
        const vacatingDataResponse = await api.get("/dolphinpg/vacatingform/");
        const bookingsResponse = await api.get("/dolphinpg/bookings/");
        const joiningFormResponse = await api.get(
          "/dolphinpg/tenantjoiningform/"
        );

        setProperties(propertiesResponse.data);
        setMaintenanceFormData(maintenanceResponse.data);
        setAmenities(amenitiesResponse.data);
        setRoomData(roomDataResponse.data);
        setVacatingFormData(vacatingDataResponse.data);
        setBookings(bookingsResponse.data);
        setJoiningData(joiningFormResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); 

  const vacantRooms = () => {
    const vacantRoomCount =
      roomData?.filter((room) => room.room_beds.some((bed) => bed.is_vacant))
        ?.length || 0;

    return vacantRoomCount;
  };

  const occupiedRooms = () => {
    const occupiedRoomCount =
      roomData?.filter((room) => room.room_beds.every((bed) => !bed.is_vacant))
        ?.length || 0;

    return occupiedRoomCount;
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <h3 className="mb-3">PG Analytics</h3>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{properties.length}</h5>
              <p className="card-text">PGs Listed</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{amenities.length}</h5>
              <p className="card-text">Amenities listed</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{vacatingFormData.length}</h5>
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
              <h5 className="card-title">{bookings.length}</h5>
              <p className="card-text">
                Bookings Received Total For Clarrification
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{joiningData.length}</h5>
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
              <h5 className="card-title">{maintenanceFormData.length}</h5>
              <p className="card-text">Maintenance Forms Received</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
