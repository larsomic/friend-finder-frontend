import React, { useState } from "react";


const Signup = () => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    changeLightDarkMode();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="submit">Dark Mode</button>
      </form>
    </div>
  );
};

export default Signup;