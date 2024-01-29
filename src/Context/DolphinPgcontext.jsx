import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const DolphinPGContext = createContext();

// Define your base URL
const baseURL = 'http://127.0.0.1:8000/dolphinpgs/';

export const DolphinPGProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [maintenanceFormData, setMaintenanceFormData] = useState({});
  const [vacatingFormData, setVacatingFormData] = useState({});
  const [bedsFormData, setBedsFormData] = useState({});
  const [bookings, setBookings] = useState([]);
  const [amenities, setAmenities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data using the base URL
        const propertiesResponse = await axios.get(`${baseURL}properties/`);
        const bookingsResponse = await axios.get(`${baseURL}bookings/`);
        const maintenanceResponse = await axios.get(`${baseURL}maintenance/`);

        setProperties(propertiesResponse.data);
        setBookings(bookingsResponse.data);
        setMaintenanceFormData(maintenanceResponse.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors as needed
      }
    };

    fetchData();
  }, []);

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
      }}
    >
      {children}
    </DolphinPGContext.Provider>
  );
};

export const useDolphinPGContext = () => {
  const context = useContext(DolphinPGContext);
  if (!context) {
    throw new Error('useDolphinPGContext must be used within a DolphinPGProvider');
  }
  return context;
};
