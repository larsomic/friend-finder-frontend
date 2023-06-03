import React, { useState } from "react";
import axios from 'axios';
axios.defaults.withCredentials = true;
require('dotenv').config();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userData = {
        email: email,
        password: password,
      };

    try {
        const response = await axios.post(process.env.NEXT_PUBLIC_BASE_API_URL + "/api/auth/login", userData);
        console.log(response);
  
      } catch (error) {
        console.error("An error occurred while logging in.", error);
      }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;