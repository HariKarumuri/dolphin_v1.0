import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import useAxios from "../../util/useAxios";

const DetailedProfile = () => {
  const api = useAxios();
  
  const [profiles, setProfiles] = useState({});
  const [tenantProfile, setTenantProfile] = useState({});
  const paramId = useParams();
  console.log(paramId);

  const fetchProfileDetails = async () => {
    try {
      const response = await api.get(
        `dolphinpg/profiles/${paramId.id_1}/`
      );
      setProfiles(response.data);

      if (response.data.tenant_joining_form) {
        const tenantForm = await api.get(
          `/dolphinpg/tenantjoiningform/${paramId.id_2}/`
        );
        setTenantProfile(tenantForm.data);
      }
    } catch (error) {
      console.error("error occurred", error);
    }
  };

  useEffect(() => {
    fetchProfileDetails();
  }, []);

  return (
    <div>
      <div className="row">
        <h4>APP/Profile</h4>
      </div>
      <div>
        <h2>User Profile</h2>
        <p>
          <strong>Username:</strong> {profiles.user?.username || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {profiles.user?.email || "N/A"}
        </p>
        <p>
          <strong>Mobile Number:</strong>{" "}
          {profiles.user_primary_mobile_number || "N/A"}
        </p>
        {/* Add other user-related details as needed */}
      </div>
      <div>
        <h2>Tenant Joining Form</h2>
        <p>
          <strong>Name:</strong> {tenantProfile.name || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {tenantProfile.email_id || "N/A"}
        </p>
        {/* Add other tenant-related details as needed */}
      </div>
    </div>
  );
};

export default DetailedProfile;
