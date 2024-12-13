const BASE_URL = 'https://obesicheck-api-714486790107.asia-southeast2.run.app';

const ENDPOINT = {
  register: `${BASE_URL}/api/register`,
};

document.getElementById('registerForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  // Get values from the form inputs
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Validate password and confirm password
  if (password !== confirmPassword) {
    document.getElementById('errorMessage').textContent = "Password and Confirm Password do not match.";
    return;
  }

  try {
    // Send POST request to the register endpoint
    const response = await fetch(ENDPOINT.register, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    // Parse the JSON response
    const data = await response.json();

    if (response.ok) {
      // Registration successful, redirect to index.html
      alert("Registration successful. You can now log in.");
      window.location.href = 'index.html'; // Redirect to login page
    } else {
      // Display error message if registration fails
      document.getElementById('errorMessage').textContent = data.message || 'An error occurred during registration.';
    }
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('errorMessage').textContent = 'An error occurred. Please try again.';
  }
});