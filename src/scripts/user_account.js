// Function to check if the user is logged in
function isLoggedIn() {
  return !!localStorage.getItem('token');
}

// Redirect to login if not logged in
function redirectToLoginIfNotLoggedIn() {
  if (!isLoggedIn()) {
    alert('Please log in first.');
    window.location.href = 'index.html';
  }
}

// Function to fetch user account information
async function fetchUserAccount() {
  const token = localStorage.getItem('token');
  const BASE_URL = 'https://obesicheck-api-714486790107.asia-southeast2.run.app';
  
  try {
    const response = await fetch(`${BASE_URL}/api/user_account`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      document.getElementById('userInfo').innerHTML = `
        <p>Username: ${data.username}</p>
        <p>Email: ${data.email}</p>
        <p>Account Created: ${data.createdAt}</p>
      `;
    } else {
      document.getElementById('userInfo').textContent = 'Failed to fetch user account information.';
    }
  } catch (error) {
    console.error('Error fetching user account:', error);
    document.getElementById('userInfo').textContent = 'An error occurred. Please try again.';
  }
}

// Logout function
document.getElementById('logoutButton').addEventListener('click', () => {
  localStorage.removeItem('token'); // Remove token from localStorage
  window.location.href = 'index.html'; // Redirect to login page
});

// Call functions on page load
window.addEventListener('DOMContentLoaded', () => {
  redirectToLoginIfNotLoggedIn();
  fetchUserAccount();
});