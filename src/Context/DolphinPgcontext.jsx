import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const DolphinPGContext = createContext();

// Define your base URL
const baseURL = "https://popularpg.in/dolphinpg/";

export const DolphinPGProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [maintenanceFormData, setMaintenanceFormData] = useState({});
  const [vacatingFormData, setVacatingFormData] = useState({});
  const [bedsFormData, setBedsFormData] = useState({});
  const [bookings, setBookings] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const[joiningData,setJoiningData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data using the base URL
        const propertiesResponse = await axios.get(`${baseURL}properties/`);
        const bookingsResponse = await axios.get(`${baseURL}bookings/`);
        const maintenanceResponse = await axios.get(`${baseURL}maintenance/`);
        const amenitiesResponse = await axios.get(`${baseURL}amenities/`);
        const roomDataResponse = await axios.get(`${baseURL}rooms/`);
        const vactingDataResponse = await axios.get(`${baseURL}vacatingform/`);
        const joingFormResponse = await axios.get(`${baseURL}tenantjoiningform/`);

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
  }, []); // Empty dependency array ensures that the effect runs once on mount

  return (
    <DolphinPGContext.Provider
      value={{
        properties,
        setProperties,
        maintenanceFormData,
        setMaintenanceFormData,
        vacatingFormData,
        setVacatingFormData,
        bedsFormData,
        setBedsFormData,
        bookings,
        setBookings,
        amenities,
        setAmenities,
        roomData,
        joiningData,
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
