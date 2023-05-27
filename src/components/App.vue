<template>
    <div id="app">
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/login">Login</router-link>
        <router-link to="/signup">Sign up</router-link>
        <router-link to="/settings">Settings</router-link>
      </nav>
      <router-view/>
    </div>
  </template>
  
  <script>
  export default {
    name: 'App',
  };
  </script>
  
  <style>
    @import '../assets/styles.css';
  </style>