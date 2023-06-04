import React, { useEffect,useState } from "react";
import axios from 'axios';
axios.defaults.withCredentials = true;
require('dotenv').config();

const Home = () => {
  const [authenticated, setAuthenticated] = useState("unauthenticated");

  useEffect(() => {
    console.log(process.env.BASE_API_URL)
    const fetchData = async () => {
      const response = await axios.get(process.env.NEXT_PUBLIC_BASE_API_URL+'/api/auth/status', { withCredentials: true });
      setAuthenticated(response.data.status)
    };

    fetchData();
  }, [])

  return (
    <div>
      {authenticated}
    </div>
  );
};

export default Home;

