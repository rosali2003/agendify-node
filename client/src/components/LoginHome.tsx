import React from "react";
import { Button } from "../ui/button";
import axios from "axios";

const LoginHome = () => {
  const handleLogin = async () => {
    try {
      // Gets authentication url from backend server
      const {
        data: { url },
      } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/auth/url`);
      // Navigate to conset screen
      window.location.assign(url);
    } catch (err) {
      console.log("authentication not successful");
      console.error(err);
    }
  };

  return (
    <div className="justify-end m-5" >
      <Button variant='secondary' onClick={handleLogin}>Login</Button>
    </div>
  );
};

export default LoginHome;
