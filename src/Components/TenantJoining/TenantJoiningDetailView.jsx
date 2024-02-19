import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TenantJoiningDetailView = () => {
  const { id } = useParams();
  const [tenantDetails, setTenantDetails] = useState(null);

  useEffect(() => {
    const fetchTenantDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/dolphinpg/tenantjoiningform/${id}/`);
        setTenantDetails(response.data);
      } catch (error) {
        console.error('Error fetching tenant details:', error);
      }
    };

    fetchTenantDetails();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Tenant Details</h2>

      {tenantDetails ? (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{tenantDetails.name}</h5>
            <p className="card-text">Father's Name: {tenantDetails.father_name}</p>
            <p className="card-text">Mother's Name: {tenantDetails.mother_name}</p>
            
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TenantJoiningDetailView;
