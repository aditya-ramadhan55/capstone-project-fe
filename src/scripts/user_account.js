// Base URL of the backend
const BASE_URL = 'https://obesicheck-api-714486790107.asia-southeast2.run.app';

// Function to fetch user account information
async function fetchUserAccount() {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('id_user');

  if (!userId) {
    document.getElementById('userInfo').textContent = 'User  ID not found. Please log in again.';
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/api/user/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': token, 
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      const defaultImage = 'src/images/default-profile.png';
      document.getElementById('profileImage').src = data.user_profile_image || defaultImage;
      document.getElementById('usernameDisplay').textContent = data.username;
      document.getElementById('accountCreated').textContent = new Date(data.created_at).toLocaleString();

      // Populate feedback list
      const feedbackList = document.getElementById('feedbackList');
      feedbackList.innerHTML = data.feedback.map(f => `
        <li>
          <strong>Rating:</strong> ${generateStars(f.rating)} <br>
          <strong>Description:</strong> ${f.description} <br>
          <em>Created at: ${new Date(f.created_at).toLocaleString()}</em>
        </li>
      `).join('');
    } else {
      document.getElementById('userInfo').textContent = 'Failed to fetch user account information.';
      console.error('Error fetching user account:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching user account:', error);
    document.getElementById('userInfo').textContent = 'An error occurred. Please try again.';
  }
}

// Function to generate star ratings
function generateStars(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    stars += i <= rating ? '⭐' : '☆'; // Filled star for rating, empty star for the rest
  }
  return stars;
}

// Event listeners
document.getElementById('logoutButton').addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('id_user');
  window.location.href = 'index.html'; // Redirect to login page
});

// Update username function
async function editUsername() {
  const usernameDisplay = document.getElementById('usernameDisplay');
  const currentUsername = usernameDisplay.textContent;

  // Create an input box and a save button
  const inputBox = document.createElement('input');
  inputBox.type = 'text';
  inputBox.value = currentUsername;

  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save';
  saveButton.className = 'save-button'; // Optional: Add a class for styling

  // Clear the username display and append the input box and save button
  usernameDisplay.textContent = '';
  usernameDisplay.appendChild(inputBox);
  usernameDisplay.appendChild(saveButton);

  // Add event listener to the save button
  saveButton.addEventListener('click', async () => {
    const newUsername = inputBox.value;
    if (newUsername) {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('id_user');

      try {
        const response = await fetch(`${BASE_URL}/api/user/${userId}`, {
          method: 'PUT',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: newUsername }),
        });

        if (response.ok) {
          usernameDisplay.textContent = newUsername; // Update the displayed username
          alert('Username updated successfully!');
        } else {
          const errorData = await response.json();
          alert(`Failed to update username: ${errorData.message || 'Please try again.'}`);
        }
      } catch (error) {
        console.error('Error updating username:', error);
        alert('An error occurred while updating the username. Please try again.');
      }
    }
  });
}

// Fetch user account information on page load
fetchUserAccount();