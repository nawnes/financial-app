<template>
  <div class="router-view-container">
    <div class="home-container">
      <div class="home-box">
        <h2>About Our Project</h2>
        <p>Welcome to our Budget Management Application!</p>
        <p>This application is designed to help you manage your finances efficiently and effectively.</p>
        <p>With our application, you can:</p>
        <ul>
          <li>Track your income and expenses</li>
          <li>Visualize your spending habits with detailed charts</li>
          <li>Create and manage multiple transactions</li>
          <li>Set financial goals and monitor your progress</li>
          <li>Securely manage your data with user authentication</li>
        </ul>
        <p>We hope this application helps you achieve better financial control and reach your financial goals. Thank you for choosing our Budget Management Application!</p>
      </div>
      <div class="photo-circles">
        <div class="photo-container">
          <img src="@/assets/Anas.png" alt="Photo 1" class="circle-photo">
          <div class="photo-description">Anas - Back-end Developer</div>
        </div>
        <div class="photo-container">
          <img src="@/assets/Amal.png" alt="Photo 2" class="circle-photo">
          <div class="photo-description">Amal - Front-end Developer</div>
        </div>
        <div class="photo-container">
          <img src="@/assets/Ryan.png" alt="Photo 3" class="circle-photo">
          <div class="photo-description">Ryan - DataBase Engineer</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
};
</script>

<style scoped>
body {
  font-family: 'Montserrat', sans-serif;
  margin: 0;
  padding: 0;
}

.home-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.home-box {
  position: relative;
  margin-top: 35px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 40px;
  width: 75%;
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #7dead1;
}

p {
  font-size: 18px;
  color: #7dead1;
  margin-bottom: 20px;
  font-weight: 500;
}

ul {
  list-style-type: disc;
  padding-left: 20px;
  text-align: left;
  margin: 0 auto;
  max-width: 600px;
}

li {
  font-size: 18px;
  color: #7dead1;
  margin-bottom: 10px;
  font-weight: 500;
  list-style-type: none;
}

.photo-circles {
  display: flex;
  justify-content: center;
  gap: 70px;
  margin-top: 20px;
  margin-bottom: 20px; /* Add margin-bottom */
}

.photo-container {
  position: relative;
}

.circle-photo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.photo-description {
  display: none;
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  font-size: 14px;
  white-space: nowrap;
}

.photo-container:hover .photo-description {
  display: block;
  background-color: #bd93cf;
  color : black;
  font-weight: 550;
}
</style>
