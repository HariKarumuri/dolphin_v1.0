import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RoomDetail = () => {
  const { id } = useParams();  // Use useParams hook to get the 'id' parameter
  const [roomBed, setRoomBed] = useState(null);

  useEffect(() => {
    const fetchRoomBed = async () => {
      try {
        const response = await axios.get(`https://popularpg.in/dolphinpg/room-beds/${id}/`);
        setRoomBed(response.data);
      } catch (error) {
        console.error('Error fetching room bed details:', error);
      }
    };

    fetchRoomBed();
  }, []);

  const handleUpdate = async () => {
    // Implement the update logic using axios.put
    // Example: await axios.put(`http://127.0.0.1:8000/dolphinpgs/room-beds/${id}/`, newData);
  };

  const handleDelete = async () => {
    // Implement the delete logic using axios.delete
    // Example: await axios.delete(`http://127.0.0.1:8000/dolphinpgs/room-beds/${id}/`);
  };

  if (!roomBed) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Room Bed Details</h2>
      <div className="card">
        <div className="card-body">
          <p className="card-text"><strong>ID:</strong> {roomBed.id}</p>
          <p className="card-text"><strong>Bed Name:</strong> {roomBed.bed_name}</p>
          <p className="card-text"><strong>Is Vacant:</strong> {roomBed.is_vacant ? 'Yes' : 'No'}</p>
          <p className="card-text"><strong>Tenant Details:</strong> {roomBed.tenant_details}</p>
          <p className="card-text"><strong>Room:</strong> {roomBed.room}</p>

          <button className="btn btn-primary me-2" onClick={handleUpdate}>Update</button>
          <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
