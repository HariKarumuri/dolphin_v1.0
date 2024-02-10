import { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import Axios

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null
  );
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // Use useNavigate for navigation

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://popularpg.in/api/token/', {
        username: e.target.username.value,
        password: e.target.password.value,
      });

      if (response.status === 200) {
        const data = response.data;
        setAuthTokens(data);
        setUser(jwt_decode(data.access));
        localStorage.setItem('authTokens', JSON.stringify(data));
        navigate('/'); // Navigate to the home page after successful login
      } else {
        alert('Something went wrong!');
      }
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login failure here, e.g., display an error message.
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
    navigate('/login'); // Navigate to the login page after logout
  };

  let contextData = {
    user: user,
    authTokens: authTokens,
    setUser: setUser,
    setAuthTokens: setAuthTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  useEffect(() => {
    if (loading) {
      if (authTokens) {
        setUser(jwt_decode(authTokens.access));
      }
      setLoading(false);
    }
  }, [authTokens, loading]);

  return <AuthContext.Provider value={contextData}>{loading ? null : children}</AuthContext.Provider>;
};
