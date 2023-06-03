import React, { useState } from "react";
import axios from 'axios';


const Signup = () => {
    const changeLightDarkMode = () => {
        const style = getComputedStyle(document.documentElement);
        const color1 = style.getPropertyValue('--light-dark-color-1');
        const color2 = style.getPropertyValue('--light-dark-color-2');
        document.documentElement.style.setProperty('--light-dark-color-2', color1);
        document.documentElement.style.setProperty('--light-dark-color-1', color2);
      }

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