<template>
  <div class="profile-container">
    <div class="profile-box">
      <h2>Profile</h2>
      <form @submit.prevent="updateProfile">
        <div class="input-group">
          <label for="firstName">First Name</label>
          <input v-model="firstName" id="firstName" required placeholder="First Name">
        </div>

        <div class="input-group">
          <label for="lastName">Last Name</label>
          <input v-model="lastName" id="lastName" required placeholder="Last Name">
        </div>

        <div class="input-group">
          <label for="email">Email</label>
          <input type="email" v-model="email" id="email" required placeholder="Email">
        </div>

        <div class="input-group">
          <label for="username">Username</label>
          <input v-model="username" id="username" required placeholder="Username" readonly>
        </div>

        <div class="actions">
          <button type="submit" class="btn">Update Profile</button>
        </div>
      </form>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="success" class="success">{{ success }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      error: null,
      success: null
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:3000/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const { firstName, lastName, email, username } = response.data;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.username = username;
    } catch (error) {
      this.error = 'Failed to load profile data';
    }
  },
  methods: {
    async updateProfile() {
      this.error = null;
      this.success = null;
      try {
        await axios.put('http://localhost:3000/api/auth/profile', {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.success = 'Profile updated successfully';
      } catch (error) {
        this.error = 'Failed to update profile';
      }
    }
  }
};
</script>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 80px); /* Hauteur de la fenêtre moins la hauteur de la barre de navigation */
  background-image: url('../assets/gradient_1.jpg'); /* Chemin vers l'image d'arrière-plan */
  background-size: cover; /* Couvrir l'ensemble de la page */
  background-repeat: no-repeat; /* Ne pas répéter l'image */
  background-attachment: fixed; /* Image d'arrière-plan fixe */
}

.profile-box {
  background: #fff;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.input-group {
  margin-bottom: 20px;
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  color: #666;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.actions {
  display: flex;
  justify-content: center;
  align-items: center;
}

.actions .btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: #fff;
  cursor: pointer;
}

.actions .btn:hover {
  background: linear-gradient(135deg, #5a77d7, #8958b4);
}

.error {
  color: red;
}

.success {
  color: green;
}
</style>
