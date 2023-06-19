require('dotenv').config();
import React, { useState } from "react";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

axios.defaults.withCredentials = true;

const Logout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await axios.get(process.env.NEXT_PUBLIC_BASE_API_URL + '/api/auth/logout', { withCredentials: true });  
        dispatch({ type: 'LOG_OUT' });
      } catch (error) {
        console.error("An error occurred while loggoing out.", error);
      }
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit}>
        <button type="submit">Logout</button>
    </form>
  );
};

export default Logout;