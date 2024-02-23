import React, { useContext } from 'react';
import AuthContext from '../../Context/AuthContext';


const Login = () => {
  const { loginUser } = useContext(AuthContext);

  return (
    <div className="container mt-5">
      <form onSubmit={loginUser} className="col-md-6 mx-auto">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input type="text" name="username" className="form-control" placeholder="Enter your username" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input type="password" name="password" className="form-control" placeholder="Enter your password" />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
