const BASE_URL = 'https://obesicheck-api-714486790107.asia-southeast2.run.app';

async function fetchUserDetails() {
    const token = localStorage.getItem('token');
    
    try {
        const response = await fetch(`${BASE_URL}/prediksi/getUserDetails`, {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (response.ok) {
            // Update the HTML with user details
            document.getElementById('gender').textContent = data.data.gender;
            document.getElementById('height').textContent = data.data.height;
            document.getElementById('weight').textContent = data.data.weight;
            document.getElementById('age').textContent = data.data.age;
            document.getElementById('bmi').textContent = data.data.bmi;
            document.getElementById('userObesityLevel').textContent = data.data.user_obesity_level || 'Not available';

            // Show the predict button if user_obesity_level is null
            if (data.data.user_obesity_level === null) {
                document.getElementById('predictButton').style.display = 'block';
                document.getElementById('predictButton').addEventListener('click', () => {
                    window.location.href = 'prediction.html'; // Redirect to prediction page
                });
            }
        } else {
            console.error('Error fetching user details:', data.message);
            alert('Failed to fetch user details: ' + data.message);
        }
    } catch (error) {
        console.error('Error fetching user details:', error);
        alert('An error occurred while fetching user details. Please try again.');
    }
}

// Fetch user details on page load
window.addEventListener('DOMContentLoaded', fetchUserDetails);