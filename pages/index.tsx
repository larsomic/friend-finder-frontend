import React, { useEffect } from "react";
import axios from 'axios';
axios.defaults.withCredentials = true;
require('dotenv').config();

const Home = () => {
  useEffect(() => {
    console.log(process.env.BASE_API_URL)
    const fetchData = async () => {
      const response = await axios.get(process.env.NEXT_PUBLIC_BASE_API_URL+'/api/auth/status', { withCredentials: true });
      console.log(response);
    };

    fetchData();
  }, [])

  return (
    <div>
      Hi
    </div>
  );
};

export default Home;

