<template>
    <div class="signup">
      <form @submit.prevent="submitForm">
        <div>
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      submitForm() {
        const user = {
          username: this.username,
          password: this.password,
        };
  
        console.log(user); // Display user data in the console for now
  
        // Clear form fields
        this.username = '';
        this.password = '';
      },
    },
  };
  </script>
  
  <style scoped>
  .signup {
    width: 300px;
    margin: 0 auto;
  }
  .signup div {
    margin-bottom: 15px;
  }
  </style>