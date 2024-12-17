// Base URL of the backend
const BASE_URL = 'https://obesicheck-api-714486790107.asia-southeast2.run.app';

// Handle form submission
document.getElementById('login-form').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent page reload

  // Get form values
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    // Send login request to the backend
    const response = await fetch(`${BASE_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    // Parse the JSON response
    const data = await response.json();
    console.log('Login Response:', data); // Log the response data


    if (response.ok) {
      // Success: Store the token and user ID, then redirect to dashboard.html
      alert('Login successful!');
      localStorage.setItem('token', data.token); // Store the token in localStorage
      localStorage.setItem('id_user', data.id_user); // Store the user ID in localStorage
      window.location.href = 'dashboard.html'; // Redirect to dashboard
    } else {
      // Error: Display error message
      document.getElementById('error').textContent = data.message || 'Login failed!';
    }
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('error').textContent = 'An error occurred. Please try again.';
  }
});