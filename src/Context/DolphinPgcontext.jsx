import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const DolphinPGContext = createContext();

// Define your base URL
const baseURL = "https://popularpg.in/dolphinpg/";

export const DolphinPGProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [maintenanceFormData, setMaintenanceFormData] = useState([]);
  const [vacatingFormData, setVacatingFormData] = useState([]);
  const [bedsFormData, setBedsFormData] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [joiningData, setJoiningData] = useState([]);
  const testingurl = "http://127.0.0.1:8000/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use Promise.all to wait for all requests to complete
        const [
          propertiesResponse,
          bookingsResponse,
          maintenanceResponse,
          amenitiesResponse,
          roomDataResponse,
          vactingDataResponse,
          joingFormResponse,
        ] = await Promise.all([
          axios.get(`${baseURL}properties/`),
          axios.get(`${baseURL}bookings/`),
          axios.get(`${baseURL}maintenance/`),
          axios.get(`${baseURL}amenities/`),
          axios.get(`${baseURL}rooms/`),
          axios.get(`${baseURL}vacatingform/`),
          axios.get(`${baseURL}tenantjoiningform/`),
        ]);
  
        // Update state after all requests are complete
        setProperties(propertiesResponse.data);
        setBookings(bookingsResponse.data);
        setMaintenanceFormData(maintenanceResponse.data);
        setAmenities(amenitiesResponse.data);
        setRoomData(roomDataResponse.data);
        setVacatingFormData(vactingDataResponse.data);
        setJoiningData(joingFormResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <DolphinPGContext.Provider
      value={{
       
      }}
    >
      {children}
    </DolphinPGContext.Provider>
  );
};

export const useDolphinPGContext = () => {
  const context = useContext(DolphinPGContext);
  if (!context) {
    throw new Error(
      "useDolphinPGContext must be used within a DolphinPGProvider"
    );
  }
  return context;
};
