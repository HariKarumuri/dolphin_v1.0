import React, { useState, useEffect } from "react";
import axios from "axios";

const DashBoard = () => {
  const [pgList, setPgList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://popularpg.in/dolphinpg/properties/"
        );
        setPgList(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>My PG List</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {pgList.results.map((pg) => (
            <li key={pg.id}>
              <div className="property-home">
                <p>{pg.name}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DashBoard;
