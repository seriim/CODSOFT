<template>
  <nav class="navbar">
    <div class="logo">
      <router-link to="/">Quiztrix</router-link>
    </div>
    <ul class="nav-links">
      <li><router-link to="/quizzes">Quizzes</router-link></li>
      <li><router-link to="/create">Create Quiz</router-link></li>
      <li><router-link to="/login">Login</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
};
</script>

<style scoped>
/* Overall Navbar Styling */
.navbar {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 40px;
  background-color: #ffffff; /* Light background for modern look */
  color: #333; /* Dark text for better contrast */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Light shadow for depth */
}

/* Logo Styling */
.navbar .logo a {
  font-size: 28px;
  font-weight: 600;
  text-decoration: none;
  color: #0076ff; /* Dark text for logo */
  letter-spacing: 1px;
}

/* Navigation Links Styling */
.nav-links {
  list-style-type: none;
  display: flex;
  justify-content: center;
  gap: 30px; /* Increased spacing for balance */
}

.nav-links li {
  display: inline;
}

/* Link Styling */
.nav-links a {
  text-decoration: none;
  color: #555; /* Light grey text for links */
  font-size: 16px;
  padding: 8px 16px;
  border-radius: 5px;
  font-weight: 500;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Hover Effects for Links */
.nav-links a:hover {
  background-color: #0076ff; /* Blue background on hover */
  color: white; /* White text on hover */
}

/* Active Link Styling (Optional, for active page highlighting) */
.nav-links a.router-link-active {
  color: #0076ff; /* Blue color for active link */
  font-weight: 600;
}

.nav-links a.router-link-active:hover{
  color: white;
}

/* Optional: Add a subtle focus effect for accessibility */
.nav-links a:focus {
  outline: 2px solid #0076ff; /* Blue outline for focus */
}

/* Media Queries for Mobile Devices */

/* Mobile (tablet and smaller screens) */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column; /* Stack logo and links vertically */
    padding: 15px 20px; /* Adjust padding for mobile */
  }

  .nav-links {
    display: flex;
    margin-top: 10px;
    flex-direction: row; /* Keep links in a row on tablets */
    align-items: center; /* Center align the links */
    gap: 15px; /* Space out the links */
    padding: 0;
  }

  .nav-links li {
    display: inline; /* Ensure each link is inline */
  
  }

  .nav-links a {
    font-size: 14px; /* Adjust font size for better readability */
    padding: 10px 15px; /* Adjust padding for smaller screens */
  }
}

/* Mobile (smaller screens) */
@media (max-width: 480px) {
  .navbar {
    padding: 10px 15px; /* Adjust padding for smaller screens */
  }

  .nav-links a {
    font-size: 12px; /* Smaller text size for very small screens */
    padding: 8px 12px; /* Adjust padding */
  }
}
</style>

