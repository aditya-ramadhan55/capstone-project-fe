// Base URL of the backend
const BASE_URL = 'https://obesicheck-api-714486790107.asia-southeast2.run.app';

// Function to fetch user account information
async function fetchUserAccount() {
  const token = localStorage.getItem('token');
  
  // Retrieve the user ID from localStorage
  const userId = localStorage.getItem('id_user');

  console.log('Token:', token); // Log the token
  console.log('User  ID:', userId); // Log the user ID

  if (!userId) {
    document.getElementById('userInfo').textContent = 'User  ID not found. Please log in again.';
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/api/user/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': token, // Removed 'Bearer ' prefix
        'Content-Type': 'application/json',
      },
    });

    console.log('Response Status:', response.status); // Log the response status

    if (response.ok) {
      const data = await response.json();
      document.getElementById('userInfo').innerHTML = `
        <p>Username: ${data.username}</p>
        <p>Email: ${data.email || 'N/A'}</p>
        <p>Account Created: ${new Date(data.created_at).toLocaleString()}</p>
        <p>Profile Image: <img src="${data.user_profile_image}" alt="Profile Image" class="profile-image"></p>
        <p>Feedback:</p>
        <ul>
          ${data.feedback.map(f => `
            <li>
              <strong>Rating:</strong> ${f.rating} - ${f.description} <br>
              <em>Created at: ${new Date(f.created_at).toLocaleString()}</em>
            </li>
          `).join('')}
        </ul>
      `;

      // Populate the edit form with current user data
      document.getElementById('username').value = data.username;
      document.getElementById('profileImage').value = data.user_profile_image;
    } else {
      document.getElementById('userInfo').textContent = 'Failed to fetch user account information.';
      console.error('Error fetching user account:', response.statusText); // Log the error
    }
  } catch (error) {
    console.error('Error fetching user account:', error);
    document.getElementById('userInfo').textContent = 'An error occurred. Please try again.';
  }
}

// Function to handle profile update
async function updateProfile(event) {
  event.preventDefault(); // Prevent page reload

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('id_user');

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value; // Get the new password
  const imageUpload = document.getElementById('imageUpload').files[0]; // Get the uploaded file

  // Create a FormData object to handle file upload
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password); // Ensure the new password is included

  if (imageUpload) {
    formData.append('imageUpload', imageUpload); // Append the uploaded file
  }

  try {
    const response = await fetch(`${BASE_URL}/api/user/${userId}`, {
      method: 'PUT',
      headers: {
        'Authorization': token, // Removed 'Bearer ' prefix
        // 'Content-Type': 'application/json', // Do not set Content-Type for FormData
      },
      body: formData, // Use FormData as the body
    });

    if (response.ok) {
      alert('Profile updated successfully! You will be logged out now.');
      
      // Clear localStorage and redirect to login page
      localStorage.removeItem('token');
      localStorage.removeItem('id_user');
      window.location.href = 'index.html'; // Redirect to login page
    } else {
      const errorData = await response.json();
      alert(`Failed to update profile: ${errorData.message || 'Please try again.'}`);
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    alert('An error occurred while updating the profile. Please try again.');
  }
}

// Event listeners
document.getElementById('editProfileForm').addEventListener('submit', updateProfile);
document.getElementById('logoutButton').addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('id_user');
  window.location.href = 'index.html'; // Redirect to login page
});

// Fetch user account information on page load
fetchUserAccount();